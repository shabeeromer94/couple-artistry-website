import { NextResponse } from "next/server";
import { availabilityCheckRequestSchema } from "@/lib/validation/availability";
import { checkEventAvailability } from "@/lib/utils/availabilityStub";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, env } from "@/lib/config/env";
import { AVAILABILITY_DISCLAIMER } from "@/lib/config/copy";
import { formatAvailabilityNotification } from "@/lib/utils/notifications";
import { sendOwnerNotification } from "@/lib/ownerNotify/telegram";
import type { AvailabilityStatus, OverallAvailabilityStatus } from "@/types/journey";

// STUB CONTRACT: this route never touches a real calendar. It exists so the
// frontend can be built once against a stable JSON contract, and the body
// of checkEventAvailability() (lib/utils/availabilityStub.ts) can later be
// swapped for a real Google Calendar free/busy lookup with zero change to
// this route's request/response shape and zero calendar internals ever
// reaching the client.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = availabilityCheckRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 }
    );
  }

  try {
    const { fullName, whatsappNumber, notSure, events, sessionId, utm } = parsed.data;

    // "Not sure of my event details yet" skips the calendar entirely — no
    // dates were given to check, so there's nothing to look up. She goes
    // straight to packages instead (see AvailabilityResult's "not_checked"
    // handling).
    let results: Array<{ id: string; date: string; status: AvailabilityStatus }> = [];
    let overallStatus: OverallAvailabilityStatus;

    if (notSure) {
      overallStatus = "not_checked";
    } else {
      results = await Promise.all(
        events.map(async (event) => ({
          id: event.id,
          date: event.date,
          status: await checkEventAvailability(event),
        }))
      );
      const availableCount = results.filter((r) => r.status === "available").length;
      overallStatus =
        availableCount === results.length ? "available" : availableCount === 0 ? "unavailable" : "partial";
    }

    const checkedAt = new Date().toISOString();
    const checkId = globalThis.crypto.randomUUID();

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseServerClient();
        const { error } = await supabase.from("availability_checks").insert({
          id: checkId,
          full_name: fullName,
          whatsapp_number: whatsappNumber,
          events,
          event_count: events.length,
          overall_status: overallStatus,
          results,
          session_id: sessionId ?? null,
          utm_source: utm?.utm_source ?? null,
          utm_medium: utm?.utm_medium ?? null,
          utm_campaign: utm?.utm_campaign ?? null,
          utm_content: utm?.utm_content ?? null,
          utm_term: utm?.utm_term ?? null,
        });
        if (error) console.error("availability_checks insert failed:", error.message);
      } catch (err) {
        console.error("availability_checks insert threw:", err);
      }
    }

    // Silent backend notification to the owner (via Telegram — see
    // lib/ownerNotify/telegram.ts). Never surfaced to or triggered by the
    // visitor, and a failure here never affects the response below — it's
    // a no-op until Telegram credentials are set.
    try {
      const message = formatAvailabilityNotification({
        fullName,
        whatsappNumber,
        notSure,
        events: events.map((event, index) => ({
          date: event.date,
          timing: event.timing,
          city: event.city,
          status: results[index]?.status ?? "available",
        })),
        overallStatus,
        packagesUrl: `${env.siteUrl}/makeup?unlock=packages`,
      });
      await sendOwnerNotification(message);
    } catch (err) {
      console.error("owner notification failed:", err);
    }

    return NextResponse.json({
      success: true,
      checkId,
      overallStatus,
      results,
      checkedAt,
      disclaimer: AVAILABILITY_DISCLAIMER,
    });
  } catch (err) {
    console.error("availability check failed:", err);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

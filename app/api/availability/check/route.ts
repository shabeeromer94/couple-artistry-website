import { NextResponse } from "next/server";
import { availabilityCheckRequestSchema } from "@/lib/validation/availability";
import { checkEventAvailability } from "@/lib/utils/availabilityStub";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/config/env";
import { AVAILABILITY_DISCLAIMER } from "@/lib/config/copy";
import type { OverallAvailabilityStatus } from "@/types/journey";

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
    const { events, sessionId, utm } = parsed.data;

    const results = await Promise.all(
      events.map(async (event) => ({
        id: event.id,
        date: event.date,
        status: await checkEventAvailability(event),
      }))
    );

    const availableCount = results.filter((r) => r.status === "available").length;
    const overallStatus: OverallAvailabilityStatus =
      availableCount === results.length ? "available" : availableCount === 0 ? "unavailable" : "partial";

    const checkedAt = new Date().toISOString();
    // Generated up front and inserted explicitly, rather than read back via
    // .select() after insert — anon has insert-only RLS on this table (by
    // design: these logs shouldn't be publicly readable), and .select()
    // after insert requires Postgres to RETURNING the row, which needs a
    // SELECT policy anon doesn't have and shouldn't get.
    const checkId = globalThis.crypto.randomUUID();

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseServerClient();
        const { error } = await supabase.from("availability_checks").insert({
          id: checkId,
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

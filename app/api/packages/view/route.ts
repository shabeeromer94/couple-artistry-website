import { NextResponse } from "next/server";
import { packageViewRequestSchema } from "@/lib/validation/packageViews";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, env } from "@/lib/config/env";
import { scheduleDelayedCall } from "@/lib/scheduling/qstash";
import { PACKAGE_VIEW_FOLLOWUP_DELAY_MINUTES } from "@/lib/config/packageFollowUp";

// Fired once, when a visitor clicks "View Packages" on the Makeup page
// (name/WhatsApp number already known by then, from the availability
// check). Logs the view and — if QStash is configured — schedules the
// delayed follow-up webhook (app/api/packages/followup) for later, unless
// they reach out first (app/api/packages/interest marks that).
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = packageViewRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 }
    );
  }

  const { fullName, whatsappNumber, availabilityCheckId, sessionId, utm } = parsed.data;
  let viewId: string | null = null;

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      const id = globalThis.crypto.randomUUID();
      const { error } = await supabase.from("package_views").insert({
        id,
        full_name: fullName,
        whatsapp_number: whatsappNumber,
        availability_check_id: availabilityCheckId ?? null,
        session_id: sessionId ?? null,
        utm_source: utm?.utm_source ?? null,
        utm_medium: utm?.utm_medium ?? null,
        utm_campaign: utm?.utm_campaign ?? null,
        utm_content: utm?.utm_content ?? null,
        utm_term: utm?.utm_term ?? null,
      });
      if (error) {
        console.error("package_views insert failed:", error.message);
      } else {
        viewId = id;
      }
    } catch (err) {
      console.error("package_views insert threw:", err);
    }
  }

  // Nothing to schedule a reminder for without a saved row to look up later.
  if (viewId) {
    await scheduleDelayedCall(
      `${env.siteUrl}/api/packages/followup`,
      { viewId },
      PACKAGE_VIEW_FOLLOWUP_DELAY_MINUTES * 60
    );
  }

  return NextResponse.json({ success: true, viewId });
}

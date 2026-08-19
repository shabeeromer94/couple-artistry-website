import { NextResponse } from "next/server";
import { slotCheckRequestSchema } from "@/lib/validation/slots";
import { checkSlotAvailability } from "@/lib/utils/slotStub";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/config/env";
import { COLOUR_ANALYSIS_SLOTS } from "@/lib/config/slots";
import { SLOT_DISCLAIMER } from "@/lib/config/copy";

// STUB CONTRACT — mirrors /api/availability/check. No real calendar is
// consulted; checkSlotAvailability() is the sole place that decides
// available/unavailable and is already async-shaped for a real Google
// Calendar swap later, with no calendar internals ever reaching the client.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = slotCheckRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 }
    );
  }

  try {
    const { date, slotTimes, sessionId, utm } = parsed.data;
    const timesToCheck = slotTimes && slotTimes.length > 0 ? slotTimes : COLOUR_ANALYSIS_SLOTS.map((s) => s.time);

    const slots = await Promise.all(
      timesToCheck.map(async (time) => ({ time, status: await checkSlotAvailability(date, time) }))
    );

    const checkedAt = new Date().toISOString();
    // Generated up front and inserted explicitly rather than read back via
    // .select() — see the matching comment in /api/availability/check.
    const checkId = globalThis.crypto.randomUUID();

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseServerClient();
        const { error } = await supabase.from("slot_checks").insert({
          id: checkId,
          requested_date: date,
          slots,
          session_id: sessionId ?? null,
          utm_source: utm?.utm_source ?? null,
          utm_medium: utm?.utm_medium ?? null,
          utm_campaign: utm?.utm_campaign ?? null,
          utm_content: utm?.utm_content ?? null,
          utm_term: utm?.utm_term ?? null,
        });
        if (error) console.error("slot_checks insert failed:", error.message);
      } catch (err) {
        console.error("slot_checks insert threw:", err);
      }
    }

    return NextResponse.json({ success: true, checkId, date, slots, checkedAt, disclaimer: SLOT_DISCLAIMER });
  } catch (err) {
    console.error("slot check failed:", err);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

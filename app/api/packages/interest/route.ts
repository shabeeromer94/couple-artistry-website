import { NextResponse } from "next/server";
import { packageInterestRequestSchema } from "@/lib/validation/packageViews";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/config/env";

// Fired when a visitor clicks "Enquire Now" on a package tier — marks the
// matching package_views row so the delayed follow-up (see
// app/api/packages/followup) skips them: they've already reached out, a
// reminder to do so again would be redundant. Best-effort — a missing view
// row (e.g. an old session) or a failed update never blocks the visitor,
// who's already mid-WhatsApp-redirect by the time this fires.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = packageInterestRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: true });
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServiceClient();
      const { viewId, category, tierName } = parsed.data;
      const { error } = await supabase
        .from("package_views")
        .update({
          follow_up_status: "skipped",
          selected_package_category: category ?? null,
          selected_package_tier: tierName ?? null,
        })
        .eq("id", viewId)
        .eq("follow_up_status", "pending"); // never overwrite an already-sent reminder
      if (error) console.error("package_views interest update failed:", error.message);
    } catch (err) {
      console.error("package_views interest update threw:", err);
    }
  }

  return NextResponse.json({ success: true });
}

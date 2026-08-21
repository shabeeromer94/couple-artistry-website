import { NextResponse } from "next/server";
import { verifyQStashSignature } from "@/lib/scheduling/qstash";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/config/env";
import { sendOwnerNotification } from "@/lib/ownerNotify/telegram";
import { buildWaLink } from "@/lib/utils/whatsapp";
import { formatPackageFollowUpClientMessage, formatPackageFollowUpOwnerNudge } from "@/lib/utils/notifications";

// Called by QStash — never directly by a visitor or the site's own
// frontend — PACKAGE_VIEW_FOLLOWUP_DELAY_MINUTES after a "View Packages"
// click (see app/api/packages/view/route.ts). Every request's signature is
// verified against the raw body before anything else runs.
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("Upstash-Signature");

  const isValid = await verifyQStashSignature(signature, rawBody);
  if (!isValid) {
    return NextResponse.json({ success: false, error: "Invalid signature." }, { status: 401 });
  }

  let viewId: string | undefined;
  try {
    const parsed = JSON.parse(rawBody);
    viewId = typeof parsed?.viewId === "string" ? parsed.viewId : undefined;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!viewId || !isSupabaseConfigured()) {
    return NextResponse.json({ success: true }); // nothing to do
  }

  try {
    const supabase = getSupabaseServiceClient();
    const { data: view, error } = await supabase
      .from("package_views")
      .select("id, full_name, whatsapp_number, selected_package_tier, follow_up_status")
      .eq("id", viewId)
      .single();

    if (error || !view) {
      return NextResponse.json({ success: true }); // row gone/never existed — nothing to do
    }
    // Already reached out (app/api/packages/interest) or already reminded
    // on an earlier delivery attempt — QStash can retry, so this must stay
    // idempotent.
    if (view.follow_up_status !== "pending") {
      return NextResponse.json({ success: true });
    }

    const waLink = buildWaLink(formatPackageFollowUpClientMessage(view.full_name), view.whatsapp_number);
    const message = formatPackageFollowUpOwnerNudge({
      fullName: view.full_name,
      whatsappNumber: view.whatsapp_number,
      selectedPackageTier: view.selected_package_tier ?? undefined,
      waLink,
    });
    await sendOwnerNotification(message);

    const { error: updateError } = await supabase
      .from("package_views")
      .update({ follow_up_status: "sent" })
      .eq("id", viewId)
      .eq("follow_up_status", "pending");
    if (updateError) console.error("package_views follow-up status update failed:", updateError.message);
  } catch (err) {
    console.error("package view follow-up failed:", err);
  }

  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { inquiryPayloadSchema } from "@/lib/validation/inquiry";
import { formatInquiryMessage, buildWaLink } from "@/lib/utils/whatsapp";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, env } from "@/lib/config/env";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = inquiryPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured()) {
    console.error("Inquiry submitted but Supabase is not configured — see SETUP.md.");
    return NextResponse.json(
      { success: false, error: "We're unable to process inquiries right now. Please reach out on WhatsApp directly." },
      { status: 500 }
    );
  }

  const payload = parsed.data;

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("inquiries")
      .insert({
        flow_type: payload.flowType,
        full_name: payload.fullName,
        whatsapp_number: payload.whatsappNumber,
        email: payload.email || null,
        message: payload.message || null,
        details: payload.details,
        selected_package_category: payload.selectedPackage?.category ?? null,
        selected_package_tier: payload.selectedPackage?.tierName ?? null,
        availability_check_id:
          payload.flowType === "makeup" ? payload.details.availabilityCheckId ?? null : null,
        slot_check_id:
          payload.flowType === "colour-analysis" ? payload.details.slotCheckId ?? null : null,
        utm_source: payload.utm?.utm_source ?? null,
        utm_medium: payload.utm?.utm_medium ?? null,
        utm_campaign: payload.utm?.utm_campaign ?? null,
        utm_content: payload.utm?.utm_content ?? null,
        utm_term: payload.utm?.utm_term ?? null,
        source_page: payload.sourcePage,
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error("inquiries insert failed:", error?.message);
      return NextResponse.json(
        { success: false, error: "We couldn't save your inquiry. Please try again or reach out on WhatsApp directly." },
        { status: 500 }
      );
    }

    const message = formatInquiryMessage(payload);
    const whatsappUrl = buildWaLink(message, env.whatsappNumber);

    return NextResponse.json({ success: true, inquiryId: data.id, whatsappUrl });
  } catch (err) {
    console.error("inquiry submission failed:", err);
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

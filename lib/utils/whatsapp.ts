import type { InquiryPayload } from "@/types/inquiry";
import type {
  MakeupInquiryDetails,
  ClassesInquiryDetails,
  ColourAnalysisInquiryDetails,
  StitchingInquiryDetails,
} from "@/types/inquiry";
import { formatDisplayTime } from "./format";

/** Digits only, per wa.me's expected format. */
function sanitizePhoneForWaLink(rawNumber: string): string {
  return rawNumber.replace(/[^0-9]/g, "");
}

export function buildWaLink(message: string, destinationNumber: string): string {
  const digits = sanitizePhoneForWaLink(destinationNumber);
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function formatEventsBlock(details: MakeupInquiryDetails): string {
  if (!details.events?.length) return "";
  return details.events
    .map((event, index) => `  ${index + 1}. ${event.date} at ${formatDisplayTime(event.timing)} — ${event.city}`)
    .join("\n");
}

/**
 * Builds a single professionally-formatted WhatsApp message summarizing an
 * inquiry, for the "Continue on WhatsApp" deep link. Server-side only
 * (called from the /api/inquiries route) — the destination number itself
 * never needs to reach the client in raw form beyond the final wa.me URL.
 */
export function formatInquiryMessage(payload: InquiryPayload): string {
  const lines: string[] = [];
  lines.push(`New inquiry — ${flowLabel(payload.flowType)}`);
  lines.push("");
  lines.push(`Name: ${payload.fullName}`);
  lines.push(`WhatsApp: ${payload.whatsappNumber}`);
  if (payload.email) lines.push(`Email: ${payload.email}`);

  if (payload.flowType === "makeup") {
    const details = payload.details as MakeupInquiryDetails;
    lines.push("");
    lines.push(`Event(s) (${details.eventCount}):`);
    lines.push(formatEventsBlock(details));
    if (details.eventsSummary) {
      lines.push(`Notes on event details: ${details.eventsSummary}`);
    }
    if (details.availabilityOverallStatus) {
      lines.push(`Availability check: ${details.availabilityOverallStatus}`);
    }
  } else if (payload.flowType === "classes") {
    const details = payload.details as ClassesInquiryDetails;
    lines.push("");
    lines.push(`Learning: ${details.classType}`);
    lines.push(`Level: ${details.level}`);
    lines.push(`Location: ${details.location}`);
    if (details.preferredDate) lines.push(`Preferred date: ${details.preferredDate}`);
    if (details.preferredTiming) lines.push(`Preferred timing: ${details.preferredTiming}`);
  } else if (payload.flowType === "colour-analysis") {
    const details = payload.details as ColourAnalysisInquiryDetails;
    lines.push("");
    lines.push(`Preferred date: ${details.preferredDate}`);
    if (details.preferredSlot) lines.push(`Preferred slot: ${details.preferredSlot}`);
  } else if (payload.flowType === "stitching") {
    const details = payload.details as StitchingInquiryDetails;
    lines.push("");
    lines.push(`Service: ${details.serviceRequired}`);
    lines.push(`Location: ${details.location}`);
    if (details.preferredDate) lines.push(`Preferred date: ${details.preferredDate}`);
    if (details.referenceDescription) lines.push(`Reference: ${details.referenceDescription}`);
  }

  if (payload.selectedPackage) {
    lines.push("");
    lines.push(`Package of interest: ${payload.selectedPackage.tierName}`);
  }

  if (payload.message) {
    lines.push("");
    lines.push(`Message: ${payload.message}`);
  }

  lines.push("");
  lines.push(`Sent from: ${payload.sourcePage}`);

  return lines.filter((line) => line !== undefined).join("\n");
}

function flowLabel(flow: InquiryPayload["flowType"]): string {
  switch (flow) {
    case "makeup":
      return "Makeup";
    case "classes":
      return "Classes";
    case "colour-analysis":
      return "Colour Analysis";
    case "stitching":
      return "Stitching & Designing";
    default:
      return flow;
  }
}

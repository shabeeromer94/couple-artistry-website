import { formatDisplayTime } from "./format";

interface AvailabilityNotificationEvent {
  date: string;
  timing: string;
  city: string;
  status: string;
}

/**
 * The owner-facing notification sent (see lib/ownerNotify/telegram.ts)
 * every time someone checks their date on the Makeup page — captures their
 * contact plus a clean link to the packages page, so there's nothing
 * further for the visitor to fill in and the owner can follow up whenever
 * suits. Channel-agnostic plain text — works as-is for Telegram, and for
 * any future channel this ever gets routed through instead.
 */
export function formatAvailabilityNotification(payload: {
  fullName: string;
  whatsappNumber: string;
  events: AvailabilityNotificationEvent[];
  overallStatus: string;
  packagesUrl: string;
}): string {
  const lines: string[] = [];
  lines.push("New availability check — Makeup");
  lines.push("");
  lines.push(`Name: ${payload.fullName}`);
  lines.push(`WhatsApp: ${payload.whatsappNumber}`);
  lines.push("");
  lines.push(`Event(s) (${payload.events.length}):`);
  payload.events.forEach((event, index) => {
    lines.push(
      `  ${index + 1}. ${event.date} — starts ${formatDisplayTime(event.timing)} — ${event.city} — ${event.status}`
    );
  });
  lines.push("");
  lines.push(`Overall: ${payload.overallStatus}`);
  lines.push("");
  lines.push(`Packages: ${payload.packagesUrl}`);

  return lines.join("\n");
}

/**
 * The message text a client receives, in their own WhatsApp — pre-filled
 * into the wa.me link the owner taps to send (see
 * app/api/packages/followup/route.ts). Written from the business, in its
 * own voice, since a real person is the one sending it.
 */
export function formatPackageFollowUpClientMessage(fullName: string): string {
  return `Hi ${fullName}! This is Couple Artistry by Shaash 💕 We noticed you were checking out our bridal packages — would love to help you find the perfect fit! Let us know if you have any questions, or if you'd like to lock in your date.`;
}

/**
 * The owner-facing Telegram nudge itself — the visitor's details plus the
 * ready wa.me link (built with formatPackageFollowUpClientMessage above)
 * for a one-tap send.
 */
export function formatPackageFollowUpOwnerNudge(payload: {
  fullName: string;
  whatsappNumber: string;
  selectedPackageTier?: string;
  waLink: string;
}): string {
  const lines: string[] = [];
  lines.push("Follow-up reminder — Makeup");
  lines.push("");
  lines.push(`${payload.fullName} viewed packages a few hours ago and hasn't reached out yet.`);
  lines.push(`WhatsApp: ${payload.whatsappNumber}`);
  if (payload.selectedPackageTier) {
    lines.push(`Package they looked at: ${payload.selectedPackageTier}`);
  }
  lines.push("");
  lines.push("Tap to message them:");
  lines.push(payload.waLink);

  return lines.join("\n");
}

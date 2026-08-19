import { deterministicPercent } from "./hash";
import { getBusyIntervals } from "@/lib/googleCalendar/client";
import { env, isGoogleCalendarConfigured } from "@/lib/config/env";
import type { AvailabilityStatus } from "@/types/journey";

// Real lookup when Google Calendar is configured (see
// isGoogleCalendarConfigured, lib/config/env.ts); otherwise falls back to a
// deterministic guess so the site keeps working — every environment runs on
// the fallback until GOOGLE_SERVICE_ACCOUNT_EMAIL,
// GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, and GOOGLE_CALENDAR_ID are all set.
// Either way, this remains the only place that decides available/unavailable
// and no calendar internals are ever exposed to the client.
const UNAVAILABLE_PROBABILITY_PERCENT = 18;

export interface AvailabilityStubEvent {
  date: string;
  city: string;
}

function stubStatus(event: AvailabilityStubEvent): AvailabilityStatus {
  const key = `${event.date}|${event.city}`;
  const percent = deterministicPercent(key);
  return percent < UNAVAILABLE_PROBABILITY_PERCENT ? "unavailable" : "available";
}

export async function checkEventAvailability(
  event: AvailabilityStubEvent
): Promise<AvailabilityStatus> {
  if (!isGoogleCalendarConfigured()) return stubStatus(event);

  try {
    // A bridal booking occupies the artist(s) for the whole day, so any
    // calendar event overlapping the date — regardless of its own time
    // range — marks the date unavailable. Timestamps are hardcoded to IST
    // (+05:30), matching the business's own timezone.
    const busy = await getBusyIntervals(
      env.googleCalendarId,
      `${event.date}T00:00:00+05:30`,
      `${event.date}T23:59:59+05:30`
    );
    return busy.length > 0 ? "unavailable" : "available";
  } catch (err) {
    console.error("Google Calendar availability lookup failed, falling back to stub:", err);
    return stubStatus(event);
  }
}

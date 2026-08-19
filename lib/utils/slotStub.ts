import { deterministicPercent } from "./hash";
import { getBusyIntervals } from "@/lib/googleCalendar/client";
import { env, isGoogleCalendarConfigured } from "@/lib/config/env";
import { SLOT_DURATION_MINUTES } from "@/lib/config/slots";
import type { AvailabilityStatus } from "@/types/journey";

// Mirrors availabilityStub.ts: a real free/busy lookup for the 11 AM–5 PM
// Colour Analysis window when Google Calendar is configured, otherwise the
// same deterministic fallback every environment runs on today. See
// isGoogleCalendarConfigured (lib/config/env.ts).
const SLOT_UNAVAILABLE_PROBABILITY_PERCENT = 22;

function stubStatus(date: string, time: string): AvailabilityStatus {
  const key = `${date}|${time}`;
  const percent = deterministicPercent(key);
  return percent < SLOT_UNAVAILABLE_PROBABILITY_PERCENT ? "unavailable" : "available";
}

/** "11:00" + SLOT_DURATION_MINUTES -> "12:00" — the end of the slot's own booking window. */
function addSlotDuration(time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  const totalMinutes = hour * 60 + minute + SLOT_DURATION_MINUTES;
  const endHour = Math.floor(totalMinutes / 60) % 24;
  const endMinute = totalMinutes % 60;
  return `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;
}

export async function checkSlotAvailability(date: string, time: string): Promise<AvailabilityStatus> {
  if (!isGoogleCalendarConfigured()) return stubStatus(date, time);

  try {
    // Only an event overlapping this exact hour blocks it — unlike the
    // whole-day Makeup check, the rest of the day's slots stay open.
    // Timestamps are hardcoded to IST (+05:30), matching the business's own
    // timezone.
    const busy = await getBusyIntervals(
      env.googleCalendarId,
      `${date}T${time}:00+05:30`,
      `${date}T${addSlotDuration(time)}:00+05:30`
    );
    return busy.length > 0 ? "unavailable" : "available";
  } catch (err) {
    console.error("Google Calendar slot lookup failed, falling back to stub:", err);
    return stubStatus(date, time);
  }
}

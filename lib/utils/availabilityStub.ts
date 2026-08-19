import { deterministicPercent } from "./hash";
import { getOverlappingEvents } from "@/lib/googleCalendar/client";
import { env, isGoogleCalendarConfigured } from "@/lib/config/env";
import {
  MAKEUP_SESSION_DURATION_HOURS,
  MAX_SIMULTANEOUS_LOCATIONS,
  MAX_BOOKINGS_PER_LOCATION,
} from "@/lib/config/eventTypes";
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
  timing: string; // "HH:MM" 24h — the event's (ceremony/function's) own start time
  city: string;
}

function stubStatus(event: AvailabilityStubEvent): AvailabilityStatus {
  const key = `${event.date}|${event.timing}|${event.city}`;
  const percent = deterministicPercent(key);
  return percent < UNAVAILABLE_PROBABILITY_PERCENT ? "unavailable" : "available";
}

/** A bridal makeup session runs for MAKEUP_SESSION_DURATION_HOURS, finishing
 * right as the event itself starts — so the window to check is counted
 * backward from the event's start time, not forward from it. */
function makeupWindow(date: string, eventTiming: string): { startISO: string; endISO: string } {
  const eventStart = new Date(`${date}T${eventTiming}:00+05:30`);
  const makeupStart = new Date(eventStart.getTime() - MAKEUP_SESSION_DURATION_HOURS * 60 * 60 * 1000);
  return { startISO: makeupStart.toISOString(), endISO: eventStart.toISOString() };
}

function normalizeLocation(text: string): string {
  return text.trim().toLowerCase();
}

/** Loose match so "Chennai" matches a calendar entry like "T Nagar, Chennai". */
function sameLocation(a: string, b: string): boolean {
  const na = normalizeLocation(a);
  const nb = normalizeLocation(b);
  if (!na || !nb) return false;
  return na.includes(nb) || nb.includes(na);
}

export async function checkEventAvailability(
  event: AvailabilityStubEvent
): Promise<AvailabilityStatus> {
  if (!isGoogleCalendarConfigured()) return stubStatus(event);

  try {
    const { startISO, endISO } = makeupWindow(event.date, event.timing);
    const overlapping = await getOverlappingEvents(env.googleCalendarId, startISO, endISO);

    // Two capacity limits apply in this window:
    //   - the requested location itself: multiple people at one venue is
    //     normal (bridesmaids/group bookings), but there's still a ceiling
    //     on how many separate bookings one venue can take at once
    //     (MAX_BOOKINGS_PER_LOCATION);
    //   - a *different* location can only be covered if one of the two
    //     artists is free to go there — so it's only unavailable once
    //     MAX_SIMULTANEOUS_LOCATIONS distinct *other* locations are already
    //     committed in this window, since there's no one left to send.
    let requestedLocationCount = 0;
    const otherLocations = new Set<string>();
    for (const cal of overlapping) {
      const locationText = (cal.location || cal.summary || "").trim();
      if (!locationText) {
        // Can't tell whether an unlabeled event is the same place or not —
        // count it as its own unknown location rather than assume it's safe.
        otherLocations.add(`unlabeled:${cal.id}`);
        continue;
      }
      if (sameLocation(locationText, event.city)) {
        requestedLocationCount += 1;
      } else {
        otherLocations.add(normalizeLocation(locationText));
      }
    }

    if (requestedLocationCount >= MAX_BOOKINGS_PER_LOCATION) return "unavailable";
    if (otherLocations.size >= MAX_SIMULTANEOUS_LOCATIONS) return "unavailable";
    return "available";
  } catch (err) {
    console.error("Google Calendar availability lookup failed, falling back to stub:", err);
    return stubStatus(event);
  }
}

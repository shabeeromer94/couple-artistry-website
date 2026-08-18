import { deterministicPercent } from "./hash";
import type { AvailabilityStatus } from "@/types/journey";

// STUB — no real calendar is consulted here. This is intentionally the only
// place that decides available/unavailable, and it is already async-shaped
// so a real Google Calendar free/busy lookup can replace the body below
// later without changing the function signature or any caller. No calendar
// internals are ever exposed to the client either way — callers only ever
// see the resulting status.
const UNAVAILABLE_PROBABILITY_PERCENT = 18;

export interface AvailabilityStubEvent {
  date: string;
  city: string;
  areaVenue: string;
}

export async function checkEventAvailability(
  event: AvailabilityStubEvent
): Promise<AvailabilityStatus> {
  const key = `${event.date}|${event.city}|${event.areaVenue}`;
  const percent = deterministicPercent(key);
  return percent < UNAVAILABLE_PROBABILITY_PERCENT ? "unavailable" : "available";
}

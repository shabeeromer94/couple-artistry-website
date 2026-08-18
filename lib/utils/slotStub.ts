import { deterministicPercent } from "./hash";
import type { AvailabilityStatus } from "@/types/journey";

// STUB — mirrors availabilityStub.ts. No real calendar is consulted; this is
// already async-shaped so a real Google Calendar free/busy lookup for the
// 11 AM–5 PM Colour Analysis window can replace the body later without
// touching any caller, and without ever exposing calendar internals.
const SLOT_UNAVAILABLE_PROBABILITY_PERCENT = 22;

export async function checkSlotAvailability(date: string, time: string): Promise<AvailabilityStatus> {
  const key = `${date}|${time}`;
  const percent = deterministicPercent(key);
  return percent < SLOT_UNAVAILABLE_PROBABILITY_PERCENT ? "unavailable" : "available";
}

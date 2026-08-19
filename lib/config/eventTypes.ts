export const MAX_EVENTS = 6;

// Real availability rules, used by checkEventAvailability
// (lib/utils/availabilityStub.ts) once Google Calendar is configured.

/** How long a bridal makeup session takes, counted back from the event's own start time. */
export const MAKEUP_SESSION_DURATION_HOURS = 4;

/** Ashi & Shabeer — the team can cover at most this many distinct locations at the same time. */
export const MAX_SIMULTANEOUS_LOCATIONS = 2;

export const EVENT_COUNT_OPTIONS = [
  { label: "Single Event", value: "single" as const, count: 1 },
  { label: "Two Events", value: "two" as const, count: 2 },
  { label: "Multiple Events", value: "multiple" as const, count: 3 },
];

export type EventCountChoice = "single" | "two" | "multiple";

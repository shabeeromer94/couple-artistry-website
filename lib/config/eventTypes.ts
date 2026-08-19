export const MAX_EVENTS = 6;

export const EVENT_COUNT_OPTIONS = [
  { label: "Single Event", value: "single" as const, count: 1 },
  { label: "Two Events", value: "two" as const, count: 2 },
  { label: "Multiple Events", value: "multiple" as const, count: 3 },
];

export type EventCountChoice = "single" | "two" | "multiple";

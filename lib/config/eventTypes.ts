import type { EventTypeValue } from "@/types/journey";

export const EVENT_TYPES: EventTypeValue[] = [
  "Wedding",
  "Reception",
  "Engagement",
  "Sangeet",
  "Mehendi",
  "Haldi",
  "Baby Shower",
  "Seemantham",
  "Photoshoot",
  "Birthday",
  "Other",
];

export const EVENT_TYPE_OPTIONS = EVENT_TYPES.map((value) => ({
  label: value,
  value,
}));

export const MAX_EVENTS = 6;

export const EVENT_COUNT_OPTIONS = [
  { label: "Single Event", value: "single" as const, count: 1 },
  { label: "Two Events", value: "two" as const, count: 2 },
  { label: "Multiple Events", value: "multiple" as const, count: 3 },
];

export type EventCountChoice = "single" | "two" | "multiple";

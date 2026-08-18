export const CLASS_TYPES = ["Makeup", "Hair", "Makeup + Hair"] as const;
export type ClassType = (typeof CLASS_TYPES)[number];

export const CLASS_LEVELS = [
  {
    value: "Self-Grooming",
    label: "Self-Grooming",
    description: "Everyday looks for yourself — quick, practical, personal.",
  },
  {
    value: "Look & Learn",
    label: "Look & Learn",
    description: "A guided, hands-on session built around one look at a time.",
  },
  {
    value: "Basic to Advance",
    label: "Basic to Advance",
    description: "A structured path from fundamentals through advanced technique.",
  },
] as const;
export type ClassLevel = (typeof CLASS_LEVELS)[number]["value"];

export const CLASS_TIMING_OPTIONS = [
  "Morning (9 AM – 12 PM)",
  "Afternoon (12 PM – 4 PM)",
  "Evening (4 PM – 7 PM)",
];

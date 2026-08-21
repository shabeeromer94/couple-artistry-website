import type { FieldSchemaEntry } from "@/types/inquiry";
import { CLASS_LEVELS, CLASS_TIMING_OPTIONS, CLASS_TYPES } from "./classes";

// Name / WhatsApp / Email / Additional Message are fixed base fields
// rendered directly by InquiryForm for every flow — these arrays supply
// only what varies per page. Makeup has no entry here — its "Get In Touch"
// form was removed; name and WhatsApp number are captured directly on the
// availability check instead (see components/makeup/AvailabilityForm.tsx).

export const CLASSES_INQUIRY_FIELDS: FieldSchemaEntry[] = [
  {
    name: "location",
    label: "Your Location",
    type: "text",
    required: true,
    placeholder: "City / area",
  },
  {
    name: "classType",
    label: "What would you like to learn?",
    type: "select",
    required: true,
    options: CLASS_TYPES.map((v) => ({ label: v, value: v })),
  },
  {
    name: "level",
    label: "Level",
    type: "select",
    required: true,
    options: CLASS_LEVELS.map((l) => ({ label: l.label, value: l.value })),
  },
  {
    name: "preferredDate",
    label: "Preferred Date",
    type: "date",
  },
  {
    name: "preferredTiming",
    label: "Preferred Timing",
    type: "select",
    options: CLASS_TIMING_OPTIONS.map((v) => ({ label: v, value: v })),
  },
];

export const COLOUR_ANALYSIS_INQUIRY_FIELDS: FieldSchemaEntry[] = [
  {
    name: "preferredDate",
    label: "Preferred Date",
    type: "date",
    required: true,
  },
  {
    name: "preferredSlot",
    label: "Preferred Slot",
    type: "text",
    placeholder: "Auto-filled from slot selection — edit if needed.",
  },
];

export const STITCHING_INQUIRY_FIELDS: FieldSchemaEntry[] = [
  {
    name: "location",
    label: "Your Location",
    type: "text",
    required: true,
    placeholder: "City / area",
  },
  {
    name: "serviceRequired",
    label: "Service Required",
    type: "select",
    required: true,
    options: [
      { label: "Blouse Designing / Stitching", value: "Blouse Designing / Stitching" },
      { label: "Skirt Stitching", value: "Skirt Stitching" },
      { label: "Lehenga Customization", value: "Lehenga Customization" },
      { label: "Rework", value: "Rework" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    name: "preferredDate",
    label: "Preferred Date",
    type: "date",
  },
  {
    name: "referenceDescription",
    label: "Description / Reference",
    type: "textarea",
    placeholder: "Describe the design, fabric, or attach a reference in your WhatsApp follow-up.",
  },
];

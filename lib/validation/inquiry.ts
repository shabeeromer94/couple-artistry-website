import { z } from "zod";
import { EVENT_TYPES } from "@/lib/config/eventTypes";
import type { EventTypeValue } from "@/types/journey";
import { utmSchema, whatsappNumberSchema } from "./shared";

const journeyEventSchema = z.object({
  id: z.string(),
  date: z.string(),
  eventType: z.enum(EVENT_TYPES as [EventTypeValue, ...EventTypeValue[]]),
  customEventType: z.string().optional(),
  city: z.string(),
  areaVenue: z.string(),
});

const baseInquirySchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  whatsappNumber: whatsappNumberSchema,
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  message: z.string().optional(),
  selectedPackage: z
    .object({ category: z.string(), tierId: z.string(), tierName: z.string() })
    .optional(),
  utm: utmSchema,
  sourcePage: z.string(),
});

export const makeupInquirySchema = baseInquirySchema.extend({
  flowType: z.literal("makeup"),
  details: z.object({
    events: z.array(journeyEventSchema).min(1),
    eventCount: z.number(),
    availabilityCheckId: z.string().optional(),
    availabilityOverallStatus: z.string().optional(),
    eventsSummary: z.string().optional(),
  }),
});

export const classesInquirySchema = baseInquirySchema.extend({
  flowType: z.literal("classes"),
  details: z.object({
    classType: z.string().min(1, "Select what you'd like to learn"),
    level: z.string().min(1, "Select a level"),
    location: z.string().min(1, "Location is required"),
    preferredDate: z.string().optional(),
    preferredTiming: z.string().optional(),
  }),
});

export const colourAnalysisInquirySchema = baseInquirySchema.extend({
  flowType: z.literal("colour-analysis"),
  details: z.object({
    preferredDate: z.string().min(1, "Preferred date is required"),
    preferredSlot: z.string().optional(),
    slotCheckId: z.string().optional(),
  }),
});

export const stitchingInquirySchema = baseInquirySchema.extend({
  flowType: z.literal("stitching"),
  details: z.object({
    serviceRequired: z.string().min(1, "Select a service"),
    location: z.string().min(1, "Location is required"),
    preferredDate: z.string().optional(),
    referenceDescription: z.string().optional(),
  }),
});

export const inquiryPayloadSchema = z.discriminatedUnion("flowType", [
  makeupInquirySchema,
  classesInquirySchema,
  colourAnalysisInquirySchema,
  stitchingInquirySchema,
]);

export type InquiryPayloadInput = z.infer<typeof inquiryPayloadSchema>;

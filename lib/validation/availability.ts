import { z } from "zod";
import { EVENT_TYPES } from "@/lib/config/eventTypes";
import { utmSchema } from "./shared";

export const availabilityEventSchema = z
  .object({
    id: z.string().min(1),
    date: z.string().min(1, "Date is required"),
    eventType: z.enum(EVENT_TYPES as [string, ...string[]], {
      message: "Select an event type",
    }),
    customEventType: z.string().optional(),
    city: z.string().min(1, "City is required"),
    areaVenue: z.string().min(1, "Area / venue is required"),
  })
  .refine((data) => data.eventType !== "Other" || !!data.customEventType?.trim(), {
    message: "Please describe the event type",
    path: ["customEventType"],
  });

export const availabilityCheckRequestSchema = z.object({
  events: z.array(availabilityEventSchema).min(1).max(6),
  sessionId: z.string().optional(),
  utm: utmSchema,
});

export type AvailabilityCheckRequestInput = z.infer<typeof availabilityCheckRequestSchema>;

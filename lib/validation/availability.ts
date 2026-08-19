import { z } from "zod";
import { utmSchema } from "./shared";

export const availabilityEventSchema = z.object({
  id: z.string().min(1),
  date: z.string().min(1, "Date is required"),
  timing: z.string().min(1, "Event start time is required"),
  city: z.string().min(1, "City is required"),
});

export const availabilityCheckRequestSchema = z.object({
  events: z.array(availabilityEventSchema).min(1).max(6),
  sessionId: z.string().optional(),
  utm: utmSchema,
});

export type AvailabilityCheckRequestInput = z.infer<typeof availabilityCheckRequestSchema>;

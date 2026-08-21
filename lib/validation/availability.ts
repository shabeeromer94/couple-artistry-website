import { z } from "zod";
import { utmSchema, whatsappNumberSchema } from "./shared";

export const availabilityEventSchema = z.object({
  id: z.string().min(1),
  date: z.string().min(1, "Date is required"),
  timing: z.string().min(1, "Event start time is required"),
  city: z.string().min(1, "City is required"),
});

export const availabilityCheckRequestSchema = z
  .object({
    fullName: z.string().min(2, "Enter your full name"),
    whatsappNumber: whatsappNumberSchema,
    // When true, the bride hasn't nailed down her event date(s)/venue yet —
    // events is allowed empty, no calendar check runs, and she goes
    // straight to "View Packages" (see app/api/availability/check).
    notSure: z.boolean().optional(),
    events: z.array(availabilityEventSchema).max(6).optional().default([]),
    sessionId: z.string().optional(),
    utm: utmSchema,
  })
  .refine((data) => data.notSure || data.events.length > 0, {
    message: "Add at least one event, or mark that you're not sure of the details yet.",
    path: ["events"],
  });

export type AvailabilityCheckRequestInput = z.infer<typeof availabilityCheckRequestSchema>;

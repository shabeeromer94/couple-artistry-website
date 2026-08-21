import { z } from "zod";
import { utmSchema, whatsappNumberSchema } from "./shared";

export const packageViewRequestSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  whatsappNumber: whatsappNumberSchema,
  availabilityCheckId: z.string().optional(),
  sessionId: z.string().optional(),
  utm: utmSchema,
});

export const packageInterestRequestSchema = z.object({
  viewId: z.string().min(1),
  category: z.string().optional(),
  tierName: z.string().optional(),
});

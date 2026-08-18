import { z } from "zod";
import { utmSchema } from "./shared";

export const slotCheckRequestSchema = z.object({
  date: z.string().min(1, "Date is required"),
  slotTimes: z.array(z.string()).optional(),
  sessionId: z.string().optional(),
  utm: utmSchema,
});

export type SlotCheckRequestInput = z.infer<typeof slotCheckRequestSchema>;

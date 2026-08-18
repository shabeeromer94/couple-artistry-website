import { z } from "zod";

export const utmSchema = z
  .object({
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_content: z.string().optional(),
    utm_term: z.string().optional(),
    capturedAt: z.string().optional(),
  })
  .partial()
  .optional();

// Loose international-friendly phone validation: digits, spaces, +, -, ().
export const whatsappNumberSchema = z
  .string()
  .min(7, "Enter a valid WhatsApp number")
  .max(20, "Enter a valid WhatsApp number")
  .regex(/^[0-9+\-\s()]+$/, "Enter a valid WhatsApp number");

"use client";

import { buildWaLink } from "@/lib/utils/whatsapp";
import { env } from "@/lib/config/env";
import { Button } from "./Button";

interface WhatsAppButtonProps {
  message?: string;
  href?: string;
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
}

/** Generic wa.me CTA for static "chat with us" entry points (not the post-inquiry deep link, which the API returns pre-built). */
export function WhatsAppButton({
  message = "Hi Couple Artistry! I'd like to know more.",
  href,
  label = "Chat on WhatsApp",
  variant = "secondary",
}: WhatsAppButtonProps) {
  const link = href ?? buildWaLink(message, env.whatsappNumber);
  return (
    <Button href={link} external variant={variant}>
      {label}
    </Button>
  );
}

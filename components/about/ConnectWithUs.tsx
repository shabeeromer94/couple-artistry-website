"use client";

import { motion } from "framer-motion";
import { scrollFadeUpProps, staggerContainer } from "@/lib/motion";
import { env } from "@/lib/config/env";
import { buildWaLink } from "@/lib/utils/whatsapp";

interface ConnectLink {
  label: string;
  description: string;
  href: string;
  external?: boolean;
}

/** "917200001934" -> "+91 72000 01934" (country code + two 5-digit groups). */
function formatPhoneDisplay(rawNumber: string): string {
  const digits = rawNumber.replace(/[^0-9]/g, "");
  if (digits.length !== 12) return `+${digits}`;
  return `+${digits.slice(0, 2)} ${digits.slice(2, 7)} ${digits.slice(7)}`;
}

const waLink = buildWaLink("Hi Couple Artistry! I'd like to know more.", env.whatsappNumber);

const CONNECT_LINKS: ConnectLink[] = [
  {
    label: "WhatsApp",
    description: formatPhoneDisplay(env.whatsappNumber),
    href: waLink,
    external: true,
  },
  {
    label: "Instagram — The Couple Artistry",
    description: "Bridal makeup, hair, and behind-the-scenes.",
    href: env.instagramMain,
    external: true,
  },
  {
    label: "Instagram — Stitching Studio",
    description: "Custom blouse, skirt, and lehenga work.",
    href: env.instagramStitching,
    external: true,
  },
  {
    label: "Instagram — Shaash Beauty Store",
    description: "Shop the products behind the looks.",
    href: env.instagramStore,
    external: true,
  },
  {
    label: "Google Reviews",
    description: "Read what past brides have to say.",
    href: env.googleReviewUrl,
    external: true,
  },
];

export function ConnectWithUs() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={staggerContainer}
      className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
    >
      {CONNECT_LINKS.map((link) => (
        <motion.a
          key={link.label}
          variants={scrollFadeUpProps.variants}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          className="group block border border-charcoal/10 px-6 py-5 text-left transition-colors duration-300 hover:border-wine/40"
        >
          <p className="font-display text-lg text-charcoal transition-colors duration-300 group-hover:text-wine">
            {link.label}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-charcoal-light">{link.description}</p>
        </motion.a>
      ))}
    </motion.div>
  );
}

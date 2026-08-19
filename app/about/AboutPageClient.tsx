"use client";

import { motion } from "framer-motion";
import { scrollFadeUpProps } from "@/lib/motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollFadeSection } from "@/components/shared/ScrollFadeSection";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { OurStory } from "@/components/about/OurStory";
import { ConnectWithUs } from "@/components/about/ConnectWithUs";

export default function AboutPageClient() {
  return (
    <main>
      <ScrollFadeSection className="px-6 pb-16 pt-20 text-center md:pb-24 md:pt-28">
        <motion.p {...scrollFadeUpProps} className="text-xs uppercase tracking-[0.3em] text-rose-dark">
          About Us
        </motion.p>
        <motion.h1
          {...scrollFadeUpProps}
          className="mx-auto mt-5 max-w-2xl font-display text-4xl leading-tight text-charcoal sm:text-5xl"
        >
          The Story Behind Couple Artistry
        </motion.h1>
        <motion.p {...scrollFadeUpProps} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-charcoal-light">
          Founded by Ashi &amp; Shabeer, built around the art of creating a bridal look together.
        </motion.p>
      </ScrollFadeSection>

      <OurStory />

      <ScrollFadeSection className="bg-ivory-dark px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Get In Touch" title="Connect With Us" />
          <div className="mt-14">
            <ConnectWithUs />
          </div>
        </div>
      </ScrollFadeSection>

      <ScrollFadeSection className="px-6 py-24 text-center md:py-32">
        <p className="mb-6 text-sm text-charcoal-light">Prefer to chat directly?</p>
        <WhatsAppButton variant="primary" />
      </ScrollFadeSection>
    </main>
  );
}

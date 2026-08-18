"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scrollFadeUpProps } from "@/lib/motion";
import { ScrollFadeSection } from "@/components/shared/ScrollFadeSection";

export function WhatIsColourAnalysis() {
  return (
    <ScrollFadeSection className="py-24 md:py-32">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <motion.div {...scrollFadeUpProps}>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-rose-dark">Our Signature</p>
          <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl">
            Colour Analysis, Explained
          </h2>
          <p className="mt-6 text-base leading-relaxed text-charcoal-light">
            Colour analysis helps identify shades that enhance your natural glow and bring balance to
            your entire bridal look.
          </p>
          <p className="mt-4 text-base leading-relaxed text-charcoal-light">
            In a simple draping session, we hold different shades against you to see, side by side,
            which colours bring out your best — then translate that directly into your saree, jewellery,
            and makeup choices.
          </p>
          <blockquote className="mt-6 border-l-2 border-rose pl-5 text-base italic leading-relaxed text-charcoal">
            &ldquo;The right colours don&rsquo;t just enhance your beauty — they bring harmony,
            confidence, and a glow that lasts forever.&rdquo;
          </blockquote>
        </motion.div>
        <motion.div {...scrollFadeUpProps} className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src="/images/colour-analysis/img-1.jpg"
            alt="A guided colour draping session"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </ScrollFadeSection>
  );
}

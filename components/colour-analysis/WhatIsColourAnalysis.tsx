"use client";

import { motion } from "framer-motion";
import { scrollFadeUpProps } from "@/lib/motion";
import { PlaceholderTile } from "@/components/shared/PlaceholderTile";

export function WhatIsColourAnalysis() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <motion.div {...scrollFadeUpProps}>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-rose-dark">What Is It</p>
          <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl">
            Colour Analysis, Explained
          </h2>
          <p className="mt-6 text-base leading-relaxed text-charcoal-light">
            Colour analysis identifies the palette that naturally complements your skin, hair, and eye
            tone — the shades that make you look effortlessly luminous versus the ones that quietly work
            against you.
          </p>
          <p className="mt-4 text-base leading-relaxed text-charcoal-light">
            For a bride, this translates directly into outfit, jewellery, and makeup decisions — so
            every choice across your event is working in your favour.
          </p>
        </motion.div>
        <motion.div {...scrollFadeUpProps} className="aspect-[4/5] w-full overflow-hidden">
          <PlaceholderTile label="Colour Draping" />
        </motion.div>
      </div>
    </section>
  );
}

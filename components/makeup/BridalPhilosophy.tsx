"use client";

import { motion } from "framer-motion";
import { scrollFadeUpProps } from "@/lib/motion";
import { PlaceholderTile } from "@/components/shared/PlaceholderTile";

export function BridalPhilosophy() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <motion.div {...scrollFadeUpProps} className="aspect-[4/5] w-full overflow-hidden">
          <PlaceholderTile label="The Couple" />
        </motion.div>
        <motion.div {...scrollFadeUpProps}>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-rose-dark">Our Philosophy</p>
          <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl">
            Two Artists, One Vision
          </h2>
          <p className="mt-6 text-base leading-relaxed text-charcoal-light">
            Couple Artistry by Shaash was built on a simple idea: a wedding day is too important for a
            single pair of hands. Every bride is styled by a couple working in true partnership — from
            first consultation to the final touch before you walk out.
          </p>
          <p className="mt-4 text-base leading-relaxed text-charcoal-light">
            We approach every look the way an editorial team approaches a shoot — considering light,
            outfit, and story — so the result holds up in person and in every photograph.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

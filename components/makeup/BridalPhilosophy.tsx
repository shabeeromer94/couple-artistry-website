"use client";

import { motion } from "framer-motion";
import { scrollFadeUpProps } from "@/lib/motion";
import { PlaceholderTile } from "@/components/shared/PlaceholderTile";
import { ScrollFadeSection } from "@/components/shared/ScrollFadeSection";

export function BridalPhilosophy() {
  return (
    <ScrollFadeSection className="py-24 md:py-32">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <motion.div {...scrollFadeUpProps} className="aspect-[4/5] w-full overflow-hidden">
          <PlaceholderTile label="Ashi & Shabeer" />
        </motion.div>
        <motion.div {...scrollFadeUpProps}>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-rose-dark">About Us</p>
          <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl">
            More Than Makeup — A Complete Bridal Experience
          </h2>
          <p className="mt-6 text-base leading-relaxed text-charcoal-light">
            At Couple Artistry by Shaash, we believe every bride deserves a look that feels
            authentically her. Founded by Ashi &amp; Shabeer, our journey began with a simple vision —
            to create bridal looks that go beyond trends and focus on harmony, confidence, and
            individuality.
          </p>
          <p className="mt-4 text-base leading-relaxed text-charcoal-light">
            With over 9+ years of experience in bridal beauty, we combine professional makeup
            artistry, personalised colour analysis, and bridal styling expertise to create looks that
            feel timeless, elegant, and uniquely tailored to each bride — guiding you not only in
            makeup, but in colours, outfits, jewellery, and styling choices too.
          </p>
          <blockquote className="mt-6 border-l-2 border-rose pl-5 text-base italic leading-relaxed text-charcoal">
            &ldquo;Beauty is not about changing who you are. It is about bringing together the right
            colours, styling, and artistry to create a bride who feels confident, elegant, and
            completely herself.&rdquo;
            <footer className="mt-2 text-sm not-italic text-charcoal-light">— Ashi &amp; Shabeer</footer>
          </blockquote>
        </motion.div>
      </div>
    </ScrollFadeSection>
  );
}

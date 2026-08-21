"use client";

import { forwardRef, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface ScrollFadeSectionProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Skips the scroll-linked dim/scale entirely — for any section containing
   * a form or other active input. On mobile, a focused field opening the
   * keyboard shifts the viewport height, which this effect's scroll-offset
   * math reads as a partial scroll-out — dimming the very button someone's
   * mid-type toward. Renders a plain, fully static <section> instead.
   */
  disableFade?: boolean;
}

/**
 * Drop-in replacement for a page's outer <section> that gently dims and
 * settles as it scrolls out through the top of the viewport — the section
 * "above" softly fades as the next one comes up, rather than cutting away
 * instantly. Purely a scroll-linked opacity/scale transform (no
 * position:sticky pinning), so it works regardless of a section's height
 * and never fights normal document scroll or in-page anchor links —
 * forwards its ref straight to the underlying <section> for exactly that.
 */
export const ScrollFadeSection = forwardRef<HTMLElement, ScrollFadeSectionProps>(function ScrollFadeSection(
  { children, className, disableFade },
  forwardedRef
) {
  const localRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: localRef,
    offset: ["start start", "end start"],
  });
  // Compressed into the first ~18% of the section's own scroll-through, so
  // the dim happens quickly right as it starts exiting under the top edge
  // — a snappy, clearly-visible fade rather than one smeared thinly across
  // the section's entire height.
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.18], [1, 0.94]);

  return (
    <motion.section
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      style={disableFade ? undefined : { opacity, scale }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
});

"use client";

import { forwardRef, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface ScrollFadeSectionProps {
  children: React.ReactNode;
  className?: string;
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
  { children, className },
  forwardedRef
) {
  const localRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: localRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  return (
    <motion.section
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      style={{ opacity, scale }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
});

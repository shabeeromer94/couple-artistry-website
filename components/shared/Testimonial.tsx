"use client";

import { motion } from "framer-motion";
import type { Testimonial as TestimonialType } from "@/types/testimonial";
import { EASE_EDITORIAL } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

// Two alternating tints so neighbouring bubbles read as distinct "messages"
// rather than one repeated card.
const TINTS = ["bg-ivory-dark", "bg-rose-light/25"];

interface TestimonialProps {
  testimonial: TestimonialType;
  index?: number;
}

/**
 * A testimonial rendered as a speech bubble — rounded card with a small
 * tail pointing down, alternating left/right and slightly offset by index
 * so a row of them reads as an organic conversation rather than a rigid
 * grid. Slides in from the side its tail points to.
 */
export function Testimonial({ testimonial, index = 0 }: TestimonialProps) {
  const tailLeft = index % 2 === 0;
  const tint = TINTS[index % TINTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: tailLeft ? -72 : 72, y: 28 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1, ease: EASE_EDITORIAL, delay: index * 0.15 }}
      className={cn("relative", index % 2 === 1 && "md:mt-10")}
    >
      <figure className={cn("relative rounded-[28px] p-7 shadow-soft", tint)}>
        <blockquote className="font-display text-lg leading-relaxed text-charcoal">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-charcoal-light">
          {testimonial.authorName}
          {testimonial.rating && (
            <span className="ml-2 text-rose" aria-label={`${testimonial.rating} out of 5`}>
              {"★".repeat(testimonial.rating)}
            </span>
          )}
        </figcaption>
        <span
          aria-hidden="true"
          className={cn("absolute -bottom-2 h-4 w-4 rotate-45", tint, tailLeft ? "left-8" : "right-8")}
        />
      </figure>
    </motion.div>
  );
}

import type { Variants } from "framer-motion";

// Shared motion language for the whole site: slow, elegant, never snappy.
// Reused by the reveal gate and every section's scroll-in fade-up so motion
// reads as one deliberate system rather than ad hoc per-component tweens.

export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_EDITORIAL },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE_EDITORIAL } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const scrollFadeUpProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-10% 0px -10% 0px" },
  variants: fadeUp,
};

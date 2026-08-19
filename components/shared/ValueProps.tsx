"use client";

import { motion } from "framer-motion";
import { scrollFadeUpProps, staggerContainer } from "@/lib/motion";
import type { ValueProp } from "@/lib/config/valueProps";

interface ValuePropsProps {
  items: ValueProp[];
  columns?: 2 | 3 | 4;
}

export function ValueProps({ items, columns = 4 }: ValuePropsProps) {
  const gridCols =
    columns === 2 ? "sm:grid-cols-2" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  // Four-item grids read naturally as pairs (e.g. "Consultation" next to
  // "Colour Analysis"), so start them at 2 columns immediately instead of
  // stacking one-per-row until the sm breakpoint — halves the scroll depth
  // on mobile. Odd-count grids (3 columns) stay single-column on mobile,
  // since a lone trailing card looks unbalanced.
  const baseCols = columns === 4 ? "grid-cols-2" : "grid-cols-1";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={staggerContainer}
      className={`grid ${baseCols} gap-x-6 gap-y-10 sm:gap-10 ${gridCols}`}
    >
      {items.map((item) => (
        <motion.div key={item.title} variants={scrollFadeUpProps.variants} className="text-left">
          <div className="mb-4 h-px w-10 bg-rose" />
          <h3 className="font-display text-xl text-charcoal">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-light">{item.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

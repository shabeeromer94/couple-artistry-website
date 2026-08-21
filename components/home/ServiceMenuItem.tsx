"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ServiceCardConfig } from "@/lib/config/navigation";
import { scrollFadeUpProps } from "@/lib/motion";

interface ServiceMenuItemProps {
  card: ServiceCardConfig;
  index: number;
}

/**
 * One row of the home service menu: an index, a serif title with an
 * underline that sweeps in on hover, a description, and an arrow that
 * nudges forward — no imagery. Reads as an editorial index rather than a
 * card grid, so it stays compact regardless of viewport width.
 */
export function ServiceMenuItem({ card, index }: ServiceMenuItemProps) {
  const number = String(index + 1).padStart(2, "0");

  const content = (
    <div className="flex items-center justify-between gap-6 py-7 transition-colors duration-500 group-hover:bg-ivory-dark/50 sm:py-8 md:px-5">
      <div className="flex items-baseline gap-4 sm:gap-6 md:gap-8">
        <span className="font-display text-sm text-rose-dark/70 transition-colors duration-500 group-hover:text-rose-dark sm:text-base">
          {number}
        </span>
        <div>
          <h3 className="relative inline-block font-display text-2xl font-semibold leading-tight text-charcoal transition-colors duration-500 group-hover:text-wine sm:text-3xl md:text-4xl">
            {card.title}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-wine transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </h3>
          <p className="mt-2 max-w-md text-sm text-charcoal-light">{card.description}</p>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="shrink-0 font-display text-2xl text-charcoal-light transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-wine sm:text-3xl"
      >
        {card.external ? "↗" : "→"}
      </span>
    </div>
  );

  return (
    <motion.div variants={scrollFadeUpProps.variants} className="group border-b border-charcoal/10 first:border-t">
      {card.external ? (
        <a
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${card.title} (opens in a new tab)`}
          className="block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wine"
        >
          {content}
        </a>
      ) : (
        <Link
          href={card.href}
          aria-label={`Explore ${card.title}`}
          className="block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wine"
        >
          {content}
        </Link>
      )}
    </motion.div>
  );
}

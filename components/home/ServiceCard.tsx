"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ServiceCardConfig } from "@/lib/config/navigation";
import { PlaceholderTile } from "@/components/shared/PlaceholderTile";
import { scrollFadeUpProps } from "@/lib/motion";

export function ServiceCard({ card }: { card: ServiceCardConfig }) {
  const content = (
    <>
      <div className="aspect-[4/5] w-full overflow-hidden">
        <PlaceholderTile label={card.placeholderLabel} className="transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="mt-5">
        <h3 className="font-display text-xl text-charcoal">
          {card.title}
          {card.external && <span className="ml-2 align-middle text-sm text-rose-dark">↗</span>}
        </h3>
        <p className="mt-2 text-sm text-charcoal-light">{card.description}</p>
      </div>
    </>
  );

  return (
    <motion.div variants={scrollFadeUpProps.variants} className="group">
      {card.external ? (
        <a href={card.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${card.title} (opens in a new tab)`}>
          {content}
        </a>
      ) : (
        <Link href={card.href} aria-label={`Explore ${card.title}`}>
          {content}
        </Link>
      )}
    </motion.div>
  );
}

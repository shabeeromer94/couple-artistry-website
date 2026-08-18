"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getMakeupGalleryGroups } from "@/lib/config/gallery";
import { Gallery } from "@/components/shared/Gallery";
import { EASE_EDITORIAL } from "@/lib/motion";

// One full-width tint per band, cycled — a soft, distinct wash per category
// rather than one repeated color, echoing the reference site's Bridal /
// Fashion / Commercials bands.
const BAND_TINTS = ["bg-rose-light/30", "bg-ivory-dark", "bg-rose/10"];

/**
 * Makeup's portfolio as clickable category bands (Bridal Looks, Makeup &
 * Hair, Before & After) rather than one flat rail — closed by default,
 * clicking a band reveals that category's own horizontal Gallery beneath
 * it. Accordion: opening one closes whichever else was open.
 */
export function GalleryCategories() {
  const groups = getMakeupGalleryGroups();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="border-t border-charcoal/10">
      {groups.map((group, index) => {
        const isOpen = openId === group.id;
        return (
          <div key={group.id} className="border-b border-charcoal/10">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : group.id)}
              aria-expanded={isOpen}
              className={`flex w-full items-center justify-between gap-6 px-6 py-8 text-left transition-colors duration-500 sm:px-10 sm:py-10 ${BAND_TINTS[index % BAND_TINTS.length]}`}
            >
              <span className="font-display text-2xl uppercase tracking-[0.08em] text-charcoal sm:text-4xl">
                {group.label}
              </span>
              <span className="flex shrink-0 items-center gap-4">
                <span className="hidden text-xs uppercase tracking-[0.2em] text-charcoal-light sm:inline">
                  {group.images.length} photos
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
                  className="font-display text-2xl text-rose-dark"
                  aria-hidden="true"
                >
                  ↓
                </motion.span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-8 sm:px-10">
                    <Gallery images={group.images} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

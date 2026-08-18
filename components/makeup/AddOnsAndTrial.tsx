"use client";

import { motion } from "framer-motion";
import { scrollFadeUpProps, staggerContainer } from "@/lib/motion";
import { BRIDAL_ADD_ONS, BRIDAL_TRIAL } from "@/lib/config/addOns";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function AddOnsAndTrial() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-content">
        <SectionHeading eyebrow="Extend Your Package" title="Add-Ons & Trial" />
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={staggerContainer}
            className="divide-y divide-charcoal/10 border-y border-charcoal/10"
          >
            {BRIDAL_ADD_ONS.map((addOn) => (
              <motion.div
                key={addOn.label}
                variants={scrollFadeUpProps.variants}
                className="flex items-center justify-between gap-6 py-4"
              >
                <span className="text-sm text-charcoal">{addOn.label}</span>
                <span className="text-sm font-medium text-rose-dark">{addOn.priceLabel}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...scrollFadeUpProps} className="border border-charcoal/10 bg-ivory-dark p-8">
            <h3 className="font-display text-xl text-charcoal">{BRIDAL_TRIAL.label}</h3>
            <p className="mt-2 text-sm font-medium text-rose-dark">{BRIDAL_TRIAL.priceLabel}</p>
            <ul className="mt-6 space-y-3">
              {BRIDAL_TRIAL.notes.map((note) => (
                <li key={note} className="flex gap-2 text-sm text-charcoal-light">
                  <span className="text-rose">—</span>
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

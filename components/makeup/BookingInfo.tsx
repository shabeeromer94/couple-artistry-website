"use client";

import { motion } from "framer-motion";
import { scrollFadeUpProps } from "@/lib/motion";
import { BOOKING_INFO } from "@/lib/config/addOns";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollFadeSection } from "@/components/shared/ScrollFadeSection";

export function BookingInfo() {
  return (
    <ScrollFadeSection className="px-6 pb-24 md:pb-32">
      <div className="mx-auto max-w-content">
        <SectionHeading eyebrow="Good to Know" title="Booking Information" />
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
          <motion.div {...scrollFadeUpProps}>
            <h3 className="font-display text-xl text-charcoal">Booking</h3>
            <ul className="mt-4 space-y-3">
              {BOOKING_INFO.booking.map((line) => (
                <li key={line} className="flex gap-2 text-sm leading-relaxed text-charcoal-light">
                  <span className="text-rose">—</span>
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...scrollFadeUpProps}>
            <h3 className="font-display text-xl text-charcoal">Outstation Weddings</h3>
            <ul className="mt-4 space-y-3">
              {BOOKING_INFO.outstation.map((line) => (
                <li key={line} className="flex gap-2 text-sm leading-relaxed text-charcoal-light">
                  <span className="text-rose">—</span>
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </ScrollFadeSection>
  );
}

"use client";

import { motion } from "framer-motion";
import type { AvailabilityCheckResult } from "@/types/journey";
import { scrollFadeUpProps } from "@/lib/motion";
import { Button } from "@/components/shared/Button";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { AvailabilityDisclaimer } from "./AvailabilityDisclaimer";

interface AvailabilityResultProps {
  result: AvailabilityCheckResult;
  onViewPackages: () => void;
}

export function AvailabilityResult({ result, onViewPackages }: AvailabilityResultProps) {
  const isAvailable = result.overallStatus === "available";

  return (
    <motion.div {...scrollFadeUpProps} className="mx-auto max-w-lg text-center">
      <h3 className="font-display text-3xl text-charcoal">
        {isAvailable ? "Your Date Looks Good" : "We're So Sorry"}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-charcoal-light">
        {isAvailable
          ? "Based on our early read, your date(s) look open. Let's take the next step together."
          : "It looks like we may already be booked for one or more of your dates. We'd still love to hear from you — schedules do shift, and we can explore options."}
      </p>

      <ul className="mx-auto mt-6 max-w-xs space-y-2 text-left text-sm text-charcoal-light">
        {result.results.map((r) => (
          <li key={r.id} className="flex items-center justify-between border-b border-charcoal/10 pb-2">
            <span>{r.date}</span>
            <span className={r.status === "available" ? "text-rose-dark" : "text-charcoal-light"}>
              {r.status === "available" ? "Available" : "Unavailable"}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button onClick={onViewPackages} size="lg">
          {isAvailable ? "View Packages" : "View Packages Anyway"}
        </Button>
        {!isAvailable && (
          <WhatsAppButton
            variant="secondary"
            size="lg"
            label="Ask About Future Dates"
            message="Hi Couple Artistry! My date wasn't available — I'd like to check future dates with you."
          />
        )}
      </div>

      <div className="mt-8">
        <AvailabilityDisclaimer />
      </div>
    </motion.div>
  );
}

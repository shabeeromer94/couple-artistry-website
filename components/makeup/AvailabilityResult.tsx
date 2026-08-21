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
  const isUnavailable = result.overallStatus === "unavailable" || result.overallStatus === "partial";
  // "Not sure of my event details yet" on the form — no calendar check ran
  // at all, so there's nothing to report here beyond going straight to
  // packages.
  const notChecked = result.overallStatus === "not_checked";

  return (
    <motion.div {...scrollFadeUpProps} className="mx-auto max-w-lg text-center">
      <h3 className="font-display text-3xl font-semibold text-charcoal">
        {notChecked ? "No Problem at All" : isAvailable ? "Your Date Looks Good" : "We're So Sorry"}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-charcoal-light">
        {notChecked
          ? "Take a look at our packages below — we'll sort out your exact event details together when you're ready."
          : isAvailable
            ? "Based on our early read, your date(s) look open. Let's take the next step together."
            : "It looks like we may already be booked for one or more of your dates. We'd still love to hear from you — schedules do shift, and we can explore options."}
      </p>

      {result.results.length > 0 && (
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
      )}

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button onClick={onViewPackages} size="lg">
          {isUnavailable ? "View Packages Anyway" : "View Packages"}
        </Button>
        {isUnavailable && (
          <WhatsAppButton
            variant="secondary"
            size="lg"
            label="Ask About Future Dates"
            message="Hi Couple Artistry! My date wasn't available — I'd like to check future dates with you."
          />
        )}
      </div>

      {!notChecked && (
        <div className="mt-8">
          <AvailabilityDisclaimer />
        </div>
      )}
    </motion.div>
  );
}

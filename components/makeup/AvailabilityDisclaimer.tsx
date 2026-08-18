import { AVAILABILITY_DISCLAIMER } from "@/lib/config/copy";

export function AvailabilityDisclaimer() {
  return (
    <p className="mx-auto max-w-md text-center text-xs leading-relaxed text-charcoal-light/80">
      {AVAILABILITY_DISCLAIMER}
    </p>
  );
}

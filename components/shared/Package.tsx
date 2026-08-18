import type { PricingTier } from "@/types/pricing";
import { cn } from "@/lib/utils/cn";
import { Button } from "./Button";

interface PackageProps {
  tier: PricingTier;
  onSelect?: () => void;
}

export function Package({ tier, onSelect }: PackageProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between border p-8",
        tier.highlighted ? "border-wine bg-ivory-dark" : "border-charcoal/10 bg-ivory"
      )}
    >
      <div>
        {tier.highlighted && (
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-wine">Most Booked</p>
        )}
        <h3 className="font-display text-2xl text-charcoal">{tier.name}</h3>
        <p className="mt-2 text-sm text-charcoal-light">{tier.description}</p>
        <p className="mt-5 text-sm font-medium text-rose-dark">{tier.priceLabel}</p>
        <ul className="mt-6 space-y-2">
          {tier.inclusions.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-charcoal-light">
              <span className="text-rose">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Button variant={tier.highlighted ? "primary" : "secondary"} onClick={onSelect} className="mt-8 w-full">
        {tier.ctaLabel ?? "Enquire Now"}
      </Button>
    </div>
  );
}

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
      id={tier.id}
      className={cn(
        "scroll-mt-24 flex h-full flex-col justify-between border p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        tier.highlighted
          ? "border-wine bg-gradient-to-b from-ivory-dark to-rose-light/20"
          : "border-charcoal/10 bg-ivory"
      )}
    >
      <div>
        {tier.highlighted && (
          <p className="mb-4 inline-block rounded-full bg-wine px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-ivory shadow-soft">
            Most Booked
          </p>
        )}
        <h3 className="font-display text-2xl font-semibold text-charcoal">{tier.name}</h3>
        <p className="mt-2 text-sm text-charcoal-light">{tier.description}</p>
        <p className="mt-5 text-sm font-bold text-rose-dark">{tier.priceLabel}</p>
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
        {tier.ctaLabel ?? "Connect on WhatsApp"}
      </Button>
    </div>
  );
}

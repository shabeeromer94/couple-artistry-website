"use client";

import type { PricingCategoryKey, PricingTier } from "@/types/pricing";
import { getPricingCategory } from "@/lib/config/pricing";
import { Package } from "./Package";
import { SectionHeading } from "./SectionHeading";
import { PRICING_PLACEHOLDER_CAPTION } from "@/lib/config/copy";

interface PackageGridProps {
  categoryKey: PricingCategoryKey;
  onSelectTier?: (tier: PricingTier) => void;
  title?: string;
}

export function PackageGrid({ categoryKey, onSelectTier, title }: PackageGridProps) {
  const category = getPricingCategory(categoryKey);
  if (!category) return null;

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <SectionHeading
          eyebrow="Packages"
          title={title ?? category.categoryLabel}
          description={category.intro}
        />
        <p className="mx-auto mt-3 max-w-md text-center text-xs uppercase tracking-[0.2em] text-charcoal-light/70">
          {PRICING_PLACEHOLDER_CAPTION}
        </p>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {category.tiers.map((tier) => (
            <Package key={tier.id} tier={tier} onSelect={() => onSelectTier?.(tier)} />
          ))}
        </div>
      </div>
    </section>
  );
}

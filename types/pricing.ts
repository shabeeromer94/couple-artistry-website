export interface PricingTier {
  id: string;
  name: string;
  /** e.g. "Starting from ₹45,000 — placeholder". Never a bare, unlabeled number. */
  priceLabel: string;
  isPlaceholderPrice: true;
  description: string;
  inclusions: string[];
  ctaLabel?: string;
  highlighted?: boolean;
}

export type PricingCategoryKey = "makeup" | "colour-analysis" | "stitching";

export interface PricingCategory {
  category: PricingCategoryKey;
  categoryLabel: string;
  intro?: string;
  tiers: PricingTier[];
}

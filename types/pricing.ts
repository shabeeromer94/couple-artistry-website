export interface PricingTier {
  id: string;
  name: string;
  /** e.g. "₹40,000" or, while unconfirmed, "Starting from ₹XX,XXX — placeholder". */
  priceLabel: string;
  /** True only while priceLabel is an unconfirmed placeholder — omit/false once real pricing is supplied. */
  isPlaceholderPrice?: boolean;
  description: string;
  inclusions: string[];
  ctaLabel?: string;
  highlighted?: boolean;
}

export type PricingCategoryKey = "makeup" | "bridesmaids-groom" | "colour-analysis" | "stitching";

export interface PricingCategory {
  category: PricingCategoryKey;
  categoryLabel: string;
  intro?: string;
  tiers: PricingTier[];
}

import type { PricingCategory } from "@/types/pricing";

// Single source of truth for every price shown on the site. Nothing in JSX
// should ever contain a raw price string — read from PRICING instead.
//
// No real figures exist yet, and none are invented here — every priceLabel
// uses an explicit "XX,XXX" placeholder token rather than a plausible-looking
// number, so nothing on the live site could be mistaken for a real price.
// Replace the priceLabel strings here (and only here) once real pricing is
// supplied by the brand.

const PLACEHOLDER_PRICE_LABEL = "Starting from ₹XX,XXX — placeholder";

export const PRICING: PricingCategory[] = [
  {
    category: "makeup",
    categoryLabel: "Bridal Makeup Packages",
    intro:
      "Package structure shown for reference only — pricing is placeholder pending confirmation, and is always finalized during your inquiry.",
    tiers: [
      {
        id: "makeup-essential",
        name: "Essential Bridal",
        priceLabel: PLACEHOLDER_PRICE_LABEL,
        isPlaceholderPrice: true,
        description: "A refined single-look bridal package for an intimate celebration.",
        inclusions: [
          "Bridal HD makeup — 1 look",
          "Hairstyling — 1 look",
          "Pre-bridal consultation",
        ],
      },
      {
        id: "makeup-signature",
        name: "Signature Bridal",
        priceLabel: PLACEHOLDER_PRICE_LABEL,
        isPlaceholderPrice: true,
        description: "Our most-booked package, for weddings with multiple ceremonies.",
        inclusions: [
          "Bridal HD makeup — up to 2 looks",
          "Hairstyling — up to 2 looks",
          "Draping assistance",
          "Pre-bridal trial session",
        ],
        highlighted: true,
      },
      {
        id: "makeup-couture",
        name: "Couture Bridal",
        priceLabel: PLACEHOLDER_PRICE_LABEL,
        isPlaceholderPrice: true,
        description: "The complete couple-led experience across every ceremony.",
        inclusions: [
          "Bridal HD/airbrush makeup — up to 4 looks",
          "Hairstyling — up to 4 looks",
          "Dedicated on-site artist team",
          "Two trial sessions",
        ],
      },
    ],
  },
  {
    category: "colour-analysis",
    categoryLabel: "Colour Analysis Packages",
    intro: "Pricing is placeholder — confirmed during your consultation.",
    tiers: [
      {
        id: "colour-personal",
        name: "Personal Colour Analysis",
        priceLabel: PLACEHOLDER_PRICE_LABEL,
        isPlaceholderPrice: true,
        description: "A one-on-one session to identify your seasonal colour palette.",
        inclusions: ["In-person session", "Personal colour palette guide"],
      },
      {
        id: "colour-bridal",
        name: "Bridal Colour Consultation",
        priceLabel: PLACEHOLDER_PRICE_LABEL,
        isPlaceholderPrice: true,
        description: "Colour analysis tailored to outfit, jewellery and makeup planning.",
        inclusions: [
          "Extended in-person session",
          "Personal colour palette guide",
          "Outfit & jewellery-tone recommendations",
        ],
        highlighted: true,
      },
    ],
  },
  {
    category: "stitching",
    categoryLabel: "Stitching & Designing — Starting Prices",
    intro:
      "Starting prices shown for reference only — every figure below is a placeholder, not a real number, until the brand supplies actual pricing. Final cost always depends on design and fabric.",
    tiers: [
      {
        id: "stitching-blouse",
        name: "Blouse Designing / Stitching",
        priceLabel: PLACEHOLDER_PRICE_LABEL,
        isPlaceholderPrice: true,
        description: "Custom blouse design and stitching to your measurements.",
        inclusions: ["Design consultation", "Fitting session"],
      },
      {
        id: "stitching-skirt",
        name: "Skirt Stitching",
        priceLabel: PLACEHOLDER_PRICE_LABEL,
        isPlaceholderPrice: true,
        description: "Made-to-measure skirt stitching.",
        inclusions: ["Design consultation", "Fitting session"],
      },
      {
        id: "stitching-lehenga",
        name: "Lehenga Customization",
        priceLabel: PLACEHOLDER_PRICE_LABEL,
        isPlaceholderPrice: true,
        description: "Alterations and customization for your lehenga.",
        inclusions: ["Design consultation", "Fitting session"],
      },
      {
        id: "stitching-rework",
        name: "Rework",
        priceLabel: PLACEHOLDER_PRICE_LABEL,
        isPlaceholderPrice: true,
        description: "Repairs, resizing, and rework on existing outfits.",
        inclusions: ["Assessment consultation"],
      },
    ],
  },
];

export function getPricingCategory(category: PricingCategory["category"]) {
  return PRICING.find((p) => p.category === category);
}

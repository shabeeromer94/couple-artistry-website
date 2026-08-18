import type { PricingCategory } from "@/types/pricing";

// Single source of truth for every price shown on the site. Nothing in JSX
// should ever contain a raw price string — read from PRICING instead.
//
// "makeup" and "bridesmaids-groom" carry real, brand-confirmed pricing
// (from the 2026 portfolio/pricing PDF). "colour-analysis" and "stitching"
// still have no confirmed pricing — every priceLabel there stays an explicit
// "XX,XXX" placeholder token rather than a plausible-looking number, so
// nothing on the live site could be mistaken for a real price. Replace those
// priceLabel strings (and only those) once the brand supplies real figures.

const PLACEHOLDER_PRICE_LABEL = "Starting from ₹XX,XXX — placeholder";

export const PRICING: PricingCategory[] = [
  {
    category: "makeup",
    categoryLabel: "Bridal Packages",
    intro:
      "Luxury bridal makeup services curated for your special day. Outstation packages cover locations outside Chennai city limits. We take a limited number of brides per date to ensure every bride receives our full attention.",
    tiers: [
      {
        id: "makeup-bridal-hd-premium",
        name: "Bridal HD Premium",
        priceLabel: "₹40,000",
        description: "Our signature HD bridal look — flawless and camera-ready for every ceremony.",
        inclusions: [
          "HD bridal makeup",
          "Luxury hairstyling",
          "Saree draping",
          "Premium hair extensions",
          "Personal colour analysis",
        ],
      },
      {
        id: "makeup-airbrush-bridal",
        name: "Airbrush Bridal",
        priceLabel: "₹45,000",
        description: "A soft-focus airbrush finish for an ultra-smooth, long-wearing bridal look.",
        inclusions: [
          "Airbrush bridal makeup",
          "Luxury hairstyling",
          "Saree draping",
          "Premium hair extensions",
          "Personal colour analysis",
        ],
      },
      {
        id: "makeup-outstation-hd-premium",
        name: "Outstation Bridal HD Premium",
        priceLabel: "₹50,000",
        description: "HD Premium bridal artistry, brought to you for weddings outside Chennai city limits.",
        inclusions: [
          "HD bridal makeup",
          "Luxury hairstyling",
          "Saree draping",
          "Premium hair extensions",
          "Personal colour analysis",
        ],
      },
      {
        id: "makeup-outstation-airbrush",
        name: "Outstation Airbrush Bridal",
        priceLabel: "₹55,000",
        description: "Airbrush bridal artistry, brought to you for weddings outside Chennai city limits.",
        inclusions: [
          "Airbrush bridal makeup",
          "Luxury hairstyling",
          "Saree draping",
          "Premium hair extensions",
          "Personal colour analysis",
        ],
      },
      {
        id: "makeup-christian-bridal",
        name: "Christian Bridal Package",
        priceLabel: "₹60,000",
        description: "A complete bridal beauty package built around a gown, with a complimentary touch-up.",
        inclusions: [
          "Bridal makeup",
          "Luxury hairstyling",
          "Gown dressing assistance",
          "Premium hair extensions",
          "Personal colour analysis",
          "One complimentary touch-up",
        ],
      },
    ],
  },
  {
    category: "bridesmaids-groom",
    categoryLabel: "Bridesmaids & Groom",
    intro: "Complete the bridal party's look alongside your own. Custom packages are available to suit your celebrations.",
    tiers: [
      {
        id: "groom-styling",
        name: "Groom Styling",
        priceLabel: "₹15,000",
        description: "Polished, camera-ready grooming for the groom.",
        inclusions: ["Makeup", "Hairstyling", "Beard style", "Beard filling"],
      },
      {
        id: "bridesmaid-simple",
        name: "Bridesmaid Simple",
        priceLabel: "₹12,000",
        description: "A clean, elegant look for your bridal party.",
        inclusions: ["Makeup", "Hairstyling", "Saree draping"],
      },
      {
        id: "bridesmaid-party",
        name: "Bridesmaid Party",
        priceLabel: "₹15,000",
        description: "The complete look for your bridesmaids, with added hair extensions.",
        inclusions: ["Makeup", "Hairstyling", "Saree draping", "Hair extensions"],
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

// Real, brand-confirmed add-on pricing and trial details for bridal makeup
// bookings (from the 2026 portfolio/pricing PDF) — sits alongside the core
// bridal packages in lib/config/pricing.ts rather than inside it, since
// add-ons are single line items, not full PricingTier packages.

export interface AddOn {
  label: string;
  priceLabel: string;
}

export const BRIDAL_ADD_ONS: AddOn[] = [
  { label: "Extra Saree Draping", priceLabel: "₹2,500" },
  { label: "Iron Draping", priceLabel: "₹3,500" },
  { label: "Extra Lehenga Draping", priceLabel: "₹1,000" },
  { label: "Madisar Draping", priceLabel: "₹4,500" },
  { label: "Waiting Charges Between Changes", priceLabel: "₹750 / hour" },
  { label: "Extra Hair Extensions", priceLabel: "₹1,000" },
  { label: "Kunjalam", priceLabel: "₹500" },
  { label: "Hair Accessories", priceLabel: "₹500 – ₹2,000" },
];

export const BRIDAL_TRIAL = {
  label: "Hair & Makeup Trial",
  priceLabel: "₹7,500",
  notes: [
    "Trial is done in our studio by prior appointment.",
    "Jewellery and accessory styling guidance included.",
    "Trial recommended after the bridal outfit is finalised.",
    "Please bring your moisturiser, sunscreen, or personal skincare if needed.",
  ],
};

export const BOOKING_INFO = {
  booking: [
    "A 30% advance payment is required to confirm your booking.",
    "The advance amount is non-refundable in case of cancellation.",
    "The remaining amount is to be paid on the day of the service.",
  ],
  outstation: [
    "Comfortable hotel accommodation must be provided for the team.",
    "Travel arrangements should be made for locations outside the city.",
    "A suitable space for makeup setup should be available at the venue.",
  ],
};

import { env } from "./env";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Makeup", href: "/makeup" },
  { label: "Classes", href: "/classes" },
  { label: "Colour Analysis", href: "/colour-analysis" },
  { label: "Stitching & Designing", href: "/stitching" },
  { label: "Shaash Beauty Store", href: env.shaashStoreUrl, external: true },
];

export interface ServiceCardConfig {
  title: string;
  description: string;
  href: string;
  external?: boolean;
  placeholderLabel: string;
}

export const SERVICE_CARDS: ServiceCardConfig[] = [
  {
    title: "Makeup",
    description: "Bridal and occasion makeup, led by the couple, built around you.",
    href: "/makeup",
    placeholderLabel: "Makeup",
  },
  {
    title: "Classes",
    description: "Learn makeup and hair artistry, from self-grooming to advanced technique.",
    href: "/classes",
    placeholderLabel: "Classes",
  },
  {
    title: "Colour Analysis",
    description: "Discover your seasonal palette and translate it into your event.",
    href: "/colour-analysis",
    placeholderLabel: "Colour Analysis",
  },
  {
    title: "Stitching & Designing",
    description: "Custom blouse, skirt, and lehenga stitching, designed around you.",
    href: "/stitching",
    placeholderLabel: "Stitching",
  },
  {
    title: "Shaash Beauty Store",
    description: "Shop the products behind the looks, on our dedicated store.",
    href: env.shaashStoreUrl,
    external: true,
    placeholderLabel: "Beauty Store",
  },
];

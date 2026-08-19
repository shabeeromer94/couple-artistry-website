import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Couple Artistry by Shaash, plus how to reach us — WhatsApp, Instagram, and Google Reviews.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}

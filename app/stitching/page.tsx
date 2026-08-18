import type { Metadata } from "next";
import StitchingPageClient from "./StitchingPageClient";

export const metadata: Metadata = {
  title: "Stitching & Designing",
  description: "Custom blouse, skirt, and lehenga stitching, designed and fitted around you.",
};

export default function StitchingPage() {
  return <StitchingPageClient />;
}

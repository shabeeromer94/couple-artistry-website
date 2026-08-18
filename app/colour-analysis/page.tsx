import type { Metadata } from "next";
import ColourAnalysisPageClient from "./ColourAnalysisPageClient";

export const metadata: Metadata = {
  title: "Colour Analysis",
  description: "Discover your seasonal colour palette and translate it into your event, with a guided consultation.",
};

export default function ColourAnalysisPage() {
  return <ColourAnalysisPageClient />;
}

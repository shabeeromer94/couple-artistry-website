import type { Metadata } from "next";
import MakeupPageClient from "./MakeupPageClient";

export const metadata: Metadata = {
  title: "Makeup",
  description:
    "Editorial-quality bridal makeup and hairstyling, led by the couple — from consultation to your final look.",
};

export default function MakeupPage() {
  return <MakeupPageClient />;
}

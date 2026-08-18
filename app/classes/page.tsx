import type { Metadata } from "next";
import ClassesPageClient from "./ClassesPageClient";

export const metadata: Metadata = {
  title: "Classes",
  description: "Learn makeup and hair artistry with Couple Artistry — from self-grooming to advanced technique.",
};

export default function ClassesPage() {
  return <ClassesPageClient />;
}

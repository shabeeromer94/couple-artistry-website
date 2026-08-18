"use client";

import { motion } from "framer-motion";
import { scrollFadeUpProps, staggerContainer } from "@/lib/motion";
import { SectionHeading } from "@/components/shared/SectionHeading";

const APPROACH_STEPS = [
  {
    title: "Initial Consultation",
    description:
      "We begin by understanding your wedding schedule, event details, personal preferences, and bridal vision to ensure every aspect of your look is thoughtfully planned.",
  },
  {
    title: "Colour Analysis & Style Discovery",
    description:
      "For brides across India and abroad, we conduct a personalised colour analysis session to identify the shades, tones, and styling elements that complement you best.",
  },
  {
    title: "Outfit & Styling Guidance",
    description:
      "Based on your colour profile and wedding aesthetic, we guide you with outfit selection, blouse design ideas, silhouette recommendations, and overall bridal styling direction.",
  },
  {
    title: "Jewellery Coordination",
    description:
      "We help curate jewellery choices that work harmoniously with your outfit, colour palette, and bridal look, ensuring a cohesive and elegant appearance.",
  },
  {
    title: "Bridal Look Planning",
    description:
      "Once styling is finalised, we create a complete bridal beauty plan including makeup, hairstyle, accessories, and finishing details for each event.",
  },
  {
    title: "Trial Session (Optional)",
    description:
      "For brides who prefer a complete preview before the wedding day, a bridal trial session can be arranged to refine and perfect the final look.",
  },
  {
    title: "Your Wedding Day",
    description:
      "With every detail planned in advance, we focus on delivering a calm, organised, and luxurious bridal experience while bringing your vision to life.",
  },
];

export function BridalApproach() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-content">
        <SectionHeading
          eyebrow="Our Process"
          title="Our Bridal Approach"
          description="A thoughtfully curated journey to bring your bridal vision to life."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={staggerContainer}
          className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {APPROACH_STEPS.map((step, index) => (
            <motion.div key={step.title} variants={scrollFadeUpProps.variants} className="text-left">
              <span className="font-display text-sm text-rose-dark/70">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-display text-xl text-charcoal">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-light">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

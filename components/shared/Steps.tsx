"use client";

import { motion } from "framer-motion";
import { scrollFadeUpProps, staggerContainer } from "@/lib/motion";

interface Step {
  title: string;
  description: string;
}

interface StepsProps {
  steps: Step[];
}

export function Steps({ steps }: StepsProps) {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={staggerContainer}
      className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
    >
      {steps.map((step, index) => (
        <motion.li key={step.title} variants={scrollFadeUpProps.variants} className="text-left">
          <span className="font-display text-4xl font-semibold text-rose">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 font-display text-lg font-semibold text-charcoal">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-light">{step.description}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
}

"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { getGalleryImages } from "@/lib/config/gallery";
import { COLOUR_ANALYSIS_VALUE_PROPS, COLOUR_ANALYSIS_PROCESS_STEPS } from "@/lib/config/valueProps";
import { COLOUR_ANALYSIS_INQUIRY_FIELDS } from "@/lib/config/inquiryFields";
import { scrollFadeUpProps } from "@/lib/motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ValueProps } from "@/components/shared/ValueProps";
import { Steps } from "@/components/shared/Steps";
import { Gallery } from "@/components/shared/Gallery";
import { ScrollFadeSection } from "@/components/shared/ScrollFadeSection";
import { PackageGrid } from "@/components/shared/PackageGrid";
import { InquiryForm } from "@/components/shared/InquiryForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { WhatIsColourAnalysis } from "@/components/colour-analysis/WhatIsColourAnalysis";
import { SlotGrid } from "@/components/colour-analysis/SlotGrid";

export default function ColourAnalysisPageClient() {
  const inquiryRef = useRef<HTMLDivElement>(null);

  return (
    <main>
      <ScrollFadeSection className="px-6 pb-16 pt-20 text-center md:pb-24 md:pt-28">
        <motion.p {...scrollFadeUpProps} className="text-xs uppercase tracking-[0.3em] text-rose-dark">
          Colour Analysis
        </motion.p>
        <motion.h1
          {...scrollFadeUpProps}
          className="mx-auto mt-5 max-w-2xl font-display text-4xl leading-tight text-charcoal sm:text-5xl"
        >
          Discover Your Palette
        </motion.h1>
        <motion.p {...scrollFadeUpProps} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-charcoal-light">
          A guided session to identify the colours that work naturally in your favour — and translate
          them directly into your event.
        </motion.p>
      </ScrollFadeSection>

      <WhatIsColourAnalysis />

      <ScrollFadeSection className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Why Choose Us" title="Why a Guided Analysis" />
          <div className="mt-14">
            <ValueProps items={COLOUR_ANALYSIS_VALUE_PROPS} columns={3} />
          </div>
        </div>
      </ScrollFadeSection>

      <ScrollFadeSection className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Gallery" title="From Our Sessions" />
          <div className="mt-14">
            <Gallery images={getGalleryImages("colour-analysis")} />
          </div>
        </div>
      </ScrollFadeSection>

      <ScrollFadeSection className="bg-ivory-dark px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Process" title="How It Works" />
          <div className="mt-14">
            <Steps steps={COLOUR_ANALYSIS_PROCESS_STEPS} />
          </div>
        </div>
      </ScrollFadeSection>

      <PackageGrid categoryKey="colour-analysis" />

      <ScrollFadeSection className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Book a Slot" title="Choose a Time (11 AM – 5 PM)" />
          <div className="mt-14">
            <SlotGrid
              onSlotSelected={() =>
                setTimeout(() => inquiryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
              }
            />
          </div>
        </div>
      </ScrollFadeSection>

      <ScrollFadeSection ref={inquiryRef} className="scroll-mt-24 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Get In Touch" title="Send an Inquiry" />
          <div className="mt-14">
            <InquiryForm
              flowType="colour-analysis"
              fields={COLOUR_ANALYSIS_INQUIRY_FIELDS}
              heading="Your Inquiry"
            />
          </div>
        </div>
      </ScrollFadeSection>

      <ScrollFadeSection className="px-6 pb-24 text-center md:pb-32">
        <p className="mb-6 text-sm text-charcoal-light">Prefer to chat directly?</p>
        <WhatsAppButton variant="primary" />
      </ScrollFadeSection>
    </main>
  );
}

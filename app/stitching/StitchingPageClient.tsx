"use client";

import { motion } from "framer-motion";
import { getGalleryImages } from "@/lib/config/gallery";
import { STITCHING_VALUE_PROPS } from "@/lib/config/valueProps";
import { STITCHING_INQUIRY_FIELDS } from "@/lib/config/inquiryFields";
import { scrollFadeUpProps } from "@/lib/motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ValueProps } from "@/components/shared/ValueProps";
import { Gallery } from "@/components/shared/Gallery";
import { ScrollFadeSection } from "@/components/shared/ScrollFadeSection";
import { PackageGrid } from "@/components/shared/PackageGrid";
import { InquiryForm } from "@/components/shared/InquiryForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export default function StitchingPageClient() {
  return (
    <main>
      <ScrollFadeSection className="px-6 pb-16 pt-20 text-center md:pb-24 md:pt-28">
        <motion.p {...scrollFadeUpProps} className="text-xs uppercase tracking-[0.3em] text-rose-dark">
          Stitching &amp; Designing
        </motion.p>
        <motion.h1
          {...scrollFadeUpProps}
          className="mx-auto mt-5 max-w-2xl font-display text-4xl leading-tight text-charcoal sm:text-5xl"
        >
          Made to Measure, Made for You
        </motion.h1>
        <motion.p {...scrollFadeUpProps} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-charcoal-light">
          Custom blouse, skirt, and lehenga stitching, designed around your reference, your fabric, and
          your occasion.
        </motion.p>
      </ScrollFadeSection>

      <ScrollFadeSection className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Why Choose Us" title="Considered, From Fit to Finish" />
          <div className="mt-14">
            <ValueProps items={STITCHING_VALUE_PROPS} columns={3} />
          </div>
        </div>
      </ScrollFadeSection>

      <ScrollFadeSection className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Gallery" title="From the Studio" />
          <div className="mt-14">
            <Gallery images={getGalleryImages("stitching")} />
          </div>
        </div>
      </ScrollFadeSection>

      <PackageGrid categoryKey="stitching" title="Starting Prices" />

      <ScrollFadeSection disableFade className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Get In Touch" title="Send an Inquiry" />
          <div className="mt-14">
            <InquiryForm flowType="stitching" fields={STITCHING_INQUIRY_FIELDS} heading="Your Inquiry" />
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

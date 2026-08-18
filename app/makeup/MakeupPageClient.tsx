"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useJourney } from "@/lib/context/JourneyProvider";
import { scrollFadeUpProps } from "@/lib/motion";
import { getGalleryImages } from "@/lib/config/gallery";
import { getTestimonials } from "@/lib/config/testimonials";
import { MAKEUP_VALUE_PROPS } from "@/lib/config/valueProps";
import { MAKEUP_INQUIRY_FIELDS } from "@/lib/config/inquiryFields";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ValueProps } from "@/components/shared/ValueProps";
import { Gallery } from "@/components/shared/Gallery";
import { TestimonialSection } from "@/components/shared/TestimonialSection";
import { PackageGrid } from "@/components/shared/PackageGrid";
import { InquiryForm } from "@/components/shared/InquiryForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { BridalPhilosophy } from "@/components/makeup/BridalPhilosophy";
import { AddOnsAndTrial } from "@/components/makeup/AddOnsAndTrial";
import { BookingInfo } from "@/components/makeup/BookingInfo";
import { AvailabilityForm } from "@/components/makeup/AvailabilityForm";
import { AvailabilityResult } from "@/components/makeup/AvailabilityResult";
import type { PricingCategoryKey, PricingTier } from "@/types/pricing";

function scrollTo(ref: React.RefObject<HTMLElement>) {
  ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function MakeupPageClient() {
  const journey = useJourney();
  const resultRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const inquiryRef = useRef<HTMLDivElement>(null);

  function handleSelectTier(category: PricingCategoryKey, tier: PricingTier) {
    journey.setSelectedPackage({ category, tierId: tier.id, tierName: tier.name });
    setTimeout(() => scrollTo(inquiryRef), 100);
  }

  return (
    <main>
      {/* Hero */}
      <section className="px-6 pb-16 pt-20 text-center md:pb-24 md:pt-28">
        <motion.p {...scrollFadeUpProps} className="text-xs uppercase tracking-[0.3em] text-rose-dark">
          Makeup
        </motion.p>
        <motion.h1
          {...scrollFadeUpProps}
          className="mx-auto mt-5 max-w-2xl font-display text-4xl leading-tight text-charcoal sm:text-5xl"
        >
          Bridal Artistry, Led by the Couple
        </motion.h1>
        <motion.p {...scrollFadeUpProps} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-charcoal-light">
          Editorial-quality bridal makeup and hairstyling, built around your outfit, venue, and vision —
          from first consultation to your final look.
        </motion.p>
      </section>

      {/* Why Choose Couple Artistry */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Why Choose Us" title="Why Choose Couple Artistry" />
          <div className="mt-14">
            <ValueProps items={MAKEUP_VALUE_PROPS} />
          </div>
        </div>
      </section>

      <BridalPhilosophy />

      {/* Portfolio Gallery */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Portfolio" title="A Look at Our Work" />
          <div className="mt-14">
            <Gallery images={getGalleryImages("makeup")} />
          </div>
        </div>
      </section>

      <TestimonialSection testimonials={getTestimonials("makeup")} />

      {/* Check Availability */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Availability" title="Check Your Date" />
          <div className="mt-14">
            <AvailabilityForm onResult={() => setTimeout(() => scrollTo(resultRef), 100)} />
          </div>
        </div>
      </section>

      {/* Availability Result */}
      {journey.availabilityResult && (
        <section ref={resultRef} className="scroll-mt-24 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-content">
            <AvailabilityResult
              result={journey.availabilityResult}
              onViewPackages={() => scrollTo(packagesRef)}
            />
          </div>
        </section>
      )}

      {/* Packages */}
      <div ref={packagesRef} className="scroll-mt-24">
        <PackageGrid categoryKey="makeup" onSelectTier={(tier) => handleSelectTier("makeup", tier)} />
        <PackageGrid
          categoryKey="bridesmaids-groom"
          onSelectTier={(tier) => handleSelectTier("bridesmaids-groom", tier)}
        />
      </div>

      <AddOnsAndTrial />

      <BookingInfo />

      {/* Inquiry */}
      <section ref={inquiryRef} className="scroll-mt-24 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Get In Touch" title="Send an Inquiry" />
          <div className="mt-14">
            <InquiryForm flowType="makeup" fields={MAKEUP_INQUIRY_FIELDS} heading="Your Inquiry" />
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="px-6 pb-24 text-center md:pb-32">
        <p className="mb-6 text-sm text-charcoal-light">Prefer to chat directly?</p>
        <WhatsAppButton variant="primary" />
      </section>
    </main>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useJourney } from "@/lib/context/JourneyProvider";
import { scrollFadeUpProps } from "@/lib/motion";
import { getTestimonials } from "@/lib/config/testimonials";
import { MAKEUP_VALUE_PROPS } from "@/lib/config/valueProps";
import { MAKEUP_INQUIRY_FIELDS } from "@/lib/config/inquiryFields";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ValueProps } from "@/components/shared/ValueProps";
import { ScrollFadeSection } from "@/components/shared/ScrollFadeSection";
import { TestimonialSection } from "@/components/shared/TestimonialSection";
import { PackageGrid } from "@/components/shared/PackageGrid";
import { InquiryForm } from "@/components/shared/InquiryForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { GalleryCategories } from "@/components/makeup/GalleryCategories";
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
  // Pricing stays hidden until a bride has checked her date — she either
  // lands here because her date is open, or explicitly asks to see pricing
  // anyway after an unavailable result. Pre-seeded true if she already did
  // this earlier in the session and got an available result.
  const [packagesUnlocked, setPackagesUnlocked] = useState(
    () => journey.availabilityResult?.overallStatus === "available"
  );

  function handleViewPackages() {
    setPackagesUnlocked(true);
    setTimeout(() => scrollTo(packagesRef), 100);
  }

  function handleSelectTier(category: PricingCategoryKey, tier: PricingTier) {
    journey.setSelectedPackage({ category, tierId: tier.id, tierName: tier.name });
    setTimeout(() => scrollTo(inquiryRef), 100);
  }

  return (
    <main>
      {/* Hero — full-bleed portfolio photo, extending up under the
          transparent nav (-mt-24 matches the nav's own h-24). Headline
          overlaid bottom-left on a dark scrim so it stays readable
          regardless of crop. */}
      <ScrollFadeSection className="relative -mt-24 h-[65vh] min-h-[440px] w-full overflow-hidden sm:h-[75vh] md:h-[88vh]">
        <Image
          src="/images/makeup/hero.jpg"
          alt="Bridal makeup and hairstyling by Couple Artistry by Shaash"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 sm:px-10 sm:pb-14 md:px-16 md:pb-16">
          <motion.p {...scrollFadeUpProps} className="text-xs uppercase tracking-[0.3em] text-ivory/80">
            Makeup
          </motion.p>
          <motion.h1
            {...scrollFadeUpProps}
            className="mt-4 max-w-xl font-display text-4xl leading-tight text-ivory sm:text-5xl md:text-6xl"
          >
            Bridal Artistry, Led by the Couple
          </motion.h1>
          <motion.p {...scrollFadeUpProps} className="mt-5 max-w-md text-base leading-relaxed text-ivory/90">
            Makeup and hairstyling shaped around your outfit, venue, and vision — with every detail
            considered from consultation to the final look.
          </motion.p>
        </div>
      </ScrollFadeSection>

      {/* Why Choose Couple Artistry */}
      <ScrollFadeSection className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Why Choose Us" title="Why Choose Couple Artistry" />
          <div className="mt-14">
            <ValueProps items={MAKEUP_VALUE_PROPS} />
          </div>
        </div>
      </ScrollFadeSection>

      {/* Portfolio Gallery — by category, closed by default; click a
          category to reveal its own gallery. */}
      <ScrollFadeSection className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading eyebrow="Portfolio" title="A Look at Our Work" />
          <div className="mt-14">
            <GalleryCategories />
          </div>
        </div>
      </ScrollFadeSection>

      <TestimonialSection testimonials={getTestimonials("makeup")} />

      {/* Check Availability & Packages — one combined section: checking a
          date surfaces both the availability status and, right after, the
          packages and pricing that apply, so there's no separate "pricing"
          section repeating the same "check your date first" message. */}
      <ScrollFadeSection className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-content">
          <SectionHeading
            eyebrow="Availability & Packages"
            title="Check Your Date"
            description="Check your date to get your availability status and see the packages and pricing that apply to you."
          />
          <div className="mt-14">
            <AvailabilityForm onResult={() => setTimeout(() => scrollTo(resultRef), 100)} />
          </div>
        </div>
      </ScrollFadeSection>

      {/* Availability Result */}
      {journey.availabilityResult && (
        <ScrollFadeSection ref={resultRef} className="scroll-mt-24 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-content">
            <AvailabilityResult result={journey.availabilityResult} onViewPackages={handleViewPackages} />
          </div>
        </ScrollFadeSection>
      )}

      {/* Packages — gated behind an availability check so pricing only
          appears once a bride has checked her date (or asked to see it
          anyway after an unavailable result); the section above already
          explains that, so there's nothing to show here until then. */}
      {packagesUnlocked && (
        <>
          <div ref={packagesRef} className="scroll-mt-24">
            <PackageGrid categoryKey="makeup" onSelectTier={(tier) => handleSelectTier("makeup", tier)} />
            <PackageGrid
              categoryKey="bridesmaids-groom"
              onSelectTier={(tier) => handleSelectTier("bridesmaids-groom", tier)}
            />
          </div>

          <AddOnsAndTrial />

          <BookingInfo />
        </>
      )}

      {/* Inquiry — only once a date's been checked, so a bride reaches the
          form with an availability result (and possibly a package) already
          in hand, instead of being asked to inquire blind. */}
      {journey.availabilityResult && (
        <ScrollFadeSection ref={inquiryRef} className="scroll-mt-24 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-content">
            <SectionHeading eyebrow="Get In Touch" title="Send an Inquiry" />
            <div className="mt-14">
              <InquiryForm flowType="makeup" fields={MAKEUP_INQUIRY_FIELDS} heading="Your Inquiry" />
            </div>
          </div>
        </ScrollFadeSection>
      )}

      {/* WhatsApp CTA */}
      <ScrollFadeSection className="px-6 pb-24 text-center md:pb-32">
        <p className="mb-6 text-sm text-charcoal-light">Prefer to chat directly?</p>
        <WhatsAppButton variant="primary" />
      </ScrollFadeSection>
    </main>
  );
}

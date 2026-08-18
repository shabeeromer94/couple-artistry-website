"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ClassLevel, ClassType } from "@/lib/config/classes";
import { CLASSES_INQUIRY_FIELDS } from "@/lib/config/inquiryFields";
import { scrollFadeUpProps } from "@/lib/motion";
import { LearningPathPicker } from "@/components/classes/LearningPathPicker";
import { InquiryForm } from "@/components/shared/InquiryForm";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ScrollFadeSection } from "@/components/shared/ScrollFadeSection";

export default function ClassesPageClient() {
  const [classType, setClassType] = useState<ClassType | null>(null);
  const [level, setLevel] = useState<ClassLevel | null>(null);
  const [showInquiry, setShowInquiry] = useState(false);

  return (
    <main>
      <ScrollFadeSection className="px-6 pb-16 pt-20 text-center md:pb-24 md:pt-28">
        <motion.p {...scrollFadeUpProps} className="text-xs uppercase tracking-[0.3em] text-rose-dark">
          Classes
        </motion.p>
        <motion.h1
          {...scrollFadeUpProps}
          className="mx-auto mt-5 max-w-2xl font-display text-4xl leading-tight text-charcoal sm:text-5xl"
        >
          Learn Makeup & Hair Artistry
        </motion.h1>
        <motion.p {...scrollFadeUpProps} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-charcoal-light">
          From self-grooming essentials to advanced technique, taught the way we practice it —
          hands-on, personal, and built around you.
        </motion.p>
      </ScrollFadeSection>

      <ScrollFadeSection className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-content">
          {!showInquiry ? (
            <LearningPathPicker
              classType={classType}
              level={level}
              onSelectType={setClassType}
              onSelectLevel={setLevel}
              onContinue={() => setShowInquiry(true)}
            />
          ) : (
            <div className="mx-auto max-w-lg">
              <InquiryForm
                flowType="classes"
                fields={CLASSES_INQUIRY_FIELDS}
                heading="Your Class Inquiry"
                initialValues={{ classType: classType ?? "", level: level ?? "" }}
              />
            </div>
          )}
        </div>
      </ScrollFadeSection>

      <ScrollFadeSection className="px-6 pb-24 text-center md:pb-32">
        <p className="mb-6 text-sm text-charcoal-light">Prefer to chat directly?</p>
        <WhatsAppButton variant="primary" />
      </ScrollFadeSection>
    </main>
  );
}

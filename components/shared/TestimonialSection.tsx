import type { Testimonial as TestimonialType } from "@/types/testimonial";
import { Testimonial } from "./Testimonial";
import { SectionHeading } from "./SectionHeading";
import { TESTIMONIALS_PLACEHOLDER_CAPTION } from "@/lib/config/copy";
import { env } from "@/lib/config/env";

interface TestimonialSectionProps {
  testimonials: TestimonialType[];
  eyebrow?: string;
  title?: string;
}

export function TestimonialSection({
  testimonials,
  eyebrow = "Client Reflections",
  title = "In Their Words",
}: TestimonialSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <p className="mx-auto mt-3 max-w-md text-center text-xs uppercase tracking-[0.2em] text-charcoal-light/70">
          {TESTIMONIALS_PLACEHOLDER_CAPTION}
        </p>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Testimonial key={t.id} testimonial={t} />
          ))}
        </div>
        <p className="mt-10 text-center">
          <a
            href={env.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.2em] text-rose-dark hover:text-wine"
          >
            Read more on Google →
          </a>
        </p>
      </div>
    </section>
  );
}

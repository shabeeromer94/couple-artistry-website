import type { Testimonial as TestimonialType } from "@/types/testimonial";

export function Testimonial({ testimonial }: { testimonial: TestimonialType }) {
  return (
    <figure className="flex h-full flex-col justify-between border border-charcoal/10 bg-ivory p-8">
      <blockquote className="font-display text-lg leading-relaxed text-charcoal">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 text-xs uppercase tracking-[0.15em] text-charcoal-light">
        {testimonial.authorName}
        {testimonial.rating && (
          <span className="ml-2 text-rose" aria-label={`${testimonial.rating} out of 5`}>
            {"★".repeat(testimonial.rating)}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

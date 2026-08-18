import type { Testimonial } from "@/types/testimonial";

// Placeholder testimonials only — never real client quotes. Designed so a
// future integration can replace this array with reviews pulled from the
// brand's Google Business profile (see env.googleReviewUrl) without any
// change to TestimonialSection's props.

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "placeholder-1",
    authorName: "Placeholder Client — Bride, 2025",
    quote:
      "This is placeholder testimonial text standing in for a real client review. Replace with an actual quote once available.",
    service: "makeup",
    rating: 5,
    isPlaceholder: true,
    source: "placeholder",
  },
  {
    id: "placeholder-2",
    authorName: "Placeholder Client — Bride, 2025",
    quote:
      "This is placeholder testimonial text standing in for a real client review. Replace with an actual quote once available.",
    service: "makeup",
    rating: 5,
    isPlaceholder: true,
    source: "placeholder",
  },
  {
    id: "placeholder-3",
    authorName: "Placeholder Client — Bride, 2025",
    quote:
      "This is placeholder testimonial text standing in for a real client review. Replace with an actual quote once available.",
    service: "makeup",
    rating: 5,
    isPlaceholder: true,
    source: "placeholder",
  },
];

export function getTestimonials(service?: Testimonial["service"]): Testimonial[] {
  if (!service) return TESTIMONIALS;
  return TESTIMONIALS.filter((t) => t.service === service);
}

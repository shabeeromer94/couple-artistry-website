export type TestimonialService = "makeup" | "classes" | "colour-analysis" | "stitching";

export interface Testimonial {
  id: string;
  /** Always a clearly-placeholder name until real Google reviews are wired in. */
  authorName: string;
  quote: string;
  service: TestimonialService;
  rating?: number;
  /** Literal true — this app never invents testimonials as if they were real. */
  isPlaceholder: true;
  source: "placeholder" | "google";
}

export type TestimonialService = "makeup" | "classes" | "colour-analysis" | "stitching";

export interface Testimonial {
  id: string;
  /** A placeholder entry always uses a clearly-fake name; a "google" entry uses the reviewer's real name, copied verbatim from the review. */
  authorName: string;
  quote: string;
  service: TestimonialService;
  rating?: number;
  /** True only for placeholder copy — this app never invents testimonials as if they were real. False for genuine reviews (source: "google"). */
  isPlaceholder: boolean;
  source: "placeholder" | "google";
}

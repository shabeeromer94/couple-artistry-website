import type { Testimonial } from "@/types/testimonial";

// Real reviews, copied verbatim from the brand's Google Business profile
// (see env.googleReviewUrl) — reviewer names, ratings, and quotes are exactly
// as posted there. Any future addition should be a genuine review copied the
// same way, never invented copy; use source: "placeholder" only for a
// section that has no real reviews yet.

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "google-aksshaya",
    authorName: "Aksshaya Kalyanakumar",
    quote:
      "Shabeer and Ashi are super kind, approachable and communicative! They were in touch with me from the beginning, starting from colour analysis to shopping for clothes and jewels. The process of getting the makeup done was also fun, we were chatting and listening to music. And their work speaks for itself. Everyone complemented us so much for how elegant we looked. We continue to use the colour palette shared by them for our everyday shopping lol! Absolutely loved working with them! 💜💜",
    service: "makeup",
    rating: 5,
    isPlaceholder: false,
    source: "google",
  },
  {
    id: "google-mounika",
    authorName: "Mounika Venkatasami",
    quote:
      "A very talented team! Made me feel like a bride with every bit of their work. I received compliments for my Make up and Hairstyling on the night my reception but, what was amazing about their work is that, on the day of main wedding (which happened in the odd hours of 4am to 6am), I had people complimenting me for the Makeup, hair and draping even at the end of day. Couldn't have asked for better quality of experience on my big day. Worth every bit of money!! I hope to work with y'all again :) ❤️",
    service: "makeup",
    rating: 5,
    isPlaceholder: false,
    source: "google",
  },
  {
    id: "google-shivaani",
    authorName: "Shivaani K",
    quote:
      "Ashi and Shabeer were extremely professional. Right from brainstorming looks to finalizing hairstyles/make up that suit me. They proactively asked for feedback during the session and incorporated those. I absolutely loved both the looks - reception and wedding. It was exactly what I asked for subtle soft glam but several times better than what I had imagined in my head. Makeup, hair and saree draping was on point. Received a lot of compliments for the overall look. I highly recommend brides to work with them 💗 They know how makeup works on Indian skin way too well.",
    service: "makeup",
    rating: 5,
    isPlaceholder: false,
    source: "google",
  },
];

export function getTestimonials(service?: Testimonial["service"]): Testimonial[] {
  if (!service) return TESTIMONIALS;
  return TESTIMONIALS.filter((t) => t.service === service);
}

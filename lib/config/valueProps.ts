export interface ValueProp {
  title: string;
  description: string;
}

export const MAKEUP_VALUE_PROPS: ValueProp[] = [
  {
    title: "Consultation",
    description:
      "We begin by understanding your wedding schedule, event details, personal preferences, and bridal vision, so every aspect of your look is thoughtfully planned.",
  },
  {
    title: "Colour Analysis-Led Artistry",
    description:
      "Every look starts with a personalised colour analysis session — the shades, tones, and styling choices we recommend are built around what genuinely suits you.",
  },
  {
    title: "Bridal Look Styling",
    description:
      "From jewellery to hairstyle to finishing details, we plan a complete bridal beauty look for each event — not just the makeup.",
  },
  {
    title: "Trial Sessions (Optional)",
    description:
      "Prefer a preview before the big day? A bridal trial session can be arranged to refine and perfect your final look.",
  },
];

export const COLOUR_ANALYSIS_VALUE_PROPS: ValueProp[] = [
  {
    title: "Personalized to You",
    description: "Every recommendation is built around your natural undertone and contrast — never a generic chart.",
  },
  {
    title: "Bridal-Ready Application",
    description: "Findings are translated directly into outfit, jewellery, and makeup decisions for your event.",
  },
  {
    title: "Clear, Usable Takeaways",
    description: "You leave with a palette guide you can actually use while shopping and planning.",
  },
];

export const STITCHING_VALUE_PROPS: ValueProp[] = [
  {
    title: "Made to Measure",
    description: "Every piece is fitted to you, not adjusted from a standard size.",
  },
  {
    title: "Design Collaboration",
    description: "We work from your reference, your fabric, and your occasion — not a fixed catalogue.",
  },
  {
    title: "Considered Finishing",
    description: "Detailing and finishing built to hold up through a full day of wear.",
  },
];

export const COLOUR_ANALYSIS_PROCESS_STEPS = [
  { title: "Consultation", description: "We discuss your event, outfit plans, and what you'd like to understand about your colouring." },
  { title: "Draping Session", description: "A guided in-person draping session identifies your seasonal palette." },
  { title: "Palette Guide", description: "You receive a personal colour guide to use for outfits, jewellery, and makeup." },
  { title: "Ongoing Reference", description: "Keep the guide as a reference for every future event, not just this one." },
];

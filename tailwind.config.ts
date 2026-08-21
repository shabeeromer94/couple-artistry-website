import type { Config } from "tailwindcss";

// Luxury bridal editorial palette: warm ivory, near-black charcoal, one
// muted rose-terracotta accent, deeper wine for primary CTAs. Deliberately
// small — 3-4 shades per token, not a full 50-900 ramp — restraint is the
// point.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FAF7F2",
          dark: "#F1EAE0",
        },
        charcoal: {
          DEFAULT: "#2A2622",
          light: "#544C44",
        },
        rose: {
          DEFAULT: "#B76E5A",
          light: "#D6A392",
          dark: "#8F5344",
        },
        wine: {
          DEFAULT: "#5C1A28",
          dark: "#3F1119",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "88rem",
      },
      // Warm, wine-tinted shadows rather than generic black/gray — gives
      // cards and buttons real lift without reading as a default UI-kit
      // shadow. "soft" for resting state, "lift" for hover.
      boxShadow: {
        soft: "0 1px 2px rgba(42,38,34,0.05), 0 10px 28px -12px rgba(93,26,40,0.18)",
        lift: "0 2px 8px rgba(42,38,34,0.08), 0 20px 44px -16px rgba(93,26,40,0.30)",
      },
    },
  },
  plugins: [],
};
export default config;

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
    },
  },
  plugins: [],
};
export default config;

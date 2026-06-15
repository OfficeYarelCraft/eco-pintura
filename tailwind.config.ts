import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "eco-lime": "var(--eco-lime)",
        "eco-green": "var(--eco-green)",
        "eco-green-deep": "var(--eco-green-deep)",
        "eco-forest": "var(--eco-forest)",
        "paint-amber": "var(--paint-amber)",
        "paint-orange": "var(--paint-orange)",
        "paint-orange-deep": "var(--paint-orange-deep)",
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        line: "var(--line)",
      },
      borderRadius: {
        "sm-brand": "var(--r-sm)",
        "md-brand": "var(--r-md)",
        "lg-brand": "var(--r-lg)",
        "xl-brand": "var(--r-xl)",
        pill: "var(--r-pill)",
      },
      boxShadow: {
        "brand-sm": "var(--shadow-sm)",
        "brand-md": "var(--shadow-md)",
        "glow-eco": "var(--shadow-glow-eco)",
        "glow-paint": "var(--shadow-glow-paint)",
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "system-ui", "sans-serif"],
        body: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "step--1": "var(--step--1)",
        "step-0": "var(--step-0)",
        "step-1": "var(--step-1)",
        "step-2": "var(--step-2)",
        "step-3": "var(--step-3)",
        "step-4": "var(--step-4)",
        "step-5": "var(--step-5)",
      },
      backgroundImage: {
        "grad-eco": "var(--grad-eco)",
        "grad-paint": "var(--grad-paint)",
        "grad-hero": "var(--grad-hero)",
      },
    },
  },
  plugins: [],
};

export default config;

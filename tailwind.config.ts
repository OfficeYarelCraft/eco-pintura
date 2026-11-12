import type { Config } from "tailwindcss";

/**
 * Tokens mirror the Figma "Color" collection (paint/*, deck/*, partner/*).
 * Radius is 0 everywhere on purpose: the brand is the clean cut-in line.
 */
const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "560px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    borderRadius: {
      none: "0",
      DEFAULT: "0",
      device: "46px",
      screen: "38px",
      ui: "14px",
      chip: "8px",
      full: "9999px",
    },
    extend: {
      /* Literal hex (not CSS vars) so opacity modifiers like text-paper/60 work.
         Keep in sync with :root in app/globals.css. */
      colors: {
        paper: "#eeeee8",
        plaster: "#deddd5",
        ink: "#151513",
        "ink-soft": "#5a5a54",
        signal: "#ee5524",
        "signal-deep": "#c9401a",
        leaf: "#2f9e48",
        tape: "#e6d7a3",
        "tape-edge": "#cdbd86",
        night: "#101813",
        "night-raised": "#1a251e",
        deck: {
          blanco: "#ece8df",
          ocre: "#d39b3a",
          escalera: "#5f7f5a",
          botiga: "#234f3b",
          naranja: "#ee5524",
          antracita: "#2f3234",
        },
        ob: {
          bg: "#070809",
          surface: "#14171a",
          amber: "#e6a532",
          text: "#f2f2f0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        stencil: [
          "var(--font-stencil)",
          "var(--font-display)",
          "Arial Narrow",
          "sans-serif",
        ],
        body: ["var(--font-body)", "Helvetica Neue", "Arial", "sans-serif"],
        syne: ["var(--font-syne)", "var(--font-body)", "sans-serif"],
        figtree: ["var(--font-figtree)", "var(--font-body)", "sans-serif"],
        plexmono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        h1: ["var(--fs-h1)", { lineHeight: "0.88", letterSpacing: "-0.005em" }],
        h2: ["var(--fs-h2)", { lineHeight: "0.92", letterSpacing: "-0.005em" }],
        h3: ["var(--fs-h3)", { lineHeight: "1", letterSpacing: "0" }],
        lead: [
          "var(--fs-lead)",
          { lineHeight: "1.45", letterSpacing: "-0.005em" },
        ],
        body: ["1.0625rem", { lineHeight: "1.55", letterSpacing: "-0.002em" }],
        small: ["0.9375rem", { lineHeight: "1.5" }],
        caption: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.002em" }],
      },
      spacing: {
        gutter: "var(--gutter)",
        section: "var(--section-y)",
      },
      maxWidth: {
        site: "1440px",
      },
      transitionTimingFunction: {
        cinta: "var(--ease-cinta)",
        rodillo: "var(--ease-rodillo)",
        despegar: "var(--ease-despegar)",
      },
    },
  },
  plugins: [],
};

export default config;

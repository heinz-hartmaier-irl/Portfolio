import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        navy: "rgb(var(--color-navy) / <alpha-value>)",
        rose: "rgb(var(--color-rose) / <alpha-value>)",
        orange: "rgb(var(--color-orange) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "var(--glow)"
      }
    }
  },
  plugins: []
};

export default config;

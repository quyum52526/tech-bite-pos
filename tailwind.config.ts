import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbf6",
          100: "#d5f5e8",
          200: "#aeead4",
          300: "#79d9ba",
          400: "#43c19b",
          500: "#10b981",
          600: "#12876b",
          700: "#0f6c58",
          800: "#0f5647",
          900: "#0d473c",
        },
        ink: {
          900: "#0a0f1a",
          800: "#111827",
          700: "#1f2937",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-bn)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "var(--font-bn)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;

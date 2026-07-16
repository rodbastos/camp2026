import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F4EDDE",
        "cream-dark": "#EAE0CC",
        forest: "#1E3A2B",
        "forest-light": "#2E5540",
        terracotta: "#BC5F3F",
        "terracotta-dark": "#A34E31",
        sand: "#D8CBB0",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

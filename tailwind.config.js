/** @type {import('tailwindcss').Config} */
import PrimeUI from "tailwindcss-primeui";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["selector", '[class*="app-dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts}",
    "./public/**/*.json",
    "./src/**/*.{html,ts}",
  ],
  plugins: [PrimeUI, typography],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1920px",
    },
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", "Vazirmatn", "sans-serif"],
      },
      colors: {
        baseLatte: "#eff1f5",
        textLatte: "#4c4f69",
        baseMoch: "#24273a",
        textMoch: "#cad3f5",
        baseFrappe: "#303446	",
        textFrappe: "#c6d0f5	",
        baseMocha: "#1e1e2e	",
        textMocha: "#cdd6f4	",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@catppuccin/tailwindcss"),
  ],
};

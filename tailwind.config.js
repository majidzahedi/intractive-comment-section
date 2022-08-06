/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", "Vazirmatn", "sans-serif"],
      },
      colors: {
        latteBase: "hsl(220, 23%, 95%)",
        latteSubText0: "hsl(233, 10%, 47%)",
        latteText: "hsl(234, 16%, 35%)",
        latteSapphire: "hsl(189, 70%, 42%)",
        latteMarron: "hsl(355, 76%, 59%)",
        latteOverlay0: "hsl(228, 11%, 65%)",
        mochaCrust: "hsl(240, 23%, 9%)",
        mochaSubText0: "hsl(228, 24%, 72%)",
        mochaText: "hsl(226, 64%, 88%)",
        mochaBase: "hsl(240, 21%, 15%)",
        mochaSapphire: "hsl(199, 76%, 69%)",
        mochaMarron: "hsl(350, 65%, 77%)",
        mochaOverlay0: "hsl(231, 11%, 47%)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

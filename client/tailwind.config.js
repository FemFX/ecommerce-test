/** @type {import('tailwindcss').Config} */
const twColors = require("tailwindcss/colors");

const colors = {
  transparent: twColors.transparent,
  black: "#2E3239",
  white: twColors.white,
  red: twColors.red[400],
  primary: "#FF9902",
  secondary: "#161D25",
  "bg-color": "#F2F2F5",
  aqua: "#368697",
  gray: "#CDCDCD",
};

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { colors, extend: {} },
  plugins: [],
};

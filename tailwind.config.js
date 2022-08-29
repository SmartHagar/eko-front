/**
 * @format
 * @type {import('tailwindcss').Config}
 */
// colors
// FFFFFF
// F8F9FD
// 0277FA

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      my: {
        blue: "#0277FA",
        white: "#FFFFFF",
        gray: "#F8F9FD",
      },
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};

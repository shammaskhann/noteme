/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "bg-post-color-yellow",
    "bg-post-color-orange",
    "bg-post-color-lilac",
    "bg-post-color-green",
    "bg-post-color-cyan",
  ],
  theme: {
    extend: {
      colors: {
        "sidebar-clr": "#4D4D4D",
        "custom-cream-white": "#FFFDFA",
        "custom-white": "#FFFFFF",
        "custom-rose": "#FDBAA3",
        "custom-gray-800": "#343539",
        "custom-gray-900": "#000000",
        "custom-gray-300": "#8C8A97",
        "custom-red-500": "#F7685C",
        "custom-red-600": "#E65F54",
        "custom-green": "#30C58D",
        "custom-green-hover": "#269A6E",

        "post-color-yellow": "rgba(251, 235, 149, 0.4)",
        "post-color-orange": "rgba(253, 186, 163, 0.4)",
        "post-color-lilac": "rgba(182, 165, 203, 0.4)",
        "post-color-green": "rgba(151, 210, 188, 0.6)",
        "post-color-cyan": "rgba(174, 223, 232, 0.6)",
      },
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

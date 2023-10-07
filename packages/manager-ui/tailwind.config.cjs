const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "../../node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],

  safelist: [
    "bg-blue-500",
    "bg-blue-50",
    "bg-green-500",
    "bg-green-50",
    "bg-blue-gray-500",
    "bg-blue-gray-50",
  ],
  theme: {
    extend: {
      animation: {
        "reverse-spin": "reverse-spin 1s linear infinite",
      },
      keyframes: {
        "reverse-spin": {
          from: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
    colors: {
      stockup: "#181430",
      "stockup-pink": "#E91E63",
    },
    fontFamily: {
      display: ["Roboto", "Helvetica", "Arial", "sans-serif"],
    },
  },
  important: true,
  plugins: [],
});

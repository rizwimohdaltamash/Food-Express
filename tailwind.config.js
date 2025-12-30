const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'food-orange': '#FF6B35',
        'food-red': '#E63946',
        'food-yellow': '#FFB627',
        'food-green': '#06D6A0',
        'food-dark': '#2B2D42',
        'food-light': '#FFF8F0',
      },
    },
  },
  plugins: [],
});
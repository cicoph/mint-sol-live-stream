/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  resolve: [],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rampart': ["Rampart One", "cursive"],
        'sans': ['Inter var', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [],
}

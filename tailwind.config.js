/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary-blue': '#2e8dff',
        'primary-white': '#ffffff',
        'primary-gray': 'rgb(245, 245, 245)'
      },
      colors: {
        primaryBlue: '#238dff',
        lightBlack: '#282828',
        lightOrange: '#FCE7CD',
        lightGreen: '#E3F0D3',
        bodyWhite: '#f5f5f5'
      },
      darkMode: 'class',
    },
  },
  plugins: [],
})

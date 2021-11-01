const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', 'Arial', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: {
        50: '#f5f5f6',
        100: '#ebebec',
        200: '#cccdd0',
        300: '#adaeb3',
        400: '#70727a',
        500: '#333541',
        600: '#2e303b',
        700: '#262831',
        800: '#1f2027',
        900: '#191a20',
      },
      red: colors.red,
      green: colors.green,
      blue: colors.blue,
      white: colors.white,
      yellow: colors.yellow,
    },
  },
  variants: {
    extend: {
      height: ['hover', 'focus'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

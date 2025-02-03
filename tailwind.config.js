/** @type {import('tailwindcss').Config} */

import Constants from './src/constants.ts';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': `${Constants.SMALL_SCREEN}px`,
      'md': `${Constants.MEDIUM_SCREEN}px`,
      'lg': `${Constants.LARGE_SCREEN}px`,
      'xl': `${Constants.XLARGE_SCREEN}px`,
      '2xl': `${Constants.XXLARGE_SCREEN}px`,
    },
  },
  plugins: [],
}


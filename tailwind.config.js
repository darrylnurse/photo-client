/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      'md': '800px',
      'lg': '1200px',
      'xl': '1400px',
      '2xl': '1550px'
    }
  },
  plugins: [],
}


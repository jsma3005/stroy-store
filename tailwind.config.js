/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        btnBg: '#FCEC41',
        btnBgHover: '#f7f2b0',
        textLight: '#E8E9EA',
        textBlack: '#2F323A',
      },
    },
  },
  plugins: [],
}

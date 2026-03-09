/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        panda: {
          cream: '#EAE9E1',
          gold: '#D2B986',
          'gold-dark': '#b89a5e',
          green: '#a8c5a0',
          'green-dark': '#7fa878',
          pink: '#e8b4b8',
          'pink-dark': '#d4929a',
          dark: '#3a3a3a',
          mid: '#8a8a7a',
          light: '#f5f4ef',
        },
      },
      fontFamily: {
        display: ['Quicksand', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
}
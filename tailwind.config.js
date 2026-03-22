/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6C5CE7',
          secondary: '#00B894',
          accent: '#FDCB6E',
          dark: '#1E1E2E',
          darker: '#151521',
          light: '#F8F9FE',
        }
      },
      fontFamily: {
        bangla: ['Hind Siliguri', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

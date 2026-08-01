/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: '#111111',
          800: '#1a1a1a',
          700: '#262626',
        },
        construction: {
          amber: '#f59e0b', // گولڈن/اورنج کنسٹرکشن ایکسنٹ
          teal: '#0f766e',  // ڈیپ ٹیل ایکسنٹ
        }
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3AAFA9',
        secondary: '#F6F6F2',
      },
    },
  },
  plugins: [],
}


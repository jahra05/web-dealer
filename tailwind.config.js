/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ED1C24", // Honda Red
        secondary: "#2D2D2D",
      },
    },
  },
  plugins: [],
}

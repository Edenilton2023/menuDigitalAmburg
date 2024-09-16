/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  darkMode: false, // ou 'media' ou 'class'
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      gyosho: ['Gyosho', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        home: "url('/assets/bg.png')",
        home2: "url('/assets/capa.png')",
      },
    },
  },
  plugins: [],
};

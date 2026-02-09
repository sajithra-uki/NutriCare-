/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // <-- all your source files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tw-animate-css') // if you want animation plugin
  ],
};

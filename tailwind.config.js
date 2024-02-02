/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./app/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
   
  },
  plugins: [
    require('tailwind-scrollbar'),
    require("flowbite/plugin")
  ],
}

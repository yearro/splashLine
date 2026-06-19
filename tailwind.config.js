/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'inter-black': ['Inter_18pt-Black', 'sans-serif'],
        'inter-light': ['Inter_18pt-Light', 'sans-serif'],
        'inter-medium': ['Inter_18pt-Medium', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
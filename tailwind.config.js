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
      colors: {
        'primary': '#008190',
        'secondary': '#9cf0ff',
        'background': '#f8f9ff',
        'tertiary': '#dbe9fe',
        'color_text': '#0f1c2c',
      },
      fontFamily: {
        'inter-black': ['Inter_18pt-Black', 'sans-serif'],
        'inter-light': ['Inter_18pt-Light', 'sans-serif'],
        'inter-medium': ['Inter_18pt-Medium', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
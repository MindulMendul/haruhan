/** @type {import('tailwindcss').Config} */
module.exports = {
  // 👇 여기가 핵심! app 폴더와 components 폴더만 봐야 함
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
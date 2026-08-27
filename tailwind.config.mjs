import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typography],
}

export default config

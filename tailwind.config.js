module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Match styles/fonts.css (Playfair + Inter); legacy Cinzel/Questrial remain available via CSS vars
        headline: ['"Playfair Display"', 'Cinzel', 'serif'],
        body: ['Inter', 'Questrial', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Questrial', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Cinzel', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}

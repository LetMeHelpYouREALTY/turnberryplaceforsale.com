module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Match styles/fonts.css — only Playfair Display + Inter (system fonts are fallbacks)
        headline: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Inter, system-ui, sans-serif',
            h1: {
              fontFamily: '"Playfair Display", Georgia, serif',
            },
            h2: {
              fontFamily: '"Playfair Display", Georgia, serif',
            },
            h3: {
              fontFamily: '"Playfair Display", Georgia, serif',
            },
            h4: {
              fontFamily: '"Playfair Display", Georgia, serif',
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--colors-paper)',
        ink: {
          primary: 'var(--colors-ink-primary)',
          secondary: 'var(--colors-ink-secondary)',
          accent: 'var(--colors-ink-accent)',
          'accent-dark': 'var(--colors-ink-accent-dark)',
        },
        frame: {
          primary: 'var(--colors-frame-primary)',
          secondary: 'var(--colors-frame-secondary)',
        },
        surface: {
          primary: 'var(--colors-surface-primary)',
        },
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          muted: 'rgb(var(--surface-muted) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          soft: 'rgb(var(--accent-soft) / <alpha-value>)',
        },
      },
      backgroundImage: {
        'mesh-light':
          'radial-gradient(at 40% 20%, rgb(199 210 254 / 0.35) 0px, transparent 50%), radial-gradient(at 80% 0%, rgb(165 243 252 / 0.25) 0px, transparent 45%), radial-gradient(at 0% 50%, rgb(251 207 232 / 0.3) 0px, transparent 50%)',
        'mesh-dark':
          'radial-gradient(at 42% 18%, rgb(45 212 191 / 0.14) 0px, transparent 52%), radial-gradient(at 82% 8%, rgb(167 139 250 / 0.07) 0px, transparent 46%), radial-gradient(at 0% 55%, rgb(56 189 248 / 0.06) 0px, transparent 48%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgb(15 23 42 / 0.08)',
        'glass-dark': '0 8px 36px rgb(0 0 0 / 0.55)',
      },
    },
  },
  plugins: [],
}

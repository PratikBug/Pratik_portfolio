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
          'radial-gradient(at 40% 20%, rgb(79 70 229 / 0.2) 0px, transparent 50%), radial-gradient(at 80% 0%, rgb(6 182 212 / 0.12) 0px, transparent 45%), radial-gradient(at 0% 50%, rgb(236 72 153 / 0.1) 0px, transparent 50%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgb(15 23 42 / 0.08)',
        'glass-dark': '0 8px 32px rgb(0 0 0 / 0.35)',
      },
    },
  },
  plugins: [],
}

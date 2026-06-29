/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-elevated': 'var(--bg-elevated)',
        ink: 'var(--text)',
        'ink-muted': 'var(--text-muted)',
        accent: 'var(--accent)',
      },
      borderColor: {
        token: 'var(--border)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
        serif: ['var(--font-display)'],
      },
      boxShadow: {
        hover: '0 2px 8px rgba(0, 0, 0, 0.15)',
      },
      letterSpacing: {
        tightest: '-0.02em',
        meta: '0.05em',
      },
    },
  },
  plugins: [],
}

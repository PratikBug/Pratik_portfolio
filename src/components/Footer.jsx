import portfolio from '@data/portfolio.json'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink/5 bg-surface-muted/80 py-10 text-center text-sm text-ink-muted dark:border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p>
          © {year} {portfolio.name}. Crafted with React, Vite, and Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}

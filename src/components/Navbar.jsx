import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollToSection } from '@/utils/scroll'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/utils/cn'

const links = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-shadow duration-300',
        scrolled && 'shadow-glass dark:shadow-glass-dark',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6',
          'glass rounded-b-2xl border-t-0',
        )}
      >
        <a
          href="#hero"
          className="font-display text-lg font-semibold tracking-tight text-ink focus-visible:rounded-md"
          onClick={(e) => {
            e.preventDefault()
            go('hero')
          }}
        >
          Portfolio
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition hover:bg-white/50 hover:text-ink dark:hover:bg-white/5"
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-2 rounded-lg border border-ink/10 bg-white/40 px-3 py-2 text-sm font-medium text-ink transition hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-ink/10 bg-white/40 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink/10 bg-white/50 dark:border-white/10 dark:bg-white/5"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
              {open ? (
                <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="mx-4 overflow-hidden rounded-b-2xl border border-t-0 border-white/40 bg-white/80 shadow-glass backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/95 md:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {links.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-ink hover:bg-white/60 dark:hover:bg-white/10"
                  onClick={() => go(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

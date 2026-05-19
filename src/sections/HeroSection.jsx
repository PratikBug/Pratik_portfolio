import { motion } from 'framer-motion'
import portfolio from '@data/portfolio.json'
import { scrollToSection } from '@/utils/scroll'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function HeroSection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-6 pt-28 sm:px-6 sm:pb-8 sm:pt-32"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-3xl">
        <motion.p
          className="mb-3 text-sm font-medium uppercase tracking-widest text-accent"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {portfolio.location ? `${portfolio.location} · ` : ''}
          Available for opportunities
        </motion.p>
        <motion.h1
          id="hero-heading"
          className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {portfolio.name}
        </motion.h1>
        <motion.p
          className="mt-3 text-lg font-medium text-accent sm:text-xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {portfolio.role}
        </motion.p>
        <motion.p
          className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {portfolio.tagline}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            type="button"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:brightness-110 dark:shadow-teal-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={() => scrollToSection('projects')}
          >
            View projects
          </button>
          <button
            type="button"
            className="rounded-xl border border-ink/10 bg-white/50 px-6 py-3 text-sm font-semibold text-ink backdrop-blur transition hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </motion.div>
      </div>
    </section>
  )
}

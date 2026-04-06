import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import portfolio from '@data/portfolio.json'
import { scrollToSection } from '@/utils/scroll'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const HeroScene3D = lazy(() => import('@/components/HeroScene3D'))

function CanvasFallback() {
  return (
    <div
      className="flex h-full min-h-[280px] w-full items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-fuchsia-500/15"
      aria-hidden
    >
      <div className="h-24 w-24 animate-pulse rounded-full bg-indigo-400/30 blur-xl" />
    </div>
  )
}

export function HeroSection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-32"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="order-2 lg:order-1">
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
            className="mt-3 text-lg font-medium text-indigo-600 dark:text-indigo-300 sm:text-xl"
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
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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

        <motion.div
          className="order-1 h-[320px] w-full sm:h-[380px] lg:order-2 lg:h-[440px]"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass h-full w-full overflow-hidden rounded-3xl border border-white/50 dark:border-white/10">
            <Suspense fallback={<CanvasFallback />}>
              <HeroScene3D />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

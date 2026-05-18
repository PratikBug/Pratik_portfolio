import { motion } from 'framer-motion'
import portfolio from '@data/portfolio.json'
import { AnimatedSection } from '@/components/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function ExperienceSection() {
  const reduce = useReducedMotion()

  return (
    <AnimatedSection
      id="experience"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
      aria-labelledby="experience-heading"
    >
      <h2 id="experience-heading" className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Experience
      </h2>

      <ol className="relative mt-12 space-y-10 border-l border-indigo-200/80 pl-8 dark:border-indigo-500/30">
        {portfolio.experience.map((job, i) => (
          <motion.li
            key={`${job.title}-${job.company}-${i}`}
            className="relative"
            initial={reduce ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <span
              className="absolute -left-[39px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-indigo-400 bg-white dark:border-indigo-300 dark:bg-slate-900"
              aria-hidden
            >
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
            </span>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-display text-lg font-semibold text-ink">{job.title}</h3>
                {job.company && (
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-300">{job.company}</span>
                )}
                {job.period && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{job.period}</span>
                )}
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted sm:text-base">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </AnimatedSection>
  )
}

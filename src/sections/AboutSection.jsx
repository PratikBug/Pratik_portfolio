import { motion } from 'framer-motion'
import portfolio from '@data/portfolio.json'
import { AnimatedSection } from '@/components/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function SkillBar({ label, index }) {
  const reduce = useReducedMotion()
  const width = 55 + ((index * 17) % 35)

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-ink">{label}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink/5 dark:bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${width}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export function AboutSection() {
  const flatSkills = portfolio.skills.flatMap((g) => g.items)

  return (
    <AnimatedSection
      id="about"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
      aria-labelledby="about-heading"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="about-heading" className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            About
          </h2>
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-ink-muted sm:text-lg">
            {portfolio.bio}
          </p>
        </div>

        <div className="space-y-8">
          {portfolio.skills.map((group) => (
            <div key={group.category} className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-ink">{group.category}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-800 dark:border-indigo-400/20 dark:bg-indigo-500/15 dark:text-indigo-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="glass rounded-2xl p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink">Skill emphasis</h3>
            <div className="mt-6 space-y-4">
              {flatSkills.slice(0, 6).map((label, i) => (
                <SkillBar key={label} label={label} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

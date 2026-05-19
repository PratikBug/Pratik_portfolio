import { useRef } from 'react'
import { motion, useMotionTemplate, useSpring, useTransform } from 'framer-motion'
import portfolio from '@data/portfolio.json'
import { AnimatedSection } from '@/components/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function ProjectCard({ project, index }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  const x = useSpring(0, { stiffness: 260, damping: 24 })
  const y = useSpring(0, { stiffness: 260, damping: 24 })

  const rotateX = useTransform(y, [-40, 40], [8, -8])
  const rotateY = useTransform(x, [-40, 40], [-10, 10])
  const transform = useMotionTemplate`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

  function onMove(e) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = e.clientX - (r.left + r.width / 2)
    const py = e.clientY - (r.top + r.height / 2)
    x.set((px / r.width) * 40)
    y.set((py / r.height) * 40)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      ref={ref}
      className="group relative"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      style={reduce ? undefined : { transform, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="glass relative h-full overflow-hidden rounded-2xl p-6 transition-shadow duration-300 group-hover:shadow-lg dark:group-hover:shadow-glass-dark">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-accent/25 to-teal-400/20 blur-2xl transition group-hover:opacity-100"
          aria-hidden
        />
        <h3 className="font-display text-xl font-semibold text-ink">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md bg-slate-900/5 px-2 py-1 text-xs font-medium text-ink/80 dark:bg-white/10 dark:text-ink/90"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links?.live && (
            <a
              href={project.links.live}
              className="text-sm font-semibold text-accent hover:underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              Live demo
            </a>
          )}
          {project.links?.repo && (
            <a
              href={project.links.repo}
              className="text-sm font-semibold text-ink-muted hover:text-ink hover:underline"
              target="_blank"
              rel="noreferrer noopener"
            >
              Repository
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function ProjectsSection() {
  return (
    <AnimatedSection
      id="projects"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-2xl">
        <h2 id="projects-heading" className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Projects
        </h2>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </AnimatedSection>
  )
}

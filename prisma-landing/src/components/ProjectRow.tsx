import { Reveal } from './Reveal'
import type { Project } from '../data/projects'

function Figure({ index, project }: { index: string; project: Project }) {
  return (
    <div className="flex aspect-[4/3] flex-col justify-between border border-token bg-bg-elevated p-8 transition-shadow duration-300 hover:shadow-hover">
      <span className="font-display text-7xl font-black leading-none tracking-tightest text-accent md:text-8xl">
        {index}
      </span>
      <div>
        <p className="font-display text-3xl font-semibold tracking-tightest text-ink">
          {project.metric}
        </p>
        <p className="mt-1 meta text-ink-muted">{project.metricLabel}</p>
      </div>
    </div>
  )
}

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, '0')
  const textFirst = index % 2 === 0
  return (
    <Reveal
      as="div"
      delay={0.04}
      className="grid grid-cols-1 items-center gap-8 border-b border-token py-14 md:grid-cols-12 md:gap-12 md:py-20"
    >
      <div className={textFirst ? 'md:col-span-7 md:order-1' : 'md:col-span-7 md:order-2 md:col-start-6'}>
        <p className="meta text-ink-muted">{project.meta}</p>
        <h3 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tightest text-ink md:text-5xl">
          {project.name}
        </h3>
        <p className="mt-5 max-w-[560px] font-body text-base leading-relaxed text-ink-muted">
          {project.description}
        </p>
        <p className="mt-6 font-mono text-[13px] leading-relaxed text-ink">{project.stack}</p>
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block meta text-ink-muted link-underline"
          >
            {project.link.includes('github.com') ? 'View repository ↗' : 'View live ↗'}
          </a>
        ) : null}
      </div>
      <div className={textFirst ? 'md:col-span-5 md:order-2' : 'md:col-span-5 md:order-1'}>
        <Figure index={num} project={project} />
      </div>
    </Reveal>
  )
}

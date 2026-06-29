import { Reveal } from '../components/Reveal'
import { ProjectRow } from '../components/ProjectRow'
import { FEATURED_PROJECTS } from '../data/projects'

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-bg px-6 py-24 text-ink md:px-12 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-end justify-between gap-6">
          <Reveal className="meta text-ink-muted">03 — Selected Projects</Reveal>
          <Reveal delay={0.05}>
            <a href="#/projects" className="meta text-ink-muted link-underline whitespace-nowrap">
              View all ↗
            </a>
          </Reveal>
        </div>

        <div className="mt-8 border-t border-token">
          {FEATURED_PROJECTS.map((project, i) => (
            <ProjectRow key={project.name} project={project} index={i} />
          ))}
        </div>

        <Reveal className="mt-12" delay={0.05}>
          <a href="#/projects" className="btn-outline">
            View all projects
          </a>
        </Reveal>
      </div>
    </section>
  )
}

import { useEffect } from 'react'
import { Reveal } from '../components/Reveal'
import { ProjectRow } from '../components/ProjectRow'
import { PROJECTS } from '../data/projects'

export function AllProjects() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="pointer-events-none fixed left-6 top-0 z-0 h-full w-px bg-accent/70 md:left-10" aria-hidden />

      <nav className="flex items-center justify-between px-6 pt-7 md:px-12 md:pt-9" aria-label="Primary">
        <a href="#top" className="meta text-ink link-underline">
          Pratik Warathe
        </a>
        <a href="#top" className="meta text-ink-muted link-underline">
          ← Back home
        </a>
      </nav>

      <header className="px-6 pb-12 pt-[14vh] md:px-12 md:pb-16">
        <Reveal className="meta text-accent">Archive</Reveal>
        <Reveal delay={0.05}>
          <h1
            className="mt-6 font-display font-black leading-[0.9] tracking-tightest text-ink"
            style={{ fontSize: 'clamp(40px, 7vw, 84px)' }}
          >
            All Projects
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[600px] font-body text-base leading-relaxed text-ink-muted md:text-lg">
            A complete record of work — production fintech features at Paytm Money, AI agent
            tooling, and earlier full-stack and mobile builds.
          </p>
        </Reveal>
      </header>

      <main className="px-6 pb-28 md:px-12 md:pb-36">
        <div className="mx-auto max-w-[1200px] border-t border-token">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.name} project={project} index={i} />
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-[1200px]">
          <a href="#top" className="btn-outline">
            Back home
          </a>
        </div>
      </main>
    </div>
  )
}

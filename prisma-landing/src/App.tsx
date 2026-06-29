import { useEffect, useState } from 'react'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { AllProjects } from './pages/AllProjects'
import { Reveal } from './components/Reveal'

function Home() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />

      <footer id="contact" className="border-t border-token bg-bg px-6 py-24 text-ink md:px-12 md:py-32">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="meta text-ink-muted">04 — Contact</Reveal>
          <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-7" delay={0.05}>
              <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-tightest text-ink sm:text-5xl md:text-6xl">
                Let&rsquo;s build something
                <span className="text-accent"> that ships.</span>
              </h2>
              <a
                href="mailto:pratikaieseci123@gmail.com"
                className="mt-8 inline-block font-display text-2xl font-medium tracking-tightest text-ink link-underline md:text-3xl"
              >
                pratikaieseci123@gmail.com
              </a>
            </Reveal>

            <Reveal className="md:col-span-5 md:col-start-9" delay={0.1}>
              <dl className="divide-y divide-token border-token">
                <div className="flex items-center justify-between py-4">
                  <dt className="meta text-ink-muted">Phone</dt>
                  <dd className="font-mono text-[13px] text-ink">+91 72752 81169</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="meta text-ink-muted">LinkedIn</dt>
                  <dd>
                    <a
                      href="https://linkedin.com/in/pratik-warathe"
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[13px] text-ink link-underline"
                    >
                      /in/pratik-warathe
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="meta text-ink-muted">Education</dt>
                  <dd className="font-mono text-right text-[13px] text-ink">
                    B.Tech CSE · Amity Mumbai
                    <span className="block text-ink-muted">CGPA 8.8 · 2021–2025</span>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="mt-20 flex flex-col gap-2 border-t border-token pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="meta text-ink-muted">Pratik Warathe — Frontend Engineer</p>
            <p className="meta text-ink-muted">© 2026 · Built with React</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

function App() {
  const hash = useHashRoute()
  const isProjectsRoute = hash.startsWith('#/projects')
  return isProjectsRoute ? <AllProjects /> : <Home />
}

export default App

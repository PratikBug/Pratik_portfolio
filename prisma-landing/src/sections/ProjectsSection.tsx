import { Reveal } from '../components/Reveal'

type Project = {
  index: string
  name: string
  meta: string
  description: string
  stack: string
  metric: string
  metricLabel: string
}

const PROJECTS: Project[] = [
  {
    index: '01',
    name: 'Scan QR Payment',
    meta: 'Paytm Money · Frontend · 2025',
    description:
      'Users could not complete UPI transactions across apps from the Paytm Money web flow. I built a Scan QR payment experience that lets users pay from any UPI app, closing a major usability gap and unlocking smooth payments for millions of users.',
    stack: 'React.js · Axios · UPI · REST APIs',
    metric: 'Millions',
    metricLabel: 'users enabled',
  },
  {
    index: '02',
    name: 'MTF Calculator',
    meta: 'Paytm Money · Frontend · 2025',
    description:
      'Traders needed to model leverage-based returns before committing capital. I designed and built a fully responsive Margin Trading Facility calculator with React Hooks and JSON-driven APIs that computes leverage returns, profit/loss, and stock accountability in real time — plus its landing page with no-auth dynamic rendering.',
    stack: 'React Hooks · JSON APIs · Axios · Responsive',
    metric: 'Real-time',
    metricLabel: 'leverage & P&L',
  },
  {
    index: '03',
    name: 'MEDApp',
    meta: 'NIRMAN Hackathon · Mobile · 2024',
    description:
      'People struggle to identify medicines and their correct dosage. I built an app that scans any medicine image and returns full details — composition, dosage requirements, and real-time reminders — so users can take the right medication safely.',
    stack: 'Kotlin · Android Studio · Python',
    metric: 'Scan → Info',
    metricLabel: 'image recognition',
  },
  {
    index: '04',
    name: 'MyAnime',
    meta: 'Personal · Full-stack · 2023',
    description:
      'A full-stack anime catalogue with authenticated user accounts. I built the frontend, a Node.js backend with database operations, and secure JWT-based authentication and authorization.',
    stack: 'Next.js · Node.js · MongoDB · JWT',
    metric: 'Full-stack',
    metricLabel: 'auth + data',
  },
]

function Figure({ project }: { project: Project }) {
  return (
    <div className="flex aspect-[4/3] flex-col justify-between border border-token bg-bg-elevated p-8 transition-shadow duration-300 hover:shadow-hover">
      <span className="font-display text-7xl font-black leading-none tracking-tightest text-accent md:text-8xl">
        {project.index}
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

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-bg px-6 py-24 text-ink md:px-12 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="meta text-ink-muted">03 — Selected Projects</Reveal>

        <div className="mt-8 border-t border-token">
          {PROJECTS.map((project, i) => {
            const textFirst = i % 2 === 0
            return (
              <Reveal
                as="div"
                key={project.name}
                delay={0.04}
                className="grid grid-cols-1 items-center gap-8 border-b border-token py-14 md:grid-cols-12 md:gap-12 md:py-20"
              >
                <div
                  className={
                    textFirst
                      ? 'md:col-span-7 md:order-1'
                      : 'md:col-span-7 md:order-2 md:col-start-6'
                  }
                >
                  <p className="meta text-ink-muted">{project.meta}</p>
                  <h3 className="mt-3 font-display text-4xl font-bold leading-[0.95] tracking-tightest text-ink md:text-5xl">
                    {project.name}
                  </h3>
                  <p className="mt-5 max-w-[560px] font-body text-base leading-relaxed text-ink-muted">
                    {project.description}
                  </p>
                  <p className="mt-6 font-mono text-[13px] leading-relaxed text-ink">
                    {project.stack}
                  </p>
                </div>
                <div className={textFirst ? 'md:col-span-5 md:order-2' : 'md:col-span-5 md:order-1'}>
                  <Figure project={project} />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

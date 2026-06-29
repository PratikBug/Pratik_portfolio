import { Reveal } from '../components/Reveal'

type Role = {
  company: string
  title: string
  period: string
  points: string[]
}

const ROLES: Role[] = [
  {
    company: 'Paytm Money',
    title: 'Software Engineer',
    period: 'Apr 2025 — Present',
    points: [
      'Built and launched "Scan QR Payment" for the Paytm Money website, enabling UPI transactions from any app and solving a major usability gap for millions of users.',
      'Designed and shipped the MTF (Margin Trading Facility) Calculator — a fully responsive React Hooks tool computing leverage returns, P&L, and stock accountability from JSON APIs.',
      'Delivered equity-trading features: F&O tables, NSE Movers polling, company/ETF/buzzing-stocks pages with dynamic MDE gateway routing.',
      'Led CI/CD migration from Jenkins to Bitbucket Pipelines across 6+ repos and remediated reflected-XSS findings flagged by Checkmarx.',
    ],
  },
  {
    company: 'BHEL',
    title: 'Data Science Intern',
    period: 'Jun 2024 — Jul 2024',
    points: [
      'Built a system surfacing production work running across BHEL.',
      'Created a VT portal helping new trainees understand their ongoing projects.',
    ],
  },
  {
    company: 'IEEE Bombay Section',
    title: 'Full Stack Developer Intern',
    period: 'Jul 2023 — Aug 2023',
    points: [
      'Developed RESTful API web services with the Java Spring framework.',
      'Worked with MongoDB and HBase; used Git with a Gitflow workflow.',
    ],
  },
  {
    company: 'Star Engineering Co., NTPC',
    title: 'Data Analyst Intern',
    period: 'Jul 2023 — Aug 2023',
    points: [
      'Wrote SQL queries powering 20+ weekly reports.',
      'Automated data extraction in Python, improving processing time by 25%.',
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-bg px-6 py-24 text-ink md:px-12 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="meta text-ink-muted">02 — Experience</Reveal>

        <div className="mt-12 border-t border-token">
          {ROLES.map((role, i) => (
            <Reveal
              as="div"
              key={role.company}
              delay={i * 0.05}
              className="grid grid-cols-1 gap-4 border-b border-token py-10 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl font-semibold tracking-tightest text-ink md:text-3xl">
                  {role.company}
                </h3>
                <p className="mt-2 meta text-accent">{role.title}</p>
                <p className="mt-1 meta text-ink-muted">{role.period}</p>
              </div>
              <ul className="space-y-3 md:col-span-8 md:pl-8">
                {role.points.map((point) => (
                  <li key={point} className="font-body text-base leading-relaxed text-ink-muted">
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

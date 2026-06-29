import { Reveal } from '../components/Reveal'

const SKILLS: { group: string; items: string }[] = [
  { group: 'Languages', items: 'HTML · CSS · JavaScript · TypeScript' },
  { group: 'Frameworks', items: 'React.js · Next.js · Express.js · Nx' },
  { group: 'Mobile / Hybrid', items: 'JSBridge · WebView H5 · React Hooks · Lottie' },
  { group: 'Tooling', items: 'Webpack 5 · Jest · Git · Bitbucket Pipelines · Docker' },
  { group: 'Databases', items: 'MySQL · MongoDB · HBase' },
  { group: 'AI for Dev', items: 'Cursor AI · Claude · ChatGPT' },
]

export function AboutSection() {
  return (
    <section id="about" className="bg-bg px-6 py-24 text-ink md:px-12 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="meta text-ink-muted">01 — About</Reveal>

        {/* Asymmetric two-column intro */}
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-7 lg:col-span-7" delay={0.05}>
            <p className="font-display text-3xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-4xl md:text-[2.75rem]">
              Frontend engineer focused on fintech web and hybrid-mobile experiences — equity
              trading, market data, and payments.
            </p>
            <p className="mt-8 max-w-[560px] font-body text-base leading-relaxed text-ink-muted">
              At Paytm Money I work across large React codebases delivering order pads, market-data
              tables, F&amp;O views, and native-webview integrations. I led a CI/CD migration from
              Jenkins to Bitbucket Pipelines across 6+ production repos, remediated security findings,
              and added unit-test coverage — roughly 430+ commits across 12 repositories.
            </p>
            <div className="mt-8 h-px w-24 bg-accent" aria-hidden />
          </Reveal>

          {/* Skills: flat, 1px border, sharp 4px corners, mono */}
          <div className="md:col-span-5 lg:col-start-9 lg:col-span-4">
            <Reveal className="meta text-ink-muted" delay={0.1}>
              Capabilities
            </Reveal>
            <dl className="mt-6 divide-y divide-token border-token">
              {SKILLS.map((skill, i) => (
                <Reveal as="div" key={skill.group} delay={0.12 + i * 0.04} className="flex flex-col gap-1 py-4">
                  <dt className="meta text-accent">{skill.group}</dt>
                  <dd className="font-mono text-[13px] leading-relaxed text-ink">{skill.items}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

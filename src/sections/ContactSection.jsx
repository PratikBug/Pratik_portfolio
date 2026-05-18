import portfolio from '@data/portfolio.json'
import { AnimatedSection } from '@/components/AnimatedSection'

const socialConfig = [
  { key: 'github', label: 'GitHub', icon: '↗' },
  { key: 'linkedin', label: 'LinkedIn', icon: '↗' },
  { key: 'twitter', label: 'X / Twitter', icon: '↗' },
]

export function ContactSection() {
  const socials = socialConfig
    .map((s) => ({ ...s, href: portfolio.contact[s.key] }))
    .filter((s) => s.href)

  return (
    <AnimatedSection
      id="contact"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-xl">
        <h2 id="contact-heading" className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Contact
        </h2>
        <p className="mt-3 text-ink-muted">Reach out by email or social links below.</p>
        {portfolio.contact.email && (
          <p className="mt-6 text-sm text-ink-muted">
            Email{' '}
            <a className="font-semibold text-accent hover:underline" href={`mailto:${portfolio.contact.email}`}>
              {portfolio.contact.email}
            </a>
          </p>
        )}
        <ul className="mt-8 flex flex-wrap gap-3" aria-label="Social links">
          {socials.map((s) => (
            <li key={s.key}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 rounded-xl border border-ink/10 bg-white/50 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                {s.label} <span aria-hidden>{s.icon}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import portfolio from '@data/portfolio.json'
import { AnimatedSection } from '@/components/AnimatedSection'
import { validateContactForm } from '@/utils/validateContact'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const socialConfig = [
  { key: 'github', label: 'GitHub', icon: '↗' },
  { key: 'linkedin', label: 'LinkedIn', icon: '↗' },
  { key: 'twitter', label: 'X / Twitter', icon: '↗' },
]

export function ContactSection() {
  const reduce = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    const { valid, errors: next } = validateContactForm({ name, email, message })
    setErrors(next)
    if (!valid) return
    setSent(true)
  }

  const socials = socialConfig
    .map((s) => ({ ...s, href: portfolio.contact[s.key] }))
    .filter((s) => s.href)

  return (
    <AnimatedSection
      id="contact"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="contact-heading" className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Contact
          </h2>
          <p className="mt-3 text-ink-muted">
            This form validates on the client only — wire it to your API or form service when you deploy.
          </p>
          {portfolio.contact.email && (
            <p className="mt-6 text-sm text-ink-muted">
              Prefer email?{' '}
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

        <motion.form
          className="glass rounded-2xl p-6 sm:p-8"
          onSubmit={onSubmit}
          noValidate
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-ink">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-ink/10 bg-white/70 px-4 py-3 text-ink shadow-inner outline-none transition focus:border-indigo-400 dark:border-white/10 dark:bg-slate-900/40"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'err-name' : undefined}
              />
              {errors.name && (
                <p id="err-name" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-ink/10 bg-white/70 px-4 py-3 text-ink shadow-inner outline-none transition focus:border-indigo-400 dark:border-white/10 dark:bg-slate-900/40"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'err-email' : undefined}
              />
              {errors.email && (
                <p id="err-email" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-ink">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full resize-y rounded-xl border border-ink/10 bg-white/70 px-4 py-3 text-ink shadow-inner outline-none transition focus:border-indigo-400 dark:border-white/10 dark:bg-slate-900/40"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'err-msg' : undefined}
              />
              {errors.message && (
                <p id="err-msg" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110"
            >
              Send message
            </button>
            {sent && (
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400" role="status">
                Thanks — your message passes validation. Connect it to a backend to deliver mail.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </AnimatedSection>
  )
}

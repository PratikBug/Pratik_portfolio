import { motion } from 'framer-motion'

const NAV = ['About', 'Experience', 'Projects', 'Contact']

export function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen bg-bg text-ink">
      {/* Off-grid vertical accent rule near the left edge */}
      <div
        className="pointer-events-none absolute left-6 top-0 h-full w-px bg-accent/70 md:left-10"
        aria-hidden
      />

      {/* Nav: minimal, mono, no logo icon */}
      <nav
        className="flex items-center justify-between px-6 pt-7 md:px-12 md:pt-9"
        aria-label="Primary"
      >
        <a href="#top" className="meta text-ink link-underline">
          Pratik Warathe
        </a>
        <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
          {NAV.map((label) => (
            <a key={label} href={`#${label.toLowerCase()}`} className="meta text-ink-muted link-underline">
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero body: left-aligned, asymmetric padding (more room on the right) */}
      <div className="px-6 pb-24 pt-[16vh] md:px-12 md:pb-32 md:pt-[18vh] lg:pr-40">
        <div className="max-w-[760px]">
          <motion.p
            className="meta text-accent"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Frontend Engineer — Paytm Money, Mumbai
          </motion.p>

          <motion.h1
            className="mt-6 font-display font-black leading-[0.9] tracking-tightest text-ink"
            style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' }}
          >
            I build fintech interfaces millions
            <span className="text-accent"> rely on.</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-[620px] font-body text-base leading-relaxed text-ink-muted md:text-lg"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
          >
            Frontend developer with 1.5+ years building scalable, interactive web and hybrid-mobile
            experiences for equity trading and payments at Paytm Money. I ship production features
            in large React codebases, fix the bugs that matter, and care about accessibility and
            performance.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
          >
            <a href="#projects" className="btn-outline">
              View work
            </a>
            <a href="mailto:pratikaieseci123@gmail.com" className="meta text-ink-muted link-underline">
              Get in touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

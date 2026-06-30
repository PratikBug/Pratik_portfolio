import { motion } from 'framer-motion'
import { TypewriterWord } from '../components/TypewriterWord'

const NAV = ['About', 'Experience', 'Projects', 'Contact']

export function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen bg-bg text-ink">
      <nav
        className="flex items-center justify-between px-6 pt-8 md:px-12 md:pt-10"
        aria-label="Primary"
      >
        <a href="#top" className="meta text-ink link-underline">
          Pratik Warathe
        </a>
        <div className="flex flex-wrap items-center justify-end gap-x-7 gap-y-2 md:gap-x-9">
          {NAV.map((label) => (
            <a key={label} href={`#${label.toLowerCase()}`} className="meta text-ink link-underline">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="px-6 pb-24 pt-[12vh] md:px-12 md:pb-32 md:pt-[14vh] lg:px-16">
        <motion.p
          className="meta text-accent"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Frontend Engineer — Paytm Money, Mumbai
        </motion.p>

        <motion.h1
          className="hero-headline mt-8 font-display font-black leading-[0.88] tracking-tightest text-ink md:mt-10"
          style={{ fontSize: 'clamp(40px, 6.2vw, 80px)' }}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' }}
        >
          <span className="block whitespace-nowrap">
            I build <TypewriterWord />
          </span>
          <span className="block">interfaces millions</span>
          <span className="block text-accent">rely on.</span>
        </motion.h1>

        <motion.p
          className="mt-10 max-w-[640px] font-body text-[15px] leading-[1.65] text-ink-muted md:mt-12 md:text-base"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
        >
          Frontend developer with 1.5+ years building scalable, interactive web and hybrid-mobile
          experiences for equity trading and payments at Paytm Money. I ship production features in
          large React codebases, fix the bugs that matter, and care about accessibility and
          performance.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-12"
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
    </section>
  )
}

import { motion } from 'framer-motion'
import {
  SiCss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiVite,
} from 'react-icons/si'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Core stack — matches typical frontend work (README skills). */
const STACK = [
  { Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
  { Icon: SiReact, name: 'React', color: '#61DAFB' },
  { Icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
  { Icon: SiCss, name: 'CSS3', color: '#1572B6' },
  { Icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
  { Icon: SiVite, name: 'Vite', color: '#646CFF' },
  { Icon: SiGit, name: 'Git', color: '#F05032' },
  { Icon: SiGithub, name: 'GitHub', color: 'currentColor' },
]

function TechLogoTile({ Icon, name, color, reduce, index }) {
  return (
    <motion.li
      className="list-none"
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay: reduce ? 0 : index * 0.05,
        type: 'spring',
        stiffness: 380,
        damping: 24,
      }}
      whileHover={
        reduce
          ? {}
          : {
              y: -10,
              scale: 1.09,
              rotate: -3,
              boxShadow: '0 20px 40px -12px rgb(99 102 241 / 0.35)',
              transition: {
                y: { type: 'spring', stiffness: 450, damping: 18 },
                scale: { type: 'spring', stiffness: 450, damping: 18 },
                rotate: { type: 'spring', stiffness: 400, damping: 20 },
              },
            }
      }
      whileTap={reduce ? {} : { scale: 0.96, rotate: 0 }}
    >
      <div
        className="glass flex h-[4.25rem] w-[4.25rem] cursor-default items-center justify-center rounded-2xl border border-white/50 shadow-glass transition-shadow duration-300 dark:border-white/10 dark:shadow-glass-dark sm:h-20 sm:w-20"
        title={name}
      >
        <Icon
          className="h-9 w-9 transition-transform duration-300 sm:h-10 sm:w-10"
          style={{ color: name === 'GitHub' ? undefined : color }}
          aria-hidden
        />
        <span className="sr-only">{name}</span>
      </div>
    </motion.li>
  )
}

export function TechLogosSection() {
  const reduce = useReducedMotion()

  return (
    <section
      className="relative px-4 pb-6 pt-2 sm:px-6 sm:pb-10"
      aria-labelledby="tech-stack-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="tech-stack-heading"
          className="mb-4 text-center font-display text-lg font-semibold tracking-tight text-ink sm:mb-5 sm:text-xl"
        >
          What I build with
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {STACK.map((item, index) => (
            <TechLogoTile key={item.name} {...item} reduce={reduce} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}

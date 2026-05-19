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
import { useMemo } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Core stack — `glow` drives hover aura (graphic accent). */
const STACK = [
  { Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E', glow: 'rgba(247, 223, 30, 0.45)' },
  { Icon: SiReact, name: 'React', color: '#61DAFB', glow: 'rgba(97, 218, 251, 0.45)' },
  { Icon: SiHtml5, name: 'HTML5', color: '#E34F26', glow: 'rgba(227, 79, 38, 0.45)' },
  { Icon: SiCss, name: 'CSS3', color: '#1572B6', glow: 'rgba(21, 114, 182, 0.45)' },
  { Icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4', glow: 'rgba(6, 182, 212, 0.45)' },
  { Icon: SiVite, name: 'Vite', color: '#646CFF', glow: 'rgba(100, 108, 255, 0.45)' },
  { Icon: SiGit, name: 'Git', color: '#F05032', glow: 'rgba(240, 80, 50, 0.45)' },
  { Icon: SiGithub, name: 'GitHub', color: null, glow: 'rgba(129, 140, 248, 0.5)' },
]

function TechLogoTile({ Icon, name, color, glow, reduce, index, tileVariants }) {
  const floatTransition = reduce
    ? undefined
    : {
        duration: 2.8 + index * 0.18,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.14,
      }

  return (
    <motion.li
      className="list-none [perspective:900px]"
      variants={tileVariants}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="group relative flex h-[4.25rem] w-[4.25rem] cursor-default items-center justify-center overflow-hidden rounded-2xl border border-white/35 bg-white/55 shadow-glass backdrop-blur-xl dark:border-white/12 dark:bg-slate-900/50 dark:shadow-glass-dark sm:h-20 sm:w-20"
        title={name}
        whileHover={
          reduce
            ? {}
            : {
                y: -14,
                scale: 1.06,
                rotateX: 6,
                rotateY: -10,
                rotateZ: 1,
                borderColor: 'rgba(255, 255, 255, 0.45)',
                transition: { type: 'spring', stiffness: 380, damping: 22 },
              }
        }
        whileTap={reduce ? {} : { scale: 0.93, rotateX: 0, rotateY: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            background: `radial-gradient(circle at 35% 25%, ${glow}, transparent 65%)`,
          }}
          whileHover={reduce ? {} : { opacity: 1, transition: { duration: 0.35 } }}
          aria-hidden
        />

        <motion.div
          className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-white/25 to-transparent opacity-0 dark:from-white/10"
          initial={false}
          whileHover={
            reduce ? {} : { left: '100%', opacity: 0.55, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
          }
          aria-hidden
        />

        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0"
          whileHover={
            reduce
              ? {}
              : {
                  opacity: 1,
                  boxShadow: `0 22px 48px -14px ${glow}, inset 0 1px 0 0 rgba(255,255,255,0.12)`,
                  transition: { duration: 0.28 },
                }
          }
          aria-hidden
        />

        <motion.span
          className="relative z-[1] flex will-change-transform"
          animate={reduce ? false : { y: [0, -5, 0] }}
          transition={floatTransition}
        >
          <motion.span
            className="flex items-center justify-center"
            whileHover={reduce ? {} : { scale: 1.08, rotate: [0, -4, 4, 0], transition: { duration: 0.45 } }}
          >
            <Icon
              className={`h-9 w-9 drop-shadow-sm transition-[filter] duration-300 sm:h-10 sm:w-10 ${color ? '' : 'text-ink dark:text-ink/90'}`}
              style={color ? { color } : undefined}
              aria-hidden
            />
          </motion.span>
        </motion.span>

        <span className="sr-only">{name}</span>
      </motion.div>
    </motion.li>
  )
}

export function TechLogosSection() {
  const reduce = useReducedMotion()

  const { listVariants, tileVariants } = useMemo(() => {
    if (reduce) {
      return {
        listVariants: {
          hidden: { opacity: 1 },
          show: { opacity: 1, transition: { staggerChildren: 0 } },
        },
        tileVariants: {
          hidden: { opacity: 1 },
          show: { opacity: 1 },
        },
      }
    }
    return {
      listVariants: {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.07, delayChildren: 0.06 },
        },
      },
      tileVariants: {
        hidden: {
          opacity: 0,
          y: 36,
          scale: 0.82,
          rotate: -8,
          filter: 'blur(6px)',
        },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          filter: 'blur(0px)',
          transition: { type: 'spring', stiffness: 260, damping: 22, mass: 0.85 },
        },
      },
    }
  }, [reduce])

  return (
    <section
      className="relative px-4 pb-6 pt-2 sm:px-6 sm:pb-10"
      aria-labelledby="tech-stack-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="tech-stack-heading"
          className="mb-4 text-center font-display text-lg font-semibold tracking-tight text-ink sm:mb-5 sm:text-xl"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          What I build with
        </motion.h2>

        <motion.ul
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-5"
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2, margin: '-50px' }}
        >
          {STACK.map((item, index) => (
            <TechLogoTile key={item.name} {...item} reduce={reduce} index={index} tileVariants={tileVariants} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

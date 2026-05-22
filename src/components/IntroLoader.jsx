import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import portfolio from '@data/portfolio.json'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function initialsFromName(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/** Monogram hold — long enough for grain + typography to breathe. */
const PEAK_HOLD_MS = 2480
/** Exit choreography (grain + vignette dissolve). */
const EXIT_PHASE_MS = 920

/** Spring used for typography landing. */
const letterSpring = {
  type: 'spring',
  stiffness: 106,
  damping: 14.8,
  mass: 0.74,
}

const letterReveal = {
  hide: {
    opacity: 0,
    y: '45%',
    rotateX: -40,
    filter: 'blur(18px)',
  },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: letterSpring,
  },
  exit: {
    opacity: 0,
    y: '-74%',
    rotateX: 20,
    scale: 1.07,
    filter: 'blur(26px)',
    transition: {
      duration: 0.64,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/** SVG film grain overlay (editorial texture). */
function FilmGrain({ filterId, exiting }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[18] opacity-[1]"
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <svg className="h-full w-full" aria-hidden>
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              stitchTiles="stitch"
              result="grain"
              seed="8"
            />
            <feColorMatrix
              type="matrix"
              in="grain"
              values="1 0 0 0 0 
                      0 1 0 0 0 
                      0 0 1 0 0 
                      0 0 0 0.7 0"
              result="soft"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} className="mix-blend-overlay opacity-[0.09] dark:mix-blend-soft-light dark:opacity-[0.14]" />
      </svg>
    </motion.div>
  )
}

function IntroVignette({ exiting }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[12] bg-[radial-gradient(ellipse_68%_58%_at_50%_42%,transparent_32%,rgb(var(--surface-muted)/0)_38%,rgb(var(--surface-muted)/0.94)_92%,rgb(var(--surface-muted))_100%)] dark:bg-[radial-gradient(ellipse_66%_56%_at_50%_42%,transparent_28%,rgb(var(--surface-muted)/0)_36%,rgb(0_0_0/0.55)_100%)]"
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.55 }}
      aria-hidden
    />
  )
}

function EditorialMark({ exiting }) {
  const line = '— Opening sequence'.toUpperCase()
  return (
    <motion.div
      className="pointer-events-none absolute left-8 top-[max(1.75rem,env(safe-area-inset-top))] z-[35] hidden text-left sm:block sm:left-11"
      initial={{ opacity: 0, x: -10 }}
      animate={
        exiting
          ? { opacity: 0, x: -8, transition: { duration: 0.35 } }
          : { opacity: 1, x: 0, transition: { delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
      }
      aria-hidden
    >
      <span className="block text-[9px] font-bold uppercase tracking-[0.62em] text-ink/40 dark:text-ink-muted/55">
        Vol.01
      </span>
      <span className="mt-3 block max-w-[11rem] text-[10px] font-semibold uppercase leading-relaxed tracking-[0.28em] text-ink-muted/55">
        {line}
      </span>
      <motion.span
        className="mt-4 block h-px max-w-[3.25rem] origin-left rounded-full bg-gradient-to-r from-accent/80 to-accent/10"
        initial={{ scaleX: 0 }}
        animate={exiting ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{
          duration: 0.85,
          delay: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  )
}

/** Linear progress hairline synced to approximate splash duration. */
function SequenceRail({ exiting, holdMs }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[40] h-[max(env(safe-area-inset-bottom),0px)]">
      <div className="relative h-px w-full bg-ink/[0.06] dark:bg-white/[0.08]">
        <motion.div
          className="absolute bottom-0 left-0 top-0 w-full origin-left bg-gradient-to-r from-accent via-accent/70 to-accent/25 shadow-[0_0_28px_rgb(var(--accent)/0.45)]"
          initial={{ scaleX: 0 }}
          animate={exiting ? { scaleX: 1.02, opacity: 0 } : { scaleX: 1, opacity: 1 }}
          transition={
            exiting
              ? { duration: 0.35, ease: [0.4, 0, 1, 1] }
              : { duration: holdMs / 1000, ease: 'linear' }
          }
        />
      </div>
    </div>
  )
}

function PulseRings({ exiting }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[44%] z-[9] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute aspect-square rounded-full border border-accent/25 dark:border-accent/20"
          style={{
            width: 'clamp(200px, 46vmin, 400px)',
            marginTop: '6%',
          }}
          initial={{ scale: 0.88 + i * 0.06, opacity: 0 }}
          animate={
            exiting
              ? { scale: 1.42, opacity: 0, transition: { duration: 0.62 } }
              : {
                  scale: [1 + i * 0.06, 1.22 + i * 0.14, 1 + i * 0.06],
                  opacity: [0.06, 0.18, 0.06],
                  transition: {
                    duration: 5.2 + i * 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }
          }
        />
      ))}
    </div>
  )
}

function CornerFrame({ exiting }) {
  const arm = 'h-[1.875rem] w-[1.875rem] sm:h-8 sm:w-8'
  const corner = [
    '-left-px -top-px border-l-[1.5px] border-t-[1.5px]',
    '-right-px -top-px border-r-[1.5px] border-t-[1.5px]',
    '-bottom-px -left-px border-b-[1.5px] border-l-[1.5px]',
    '-bottom-px -right-px border-b-[1.5px] border-r-[1.5px]',
  ]
  const borderColor = 'border-accent/55 dark:border-accent/42'

  return (
    <>
      {corner.map((cls, i) => (
        <motion.div
          key={cls}
          className={`pointer-events-none absolute ${arm} rounded-tl-none ${cls} ${borderColor}`}
          aria-hidden
          initial={false}
          animate={
            exiting
              ? { opacity: 0, scale: 0.76, rotate: i % 2 ? 3 : -3, filter: 'blur(6px)' }
              : { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }
          }
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: exiting ? i * 0.03 : 0.72 + i * 0.08,
          }}
        />
      ))}
    </>
  )
}

function AmbientOrbs({ exiting }) {
  return (
    <>
      <motion.div
        className="absolute left-[8%] top-[28%] h-[min(400px,64vw)] w-[min(400px,64vw)] rounded-full bg-accent/26 blur-[100px]"
        initial={{ opacity: 0, scale: 0.58, x: '-12%' }}
        animate={
          exiting
            ? {
                opacity: 0,
                scale: 1.45,
                x: '2%',
                transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
              }
            : {
                opacity: [0.14, 0.49, 0.22],
                scale: [1, 1.16, 1],
                x: ['-10%', '-4%', '-10%'],
                y: ['0%', '3%', '0%'],
                transition: { duration: 7.2, repeat: Infinity, ease: 'easeInOut' },
              }
        }
      />
      <motion.div
        className="absolute bottom-[20%] right-[4%] h-[min(320px,50vw)] w-[min(320px,50vw)] rounded-full bg-indigo-400/22 blur-[86px] dark:bg-violet-500/16"
        initial={{ opacity: 0, scale: 0.68 }}
        animate={
          exiting
            ? {
                opacity: 0,
                scale: 1.55,
                transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              }
            : {
                opacity: [0.06, 0.22, 0.09],
                scale: [1, 1.24, 1],
                x: ['4%', '0%', '4%'],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.45,
                },
              }
        }
      />
      <motion.div
        className="absolute bottom-[12%] left-[38%] h-[min(180px,32vw)] w-[min(180px,32vw)] rounded-full bg-accent/14 blur-[64px]"
        initial={{ opacity: 0 }}
        animate={
          exiting
            ? { opacity: 0, scale: 1.35, transition: { duration: 0.72 } }
            : {
                opacity: [0.06, 0.16, 0.06],
                y: ['0%', '-6%', '0%'],
                transition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.85,
                },
              }
        }
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[41%] h-[118%] max-h-[740px] w-[118%] max-w-[740px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-gradient-to-t from-accent/[0.13] via-accent/[0.04] to-transparent blur-3xl dark:from-accent/[0.1]"
        initial={{ opacity: 0 }}
        animate={
          exiting
            ? { opacity: 0, transition: { duration: 0.48 } }
            : { opacity: 1, transition: { delay: 0.08, duration: 1.12 } }
        }
      />
    </>
  )
}

function OrbitGlyph({ exiting }) {
  const size = 318
  const r = size * 0.33
  const c = size / 2
  const satR = r + 30
  const dots = [0, 115, 245].map((deg) => {
    const rad = ((deg - 90) * Math.PI) / 180
    return { ox: Math.cos(rad) * satR, oy: Math.sin(rad) * satR }
  })

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 text-accent/36 dark:text-accent/30"
      initial={{ rotate: -16, opacity: 0, scale: 0.92 }}
      animate={
        exiting
          ? {
              rotate: 58,
              opacity: 0,
              scale: 0.82,
              transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
            }
          : {
              rotate: [2.5, 0, -1.8, 0],
              opacity: 1,
              scale: 1,
              transition: {
                rotate: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
                opacity: { delay: 0.12, duration: 1.05 },
                scale: { delay: 0.12, duration: 1.05, ease: [0.22, 1, 0.36, 1] },
              },
            }
      }
      aria-hidden
    >
      <motion.circle
        cx={c}
        cy={c}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeDasharray="1 1"
        pathLength={1}
        initial={{ pathLength: 0 }}
        animate={exiting ? { pathLength: 0 } : { pathLength: 1 }}
        transition={{
          duration: 1.22,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      <motion.circle
        cx={c}
        cy={c}
        r={r * 0.74}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.55}
        strokeOpacity={0.38}
        strokeDasharray="5 13"
        pathLength={1}
        transform={`rotate(-10 ${c} ${c})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          exiting
            ? { pathLength: 0, opacity: 0 }
            : { pathLength: 1, opacity: 1 }
        }
        transition={{
          delay: exiting ? 0 : 0.26,
          duration: exiting ? 0.4 : 1.05,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <g transform={`translate(${c} ${c})`}>
        <motion.g
          animate={
            exiting
              ? { rotate: 0, opacity: 0 }
              : { rotate: 360, opacity: 1 }
          }
          transition={
            exiting
              ? { duration: 0.35 }
              : { duration: 34, repeat: Infinity, ease: 'linear' }
          }
        >
          {dots.map(({ ox, oy }, i) => (
            <circle
              key={i}
              cx={ox}
              cy={oy}
              r={2.35}
              fill="currentColor"
              opacity={0.55}
            />
          ))}
        </motion.g>
      </g>
    </motion.svg>
  )
}

/** Cinematic intro: ambience, grain, vignette, rail, choreography. */
export function IntroLoader({ children }) {
  const reduce = useReducedMotion()
  const uid = useId().replace(/:/g, '')
  const grainFilterId = `intro-noise-${uid}`
  const [splash, setSplash] = useState(() => ({
    mounted: !reduce,
    exiting: false,
  }))

  useEffect(() => {
    if (reduce) return undefined
    const beginExit = window.setTimeout(() => {
      setSplash((s) => (s.exiting ? s : { ...s, exiting: true }))
    }, PEAK_HOLD_MS)

    const unmount = window.setTimeout(() => {
      setSplash((s) => ({ ...s, mounted: false }))
    }, PEAK_HOLD_MS + EXIT_PHASE_MS)

    return () => {
      window.clearTimeout(beginExit)
      window.clearTimeout(unmount)
    }
  }, [reduce])

  const letters = initialsFromName(portfolio.name)
  const subtitle = portfolio.role?.replace(/\s+/g, ' ') ?? ''

  const letterGlow =
    '0 0 64px rgb(var(--accent)/0.2), -1px 0 2px rgb(248 113 113 / 0.22), 1px 0 2px rgb(34 211 238 / 0.2)'

  return (
    <>
      {children}
      <AnimatePresence mode="wait">
        {splash.mounted && !reduce ? (
          <motion.div
            key="intro-overlay"
            role="presentation"
            aria-hidden
            className="fixed inset-0 z-[200] overflow-hidden bg-surface-muted"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <AmbientOrbs exiting={splash.exiting} />
            <PulseRings exiting={splash.exiting} />

            <div className="intro-loader-grid pointer-events-none absolute inset-0 z-[14] opacity-[0.92]" />

            <IntroVignette exiting={splash.exiting} />
            <FilmGrain filterId={grainFilterId} exiting={splash.exiting} />

            <EditorialMark exiting={splash.exiting} />

            <motion.div
              className="pointer-events-none absolute -left-[18%] top-0 z-[17] h-full w-[52%] rotate-[-15deg] bg-gradient-to-r from-transparent via-white/24 to-transparent dark:via-white/[0.065]"
              initial={{ x: '-28%', opacity: 0 }}
              animate={
                splash.exiting
                  ? { x: '220%', opacity: 0 }
                  : { x: ['-28%', '175%'], opacity: [0, 0.52, 0] }
              }
              transition={
                splash.exiting
                  ? { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 1.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }
              }
            />

            <motion.div
              className="pointer-events-none absolute -right-[14%] top-[16%] z-[16] h-[58%] w-[28%] rotate-[22deg] bg-gradient-to-bl from-accent/18 via-accent/10 to-transparent opacity-85 blur-xl dark:from-accent/12"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={
                splash.exiting
                  ? { opacity: 0, scale: 1.15, rotate: -8 }
                  : { opacity: [0, 0.55, 0.42], scale: [0.94, 1, 1.02], rotate: [18, 19, 16] }
              }
              transition={
                splash.exiting
                  ? { duration: 0.62 }
                  : { duration: 3.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
              }
            />

            <motion.div
              className="pointer-events-none absolute -left-[10%] top-[40%] z-[16] h-[54%] w-[22%] rotate-[-34deg] bg-gradient-to-br from-accent/15 via-transparent to-transparent blur-3xl opacity-90 dark:from-accent/10"
              initial={{ opacity: 0 }}
              animate={
                splash.exiting
                  ? { opacity: 0 }
                  : { opacity: [0.12, 0.35, 0.16], rotate: [-34, -30, -36] }
              }
              transition={
                splash.exiting
                  ? { duration: 0.42 }
                  : { duration: 5.8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.95 }
              }
            />

            <motion.div
              className="pointer-events-none absolute left-[-6%] top-0 z-[21] h-full w-[32%] rotate-[-8deg] bg-gradient-to-r from-transparent via-white/18 to-transparent dark:via-teal-300/14"
              initial={{ x: '-16%', opacity: 0 }}
              animate={
                splash.exiting
                  ? { x: '190%', opacity: 0 }
                  : { x: ['-18%', '210%'], opacity: [0, 0.4, 0] }
              }
              transition={
                splash.exiting
                  ? { duration: 0.68, ease: [0.32, 0.72, 0, 1] }
                  : { duration: 1.1, delay: 2.12, ease: [0.22, 1, 0.36, 1] }
              }
            />

            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[13] h-[46%] bg-gradient-to-t from-surface-muted via-surface-muted/88 to-transparent"
              animate={
                splash.exiting ? { y: '104%', opacity: 0 } : { y: '0%', opacity: 1 }
              }
              transition={{ duration: 0.62, ease: [0.32, 0.72, 0, 1] }}
            />

            <OrbitGlyph exiting={splash.exiting} />

            <SequenceRail exiting={splash.exiting} holdMs={PEAK_HOLD_MS} />

            <div className="relative mx-auto flex min-h-[100dvh] flex-col items-center justify-center px-6">
              <div className="relative">
                <div className="relative px-[clamp(3rem,10vw,5.75rem)] py-[clamp(2.65rem,7.5vw,4.85rem)]">
                  <CornerFrame exiting={splash.exiting} />

                  <motion.div
                    aria-hidden
                    className="absolute inset-0 -z-[1] rounded-[2rem] border border-ink/[0.08] bg-gradient-to-br from-white/74 via-white/14 to-accent/[0.085] shadow-[0_0_110px_-24px_rgb(var(--accent)/0.44)] backdrop-blur-[3px] dark:border-white/[0.1] dark:from-white/[0.046] dark:via-transparent dark:to-accent/[0.14]"
                    initial={{ opacity: 0, scale: 0.91, rotateX: 12 }}
                    animate={
                      splash.exiting
                        ? {
                            opacity: 0,
                            scale: 1.06,
                            filter: 'blur(16px)',
                            transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
                          }
                        : {
                            opacity: 1,
                            scale: 1,
                            rotateX: 0,
                            transition: { ...letterSpring, delay: 0.05 },
                          }
                    }
                    style={{ transformPerspective: '1480px' }}
                  />

                  <motion.div
                    className="relative flex justify-center gap-[min(0.13em,0.68rem)]"
                    animate={
                      splash.exiting
                        ? { transition: {} }
                        : {
                            scale: [1, 1.008, 0.9985, 1],
                            y: [0, -3, 2, 0],
                            rotateX: [0, 0.6, -0.4, 0],
                            transition: {
                              duration: 5.25,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: 1.05,
                            },
                          }
                    }
                  >
                    <motion.div
                      className="flex justify-center gap-[inherit]"
                      variants={{
                        show: {
                          transition: {
                            staggerChildren: 0.14,
                            delayChildren: 0.13,
                            when: 'beforeChildren',
                          },
                        },
                        hide: {},
                        exit: {
                          transition: {
                            staggerChildren: 0.052,
                            staggerDirection: -1,
                            when: 'beforeChildren',
                          },
                        },
                      }}
                      initial="hide"
                      animate={splash.exiting ? 'exit' : 'show'}
                    >
                      {letters.split('').map((ch, i) => (
                        <motion.span
                          key={`${ch}-${i}`}
                          className="relative inline-block select-none bg-gradient-to-b from-ink via-ink-muted to-ink-muted/85 bg-clip-text font-display text-[clamp(3.9rem,21vmin,13.75rem)] font-semibold uppercase leading-none tracking-[-0.032em] text-transparent"
                          style={{
                            transformStyle: 'preserve-3d',
                            textShadow: letterGlow,
                          }}
                          variants={letterReveal}
                        >
                          <span
                            aria-hidden
                            className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/40 via-transparent to-transparent bg-clip-text text-transparent blur-md opacity-85 dark:from-accent/28"
                          >
                            {ch}
                          </span>
                          <span
                            aria-hidden
                            className="absolute inset-0 -z-[11] opacity-[0.12] blur-[12px]"
                            style={{
                              transform: 'translate(2px,-1px)',
                              filter: 'contrast(1.3)',
                              color: 'rgb(var(--accent))',
                              mixBlendMode: 'plus-lighter',
                            }}
                          >
                            {ch}
                          </span>
                          {ch}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="relative mx-auto mt-[clamp(1.4rem,4.35vw,2.25rem)] flex flex-col items-center gap-[1.125rem]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={
                      splash.exiting
                        ? {
                            opacity: 0,
                            y: -18,
                            filter: 'blur(12px)',
                            transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
                          }
                        : {
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: 0.94,
                              duration: 0.58,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          }
                    }
                  >
                    <motion.div className="relative h-[3px] w-[min(14rem,60vw)] origin-center overflow-hidden rounded-full shadow-[0_0_38px_rgb(var(--accent)/0.55)]">
                      <motion.div
                        className="h-full w-full bg-gradient-to-r from-transparent via-accent to-transparent"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={
                          splash.exiting
                            ? { scaleX: 0.12, opacity: 0 }
                            : {
                                scaleX: 1,
                                opacity: 1,
                              }
                        }
                        transition={
                          splash.exiting
                            ? { duration: 0.42 }
                            : {
                                scaleX: { duration: 0.98, delay: 0.66, ease: [0.22, 1, 0.36, 1] },
                                opacity: { duration: 0.35, delay: 0.66 },
                              }
                        }
                      />
                      {!splash.exiting ? (
                        <motion.div
                          className="pointer-events-none absolute inset-y-0 w-[42%] bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/20"
                          initial={{ left: '-40%' }}
                          animate={{ left: ['-40%', '120%'] }}
                          transition={{
                            duration: 1.95,
                            delay: 1.35,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          aria-hidden
                        />
                      ) : null}
                    </motion.div>

                    <p className="max-w-[17.5rem] text-center text-[10px] font-semibold uppercase leading-relaxed tracking-[0.3em] text-ink-muted/82 sm:text-[11px] sm:tracking-[0.36em]">
                      {subtitle}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

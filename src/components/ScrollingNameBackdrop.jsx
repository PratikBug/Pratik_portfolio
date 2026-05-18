import { motion } from 'framer-motion'
import portfolio from '@data/portfolio.json'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Infinite horizontal marquee: two identical halves, x goes 0 → -50% for seamless loop.
 * Spacing between repeats uses margin only (no pl+pr doubling) so there’s no wide “hole” between words.
 */
export function ScrollingNameBackdrop() {
  const reduce = useReducedMotion()
  const displayName = portfolio.name.toUpperCase()

  const segmentClass =
    'inline-block shrink-0 font-display text-[clamp(3rem,13vw,13rem)] font-black uppercase leading-none tracking-[-0.05em] text-ink/[0.08] dark:text-white/[0.06] mr-[0.35em] sm:mr-[0.45em]'

  const count = 10
  const segments = Array.from({ length: count }, (_, i) => (
    <span key={i} className={segmentClass}>
      {displayName}
    </span>
  ))

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      <div className="absolute left-[15%] top-[22%] h-48 w-48 rounded-full border border-ink/[0.06] dark:border-white/[0.07]" />
      <div className="absolute bottom-[18%] right-[10%] h-72 w-72 rounded-full border border-ink/[0.05] dark:border-white/[0.06]" />
      <div className="absolute right-1/3 top-[40%] h-32 w-32 rounded-full border border-ink/[0.04] dark:border-white/[0.05]" />

      <div className="absolute inset-y-0 left-0 flex w-full items-center overflow-hidden">
        {reduce ? (
          <div className="flex w-max">
            <span className={segmentClass}>{displayName}</span>
          </div>
        ) : (
          <motion.div
            className="flex w-max will-change-transform"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 48,
                ease: 'linear',
              },
            }}
          >
            <div className="flex shrink-0">{segments}</div>
            <div className="flex shrink-0">{segments}</div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

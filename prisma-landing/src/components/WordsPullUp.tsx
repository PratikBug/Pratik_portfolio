import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type WordsPullUpProps = {
  text: string
  className?: string
  style?: React.CSSProperties
  showAsterisk?: boolean
}

export function WordsPullUp({ text, className, style, showAsterisk }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const words = text.trim().split(/\s+/).filter(Boolean)

  return (
    <span ref={ref} className={className} style={style}>
      {words.map((word, wi) => {
        const isLastWord = wi === words.length - 1
        const renderAsterisk = Boolean(showAsterisk && isLastWord && word.endsWith('a'))
        const stem = renderAsterisk ? word.slice(0, -1) : word
        const lastLetter = renderAsterisk ? word.slice(-1) : ''

        return (
          <span key={`${word}-${wi}`} className="inline-block overflow-hidden align-baseline">
            <motion.span
              className="inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.65,
                delay: wi * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {renderAsterisk ? (
                <>
                  {stem}
                  <span className="relative inline-block">
                    {lastLetter}
                    <span
                      className="pointer-events-none absolute top-[0.65em] -right-[0.3em] text-[0.31em] leading-none"
                      aria-hidden
                    >
                      *
                    </span>
                  </span>
                </>
              ) : (
                word
              )}
              {wi < words.length - 1 ? '\u00A0' : null}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}

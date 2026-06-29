import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export type StyledSegment = { text: string; className?: string }

type WordsPullUpMultiStyleProps = {
  segments: StyledSegment[]
  containerClassName?: string
}

export function WordsPullUpMultiStyle({ segments, containerClassName = '' }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const flat: { word: string; segmentClass?: string; key: string }[] = []
  segments.forEach((seg, si) => {
    seg.text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word, wi) => {
        flat.push({
          word,
          segmentClass: seg.className,
          key: `${si}-${wi}-${word}`,
        })
      })
  })

  return (
    <span
      ref={ref}
      className={`inline-flex flex-row flex-wrap justify-center gap-x-[0.3em] gap-y-1 ${containerClassName}`.trim()}
    >
      {flat.map(({ word, segmentClass, key }, wi) => (
        <span key={key} className={`inline-block overflow-hidden align-baseline ${segmentClass ?? ''}`.trim()}>
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
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

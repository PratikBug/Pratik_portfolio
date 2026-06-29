import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useMemo, useRef } from 'react'

function AnimatedGlyph({
  char,
  scrollYProgress,
  index,
  totalChars,
}: {
  char: string
  scrollYProgress: MotionValue<number>
  index: number
  totalChars: number
}) {
  const charProgress = totalChars <= 1 ? 0 : index / (totalChars - 1)
  const start = Math.max(0, charProgress - 0.1)
  const end = Math.min(1, charProgress + 0.05)

  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1], { clamp: true })

  if (char === ' ') {
    return <motion.span style={{ opacity }}>&nbsp;</motion.span>
  }

  return <motion.span style={{ opacity }}>{char}</motion.span>
}

type ScrollRevealParagraphProps = {
  text: string
  className?: string
}

export function ScrollRevealParagraph({ text, className }: ScrollRevealParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = useMemo(() => text.split(''), [text])

  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => (
        <AnimatedGlyph key={i} char={char} index={i} totalChars={chars.length} scrollYProgress={scrollYProgress} />
      ))}
    </p>
  )
}

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const hidden = { opacity: 0, y: 28 }
const visible = { opacity: 1, y: 0 }

/** Scroll-reveal section wrapper using Framer Motion whileInView. */
export function AnimatedSection({ children, className, id, delay = 0, as: Tag = 'section' }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    )
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}

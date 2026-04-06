import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
}

/** Wraps routed content with enter/exit transitions. */
export function PageTransition({ children }) {
  const location = useLocation()
  const reduce = useReducedMotion()

  if (reduce) {
    return <div key={location.pathname}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={fade.initial}
        animate={fade.animate}
        exit={fade.exit}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

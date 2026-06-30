import { useEffect, useState } from 'react'

const WORDS = [
  'fintech',
  'healthtech',
  'e-commerce',
  'logistics',
  'SaaS',
  'enterprise',
  'banking',
  'insurance',
  'AI',
  'cloud',
  'mobility',
  'gaming',
] as const

/** Widest word — reserves inline space so lines never jump */
const WIDTH_GHOST = 'healthtech'

const TYPE_MS = 72
const DELETE_MS = 42
const PAUSE_MS = 2200

type Phase = 'typing' | 'deleting'

export function TypewriterWord() {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      const id = window.setInterval(() => {
        setWordIndex((i) => (i + 1) % WORDS.length)
      }, 3000)
      return () => window.clearInterval(id)
    }

    const word = WORDS[wordIndex]
    let timeout: number

    if (phase === 'typing') {
      if (text.length < word.length) {
        timeout = window.setTimeout(() => setText(word.slice(0, text.length + 1)), TYPE_MS)
      } else {
        timeout = window.setTimeout(() => setPhase('deleting'), PAUSE_MS)
      }
    } else if (text.length > 0) {
      timeout = window.setTimeout(() => setText(text.slice(0, -1)), DELETE_MS)
    } else {
      setWordIndex((i) => (i + 1) % WORDS.length)
      setPhase('typing')
    }

    return () => window.clearTimeout(timeout)
  }, [text, phase, wordIndex, reducedMotion])

  const display = reducedMotion ? WORDS[wordIndex] : text

  return (
    <span className="relative inline-block align-baseline font-display font-black text-inherit">
      <span className="invisible select-none font-display font-black" aria-hidden="true">
        {WIDTH_GHOST}
      </span>
      <span
        className="absolute left-0 top-0 whitespace-nowrap font-display font-black"
        aria-live="polite"
        aria-atomic="true"
      >
        {display}
      </span>
    </span>
  )
}

import { useMediaQuery } from './useMediaQuery'

/** True when user prefers reduced motion (accessibility). */
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

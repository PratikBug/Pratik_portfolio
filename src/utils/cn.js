import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely (clsx + tailwind-merge). */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

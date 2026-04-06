/** Scroll to element by id; respects fixed header offset. */
export function scrollToSection(id, offset = 88) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

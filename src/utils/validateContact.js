const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm({ name, email, message }) {
  const errors = {}
  const n = (name || '').trim()
  const e = (email || '').trim()
  const m = (message || '').trim()

  if (n.length < 2) errors.name = 'Please enter your name (at least 2 characters).'
  if (!EMAIL_RE.test(e)) errors.email = 'Please enter a valid email address.'
  if (m.length < 10) errors.message = 'Message should be at least 10 characters.'

  return { valid: Object.keys(errors).length === 0, errors }
}

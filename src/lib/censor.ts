const CENSOR_WORDS = (import.meta.env.VITE_CENSOR_WORDS || '').split(',').filter(Boolean)
const CENSOR_COURSES = import.meta.env.VITE_CENSOR_COURSES === 'true'
const UNLOCK_CODE = import.meta.env.VITE_UNLOCK_CODE || ''
const C = '\u2588'

export function isUnlocked(): boolean {
  return sessionStorage.getItem('unlocked') === '1'
}

export function unlock(code: string): boolean {
  if (!UNLOCK_CODE || code !== UNLOCK_CODE) return false
  sessionStorage.setItem('unlocked', '1')
  window.location.reload()
  return true
}

export function lock(): void {
  sessionStorage.removeItem('unlocked')
  window.location.reload()
}

export function hasCensorship(): boolean {
  return CENSOR_WORDS.length > 0 || CENSOR_COURSES
}

export function censor(text: string): string {
  if (isUnlocked() || (!CENSOR_WORDS.length && !CENSOR_COURSES)) return text

  let result = text

  for (const word of CENSOR_WORDS) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const isAlpha = /^[a-zA-Z]+$/.test(word)
    const pattern = isAlpha ? `\\b${escaped}\\b` : escaped
    result = result.replace(new RegExp(pattern, 'gi'), C.repeat(word.length))
  }

  if (CENSOR_COURSES) {
    result = result.replace(/\b[A-Z]{3,5}\d{4}[A-Z]?\b/g, (m) => C.repeat(m.length))
  }

  return result
}

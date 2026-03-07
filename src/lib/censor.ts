const decode = (s: string) => atob(s)
const CENSOR_WORDS = (import.meta.env.VITE_CENSOR_WORDS || '').split(',').filter(Boolean).map(decode)
const CENSOR_COURSES = import.meta.env.VITE_CENSOR_COURSES === 'true'
const UNLOCK_CODE = import.meta.env.VITE_UNLOCK_CODE ? decode(import.meta.env.VITE_UNLOCK_CODE) : ''
const C = '\u2588'
const decodeTokens = (s: string) => s.replace(/~([A-Za-z0-9+/=]+)~/g, (_, b) => atob(b))

function sign(code: string): string {
  let h = 5381
  for (let i = 0; i < code.length; i++) h = ((h << 5) + h + code.charCodeAt(i)) >>> 0
  return btoa(String(h ^ 0xa5e1))
}

const UNLOCK_TOKEN = UNLOCK_CODE ? sign(UNLOCK_CODE) : ''

export function isUnlocked(): boolean {
  return !!UNLOCK_TOKEN && sessionStorage.getItem('u') === UNLOCK_TOKEN
}

export function unlock(code: string): boolean {
  if (!UNLOCK_CODE || code !== UNLOCK_CODE) return false
  sessionStorage.setItem('u', UNLOCK_TOKEN)
  window.location.reload()
  return true
}

export function lock(): void {
  sessionStorage.removeItem('u')
  window.location.reload()
}

export function hasCensorship(): boolean {
  return CENSOR_WORDS.length > 0 || CENSOR_COURSES
}

export function censor(text: string): string {
  if (isUnlocked() || (!CENSOR_WORDS.length && !CENSOR_COURSES)) return decodeTokens(text)

  let result = decodeTokens(text)

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

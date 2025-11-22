import { useState, useEffect } from 'react'

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      if (Math.abs(currentScrollY - lastScrollY) < 10) return

      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [])

  return { scrollDirection, scrollY }
}

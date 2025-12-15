import { useEffect, useRef, createContext, useContext, useCallback } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext<{ disable: () => void; enable: () => void } | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number>(0)

  const createLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)
  }, [])

  const destroyLenis = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    lenisRef.current?.destroy()
    lenisRef.current = null
  }, [])

  useEffect(() => {
    createLenis()
    return () => destroyLenis()
  }, [createLenis, destroyLenis])

  const controls = useRef({
    disable: () => destroyLenis(),
    enable: () => { if (!lenisRef.current) createLenis() },
  }).current

  return <LenisContext.Provider value={controls}>{children}</LenisContext.Provider>
}

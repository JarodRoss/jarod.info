import { useState, useCallback, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'

import DevToolsGuard from '@/components/DevToolsGuard'
import SmoothScroll from '@/components/layout/SmoothScroll'
import LoadingScreen from '@/components/layout/LoadingScreen'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CommandMenu from '@/components/ui/CommandMenu'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LanguageToggle from '@/components/ui/LanguageToggle'
import Terminal from '@/components/easter-egg/Terminal'
import UnlockModal from '@/components/ui/UnlockModal'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Projects = lazy(() => import('@/pages/Projects'))
const Experience = lazy(() => import('@/pages/Experience'))
const Academics = lazy(() => import('@/pages/Academics'))
const Thesis = lazy(() => import('@/pages/Thesis'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/thesis" element={<Thesis />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('loaded'))
  const [cmdOpen, setCmdOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [unlockOpen, setUnlockOpen] = useState(false)

  const handleLoadingComplete = useCallback(() => {
    setLoading(false)
    sessionStorage.setItem('loaded', '1')
  }, [])

  useEffect(() => {
    const konami = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a',
    ]
    let index = 0

    const handler = (e: KeyboardEvent) => {
      if (e.key === konami[index]) {
        index++
        if (index === konami.length) {
          setTerminalOpen(true)
          index = 0
        }
      } else {
        index = 0
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <DevToolsGuard>
    <HelmetProvider>
      <BrowserRouter>
        {loading ? (
          <LoadingScreen onComplete={handleLoadingComplete} />
        ) : (
          <SmoothScroll>
            <Navbar onCommandMenu={() => setCmdOpen(true)} onUnlock={() => setUnlockOpen(true)} />

            <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            <main className="min-h-screen">
              <ScrollToTop />
              <AnimatedRoutes />
            </main>

            <Footer onOpenTerminal={() => setTerminalOpen(true)} />

            <CommandMenu
              open={cmdOpen}
              onOpenChange={setCmdOpen}
              onOpenTerminal={() => {
                setCmdOpen(false)
                setTerminalOpen(true)
              }}
            />
            <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
            <UnlockModal open={unlockOpen} onClose={() => setUnlockOpen(false)} />
          </SmoothScroll>
        )}
      </BrowserRouter>
    </HelmetProvider>
    </DevToolsGuard>
  )
}

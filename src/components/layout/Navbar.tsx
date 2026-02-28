import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Lock, LockOpen } from 'lucide-react'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { navItems } from '@/data/navigation'
import { cn } from '@/lib/utils'
import { hasCensorship, isUnlocked, lock } from '@/lib/censor'

export default function Navbar({ onCommandMenu, onUnlock }: { onCommandMenu: () => void; onUnlock: () => void }) {
  const { t } = useTranslation()
  const location = useLocation()
  const { scrollDirection, scrollY } = useScrollDirection()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(totalHeight > 0 ? window.scrollY / totalHeight : 0)
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const hidden = scrollDirection === 'down' && scrollY > 100 && !mobileOpen

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[60] h-[2px]"
        style={{
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, #2e9bfb, #CE42FF)',
        }}
      />

      <motion.header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-300',
          scrollY > 50
            ? 'border-b border-zinc-800/30 bg-zinc-950/80 backdrop-blur-xl'
            : '',
        )}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <Link to="/" className="font-display text-xl font-bold">
            <span className="gradient-text">J</span>
            <span className="text-white">arod</span>
            <span className="text-zinc-600">.</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm transition-all',
                    isActive
                      ? 'bg-zinc-800/50 text-white'
                      : 'text-zinc-400 hover:text-zinc-200',
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              )
            })}

            <button
              onClick={onCommandMenu}
              className="relative z-[2] ml-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-300"
            >
              <span>Cmd+K</span>
            </button>

            {hasCensorship() && (
              <button
                onClick={isUnlocked() ? lock : onUnlock}
                className="ml-1 rounded-full border border-zinc-800 bg-zinc-900/50 p-1.5 text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-300"
                title={isUnlocked() ? 'Verrouiller' : 'Déverrouiller'}
              >
                {isUnlocked() ? <LockOpen size={14} /> : <Lock size={14} />}
              </button>
            )}
          </div>

          <button
            className="text-zinc-400 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="border-t border-zinc-800/30 bg-zinc-950/95 backdrop-blur-xl md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'rounded-lg px-3 py-2.5 text-sm transition-all',
                      location.pathname === item.path
                        ? 'bg-zinc-800/50 text-white'
                        : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-white',
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

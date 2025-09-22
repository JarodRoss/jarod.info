import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Github, FileDown, Lock, X } from 'lucide-react'
import { isUnlocked } from '@/lib/censor'
import { AnimatePresence } from 'framer-motion'

const TYPE = 60
const DELETE = 35
const PAUSE = 1800
const GAP = 400

function useTypewriter(phrases: string[]) {
  const [display, setDisplay] = useState('')
  const [index, setIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing')

  const current = phrases[index]

  const tick = useCallback(() => {
    switch (phase) {
      case 'typing':
        if (charIndex < current.length) {
          setDisplay(current.slice(0, charIndex + 1))
          setCharIndex((c) => c + 1)
        } else {
          setPhase('pause')
        }
        break
      case 'pause':
        setPhase('deleting')
        setCharIndex(current.length)
        break
      case 'deleting':
        if (charIndex > 0) {
          setDisplay(current.slice(0, charIndex - 1))
          setCharIndex((c) => c - 1)
        } else {
          setIndex((i) => (i + 1) % phrases.length)
          setPhase('typing')
          setCharIndex(0)
        }
        break
    }
  }, [phase, charIndex, current, phrases.length])

  useEffect(() => {
    let delay = TYPE
    if (phase === 'deleting') delay = DELETE
    if (phase === 'pause') delay = PAUSE
    if (phase === 'deleting' && charIndex === 0) delay = GAP

    const timer = setTimeout(tick, delay)
    return () => clearTimeout(timer)
  }, [tick, phase, charIndex])

  return display
}

export default function Hero() {
  const { t } = useTranslation()
  const [showLocked, setShowLocked] = useState(false)
  const roles = t('hero.roles', { returnObjects: true }) as string[]
  const prefix = t('hero.typing_prefix')
  const phrases = [prefix, ...roles]
  const display = useTypewriter(phrases)

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="orb orb-blue -top-32 -left-32 h-[500px] w-[500px]" />
      <div className="orb orb-purple -right-32 top-1/4 h-[400px] w-[400px]" />
      <div className="orb orb-blue bottom-0 left-1/3 h-[300px] w-[300px]" />

      <div className="dot-grid absolute inset-0 opacity-50" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p
              className="mb-2 text-lg text-zinc-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('hero.greeting')}
            </motion.p>

            <motion.h1
              className="font-display text-6xl font-bold md:text-8xl lg:text-9xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="gradient-text">{t('hero.name')}</span>
            </motion.h1>

            <motion.div
              className="mt-4 h-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="font-display text-3xl font-semibold text-zinc-400 md:text-5xl">
                {display}
                <span className="ml-0.5 inline-block w-[3px] animate-pulse bg-accent-blue align-middle" style={{ height: '1em' }} />
              </span>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                to="/projects"
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 font-medium text-white transition-all hover:shadow-lg hover:shadow-accent-blue/25"
                style={{ background: 'linear-gradient(135deg, #2e9bfb, #CE42FF)' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('hero.cta_projects')} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/50 px-7 py-3.5 font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
              >
                <Mail size={18} /> {t('hero.cta_contact')}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://github.com/JarodRoss/jarod.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-500 transition-colors hover:border-zinc-600 hover:text-zinc-300"
                >
                  <Github size={15} /> {t('hero.cta_source')}
                </a>
                {isUnlocked() ? (
                  <a
                    href="/cv/Jarod_CV_FR.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-500 transition-colors hover:border-zinc-600 hover:text-zinc-300"
                  >
                    <FileDown size={15} /> {t('hero.cta_cv')}
                  </a>
                ) : (
                  <button
                    onClick={() => setShowLocked(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-500 transition-colors hover:border-zinc-600 hover:text-zinc-300"
                  >
                    <Lock size={14} /> <FileDown size={15} /> {t('hero.cta_cv')}
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative">
              <img
                src="/images/jarod.png"
                alt="Jarod"
                className="relative z-10 h-80 w-80 rounded-3xl border border-zinc-800/50 object-cover"
              />
              <div
                className="absolute -inset-2 -z-10 rounded-3xl opacity-40 blur-2xl"
                style={{ background: 'linear-gradient(135deg, #2e9bfb, #CE42FF)' }}
              />
              <div
                className="absolute -inset-px -z-[5] rounded-3xl"
                style={{ background: 'linear-gradient(135deg, rgba(46,155,251,0.2), rgba(206,66,255,0.2))' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showLocked && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center">
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLocked(false)}
            />
            <motion.div
              className="relative z-10 mx-4 w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-8"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => setShowLocked(false)}
                className="absolute right-4 top-4 text-zinc-500 transition-colors hover:text-zinc-300"
              >
                <X size={18} />
              </button>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-800/60">
                <Lock size={22} className="text-red-400" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-white">
                {t('academics.locked_title')}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {t('academics.locked_desc')}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

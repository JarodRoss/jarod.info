import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { BookOpen, Lock, ExternalLink, X, Construction } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/layout/PageTransition'
import Section from '@/components/ui/Section'
import { censor } from '@/lib/censor'

export default function Thesis() {
  const { t } = useTranslation()
  const [showLocked, setShowLocked] = useState(false)

  return (
    <PageTransition>
      <Helmet>
        <title>Jarod | {t('nav.thesis')}</title>
      </Helmet>

      <Section className="pt-28">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            <span className="gradient-text">{t('thesis.title')}</span>
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
            <Construction size={12} />
            {t('thesis.wip')}
          </span>
        </div>

        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-zinc-400">
          {t('thesis.intro')}
        </p>

        <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-800/60">
              <BookOpen size={18} className="text-accent-blue" />
            </div>
            <div>
              <p className="font-mono text-sm text-accent-blue">{censor('LINFO2992')}</p>
              <p className="text-sm text-zinc-400">{t('thesis.course_name')}</p>
            </div>
          </div>

          <p className="mb-5 text-sm leading-relaxed text-zinc-400">
            {t('thesis.desc')}
          </p>

          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-xs text-zinc-400">25 crédits</span>
            <span className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-xs text-zinc-400">Q1 + Q2</span>
            <span className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-xs text-zinc-400">2025-2026</span>
            <span className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-xs text-zinc-400">Anglais</span>
          </div>

          <button
            onClick={() => setShowLocked(true)}
            className="group inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/50 px-5 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
          >
            <Lock size={14} className="text-zinc-500 transition-colors group-hover:text-zinc-400" />
            <ExternalLink size={14} className="text-zinc-500 transition-colors group-hover:text-zinc-400" />
            {t('thesis.button')}
          </button>
        </div>


        <div className="mt-8 rounded-2xl border border-dashed border-zinc-800/60 bg-zinc-900/30 p-8 text-center">
          <Construction size={32} className="mx-auto mb-3 text-zinc-600" />
          <p className="text-sm text-zinc-500">{t('thesis.coming_soon')}</p>
        </div>
      </Section>

      <AnimatePresence>
        {showLocked && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center">
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLocked(false)}
            />
            <motion.div
              className="relative z-10 mx-4 w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
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
                {t('thesis.locked_desc')}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}

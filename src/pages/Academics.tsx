import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { GraduationCap, Lock, Download, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/layout/PageTransition'
import Section from '@/components/ui/Section'
import GradeTable from '@/components/ui/GradeTable'
import { bachelorYears, masterYears } from '@/data/grades'

export default function Academics() {
  const { t } = useTranslation()
  const [showLocked, setShowLocked] = useState(false)

  return (
    <PageTransition>
      <Helmet>
        <title>Jarod | {t('nav.academics')}</title>
        <meta property="og:title" content="Jarod | Education" />
        <meta property="og:description" content="Bachelor & Master in Computer Science. Networking, Cybersecurity & Business Challenges." />
        <meta property="og:url" content="https://jarod.info/academics" />
      </Helmet>

      <Section className="pt-28">
        <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
          <span className="gradient-text">{t('academics.title')}</span>
        </h1>
        <p className="mb-6 max-w-3xl text-lg leading-relaxed text-zinc-400">
          {t('academics.intro')}
        </p>
        <div className="mb-12 flex flex-wrap items-center gap-4">
          <p className="flex items-center gap-2 text-zinc-500">
            <GraduationCap size={20} className="text-accent-blue" /> {t('academics.institution')}
          </p>
          <button
            onClick={() => setShowLocked(true)}
            className="group flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
          >
            <Lock size={14} className="text-zinc-500 transition-colors group-hover:text-zinc-400" />
            <Download size={14} className="text-zinc-500 transition-colors group-hover:text-zinc-400" />
            {t('academics.download_diploma')}
          </button>
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

        <div className="mb-14">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl font-bold text-white">
              {t('academics.bachelor_title')}
            </h2>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
              Obtenu avec distinction (with Cum Laude)
            </span>
          </div>
          <p className="mb-6 text-sm text-zinc-500">{t('academics.bachelor_info')}</p>
          <div className="space-y-3">
            {bachelorYears.map((year) => (
              <GradeTable key={year.yearKey} academicYear={year} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 font-display text-2xl font-bold text-white">
            {t('academics.master_title')}
          </h2>
          <p className="mb-6 text-sm text-zinc-500">{t('academics.master_info')}</p>
          <div className="space-y-3">
            {masterYears.map((year) => (
              <GradeTable key={year.yearKey} academicYear={year} />
            ))}
          </div>
        </div>
      </Section>
    </PageTransition>
  )
}

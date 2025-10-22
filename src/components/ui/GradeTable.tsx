import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Lock, X } from 'lucide-react'
import { getFormattedNote, calculateAverage } from '@/lib/utils'
import type { AcademicYear } from '@/types'

export default function GradeTable({ academicYear }: { academicYear: AcademicYear }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [showLocked, setShowLocked] = useState(false)

  const gradedCourses = academicYear.grades.filter((g) => g.note > 0)
  const average = calculateAverage(gradedCourses)
  const hasAnyGrade = gradedCourses.length > 0

  if (academicYear.grades.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
        <p className="font-display font-medium text-zinc-400">
          {t(academicYear.yearKey)} - En cours...
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between p-5 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="font-display font-semibold text-white">{t(academicYear.yearKey)}</span>
            {hasAnyGrade && (
              <span className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-0.5 text-xs text-zinc-300">
                {t('academics.average')}: <span className="font-medium text-accent-blue">{getFormattedNote(average)}</span>
              </span>
            )}
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={20} className="text-zinc-400" />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-zinc-800/50 px-5 pb-5">
                <table className="mt-4 w-full text-sm">
                  <thead>
                    <tr className="text-left text-zinc-500">
                      <th className="pb-3 font-medium">{t('academics.course')}</th>
                      <th className="pb-3 text-right font-medium">{t('academics.grade')}</th>
                      <th className="pb-3 text-right font-medium">{t('academics.credits')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {academicYear.grades.map((grade) => (
                      <tr key={grade.courseCode} className="border-t border-zinc-800/30">
                        <td className="py-2.5">
                          <button
                            onClick={() => setShowLocked(true)}
                            className="mr-2 font-mono text-xs text-accent-blue transition-colors hover:text-white"
                          >
                            {grade.courseCode}
                          </button>
                          <span className="text-zinc-300">{grade.courseNameKey}</span>
                        </td>
                        <td className="py-2.5 text-right">
                          {grade.note > 0 ? (
                            <span className={grade.note >= 14 ? 'font-medium text-emerald-400' : grade.note >= 10 ? 'text-zinc-200' : 'text-red-400'}>
                              {getFormattedNote(grade.note, grade.total)}
                            </span>
                          ) : (
                            <span className="text-zinc-600">-</span>
                          )}
                        </td>
                        <td className="py-2.5 text-right text-zinc-500">{grade.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showLocked && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center">
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLocked(false)}
            />
            <motion.div
              className="relative z-10 mx-4 w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/95 p-8"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
                {t('academics.locked_links_desc')}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

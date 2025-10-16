import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { Experience } from '@/types'

export default function TimelineItem({ experience, index }: { experience: Experience; index: number }) {
  const { t } = useTranslation()

  return (
    <motion.div
      className="relative pl-8 pb-6 last:pb-0"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="absolute top-2 left-0 h-full w-px"
        style={{ background: 'linear-gradient(to bottom, #2e9bfb, #CE42FF, transparent)' }}
      />
      <div className="absolute top-2 -left-1.5 h-3.5 w-3.5 rounded-full border-2 border-zinc-950" style={{ background: 'linear-gradient(135deg, #2e9bfb, #CE42FF)' }}>
        <div className="absolute -inset-1 -z-10 rounded-full opacity-40 blur-sm" style={{ background: 'linear-gradient(135deg, #2e9bfb, #CE42FF)' }} />
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <p className="mb-1 text-sm font-medium text-accent-blue">{experience.period}</p>
        <h3 className="font-display text-xl font-semibold text-white">
          {t(experience.roleKey)}
        </h3>
        <p className="mb-4 text-sm text-zinc-400">
          {experience.companyUrl ? (
            <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">
              {t(experience.companyKey)}
            </a>
          ) : (
            t(experience.companyKey)
          )}
        </p>
        <ul className="mb-5 space-y-2">
          {experience.descriptionKeys.map((key) => (
            <li key={key} className="flex gap-2 text-sm leading-relaxed text-zinc-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue/60" />
              {t(key)}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-zinc-800 bg-zinc-800/50 px-2.5 py-0.5 text-xs text-zinc-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

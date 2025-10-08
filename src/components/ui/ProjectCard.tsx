import { useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { censor, isUnlocked } from '@/lib/censor'
import type { Project } from '@/types'

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      ref={cardRef}
      className="glow-card group rounded-2xl border border-zinc-800 bg-zinc-900/70 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80"
      whileHover={{ scale: 1.02, y: -6 }}
      transition={{ duration: 0.25 }}
      onMouseMove={handleMouseMove}
    >
      {project.image && (
        <div className="aspect-video overflow-hidden rounded-t-2xl bg-zinc-800">
          <img
            src={project.image}
            alt={t(project.titleKey)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="mb-2 font-display text-lg font-semibold text-white">
          {t(project.titleKey)}
          {project.courseCode && (
            isUnlocked() ? (
              <a
                href={`${atob('aHR0cHM6Ly91Y2xvdXZhaW4uYmUvY291cnMt')}${project.courseCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 font-mono text-xs font-normal text-accent-blue transition-colors hover:text-white"
              >
                {project.courseCode}
              </a>
            ) : (
              <span className="ml-2 font-mono text-xs font-normal text-zinc-600">
                {censor(project.courseCode)}
              </span>
            )
          )}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-zinc-400">
          <Trans i18nKey={project.descriptionKey} components={{
            1: <a href="https://www.youtube.com/@garryschool" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline" />,
          }} />
        </p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-800 bg-zinc-800/50 px-2.5 py-0.5 text-xs text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-accent-blue transition-colors hover:text-white"
            >
              <ExternalLink size={14} /> {t('projects.live')}
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              <Github size={14} /> {t('projects.source')}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

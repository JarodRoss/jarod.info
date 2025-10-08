import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import PageTransition from '@/components/layout/PageTransition'
import Section from '@/components/ui/Section'
import ProjectCard from '@/components/ui/ProjectCard'
import { lesProjects } from '@/data/projects'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'professional' | 'personal' | 'academic'

const filters: { key: Filter; labelKey: string }[] = [
  { key: 'all', labelKey: 'projects.filter_all' },
  { key: 'professional', labelKey: 'projects.filter_professional' },
  { key: 'personal', labelKey: 'projects.filter_personal' },
  { key: 'academic', labelKey: 'projects.filter_academic' },
]

export default function Projects() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = filter === 'all' ? lesProjects : lesProjects.filter((p) => p.category === filter)

  return (
    <PageTransition>
      <Helmet>
        <title>Jarod | {t('nav.projects')}</title>
      </Helmet>

      <Section className="pt-28">
        <h1 className="mb-8 font-display text-4xl font-bold md:text-5xl">
          <span className="gradient-text">{t('projects.title')}</span>
        </h1>

        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-xl px-5 py-2.5 text-sm font-medium transition-all',
                filter === f.key
                  ? 'text-white shadow-lg shadow-accent-blue/20'
                  : 'border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-white',
              )}
              style={filter === f.key ? { background: 'linear-gradient(135deg, #2e9bfb, #CE42FF)' } : undefined}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-10 text-center text-zinc-500">{t('projects.no_results')}</p>
        ) : (
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </Section>
    </PageTransition>
  )
}

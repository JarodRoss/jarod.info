import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import ProjectCard from '@/components/ui/ProjectCard'
import { lesProjects } from '@/data/projects'

export default function FeaturedProjects() {
  const { t } = useTranslation()
  const featured = lesProjects.filter((p) => p.featured).slice(0, 3)

  return (
    <Section>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-display text-3xl font-bold">
          <span className="gradient-text">{t('featured_projects.title')}</span>
        </h2>
        <Link
          to="/projects"
          className="group flex items-center gap-1 text-sm text-accent-blue transition-colors hover:text-white"
        >
          {t('featured_projects.view_all')} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}

import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import PageTransition from '@/components/layout/PageTransition'
import Section from '@/components/ui/Section'
import TimelineItem from '@/components/ui/TimelineItem'
import { mesExperiences } from '@/data/experience'

export default function Experience() {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <Helmet>
        <title>Jarod | {t('nav.experience')}</title>
        <meta property="og:title" content="Jarod | Experience" />
        <meta property="og:description" content="Sysadmin, developer, technical project lead. Managing infrastructure for 200+ concurrent users since 2020." />
        <meta property="og:url" content="https://jarod.info/experience" />
      </Helmet>

      <Section className="pt-28">
        <h1 className="mb-12 font-display text-4xl font-bold md:text-5xl">
          <span className="gradient-text">{t('experience.title')}</span>
        </h1>

        <div className="ml-4">
          {mesExperiences.map((exp, i) => (
            <TimelineItem key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </Section>
    </PageTransition>
  )
}

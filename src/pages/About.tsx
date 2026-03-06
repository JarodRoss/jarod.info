import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import PageTransition from '@/components/layout/PageTransition'
import Section from '@/components/ui/Section'
import SkillBadge from '@/components/ui/SkillBadge'
import { skillCategories } from '@/data/skills'

const interestKeys = ['ai', 'space', 'networks', 'music', 'streaming', 'cybersec']

export default function About() {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <Helmet>
        <title>Jarod | {t('nav.about')}</title>
      </Helmet>

      <Section className="pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_300px]">
          <div>
            <motion.h1
              className="mb-8 font-display text-4xl font-bold md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="gradient-text">{t('about.title')}</span>
            </motion.h1>
            <div className="space-y-5 text-lg leading-relaxed text-zinc-400">
              <p>{t('about.intro')}</p>
              <p>{t('about.paragraph1')}</p>
              <p>{t('about.paragraph2')}</p>
              <p>{t('about.paragraph3')}</p>
              <p>{t('about.paragraph4')}</p>
            </div>
          </div>
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src="/images/jarod.png"
                alt="Jarod"
                className="relative z-10 w-full rounded-2xl border border-zinc-800/50 object-cover"
              />
              <div
                className="absolute -inset-2 -z-10 rounded-2xl opacity-30 blur-xl"
                style={{ background: 'linear-gradient(135deg, #2e9bfb, #CE42FF)' }}
              />
            </div>
          </motion.div>
        </div>
      </Section>

      <Section>
        <h2 className="mb-8 font-display text-3xl font-bold text-white">
          {t('about.skills_title')}
        </h2>
        <div className="space-y-10">
          {skillCategories.map((cat) => (
            <div key={cat.categoryKey}>
              <h3 className="mb-5 inline-block font-display text-lg font-semibold">
                <span className="gradient-text">{t(cat.categoryKey)}</span>
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill, i) => (
                  <SkillBadge key={`${cat.categoryKey}-${skill.name}`} skill={skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="mb-6 font-display text-3xl font-bold text-white">
          {t('about.interests_title')}
        </h2>
        <ul className="space-y-3 text-lg text-zinc-400">
          {interestKeys.map((key) => (
            <li key={key} className="flex items-start gap-2.5">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
              {t(`about.interests.${key}`)}
            </li>
          ))}
        </ul>
      </Section>
    </PageTransition>
  )
}

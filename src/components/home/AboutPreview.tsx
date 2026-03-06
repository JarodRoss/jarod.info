import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'

export default function AboutPreview() {
  const { t } = useTranslation()

  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
        <motion.img
          src="/images/jarod.png"
          alt="Jarod"
          className="mx-auto h-48 w-48 rounded-2xl border border-zinc-800 object-cover lg:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        <div>
          <h2 className="mb-6 font-display text-3xl font-bold">
            <span className="gradient-text">{t('about_preview.title')}</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
            {t('about_preview.text')}
          </p>
          <Link
            to="/about"
            className="group mt-6 inline-flex items-center gap-2 text-accent-blue transition-colors hover:text-white"
          >
            {t('about_preview.link')} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Section>
  )
}

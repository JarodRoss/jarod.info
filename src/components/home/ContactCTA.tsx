import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactCTA() {
  const { t } = useTranslation()

  return (
    <motion.section
      className="relative mx-auto my-20 max-w-[1200px] px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800/50 p-10 text-center md:p-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-purple/10" />
        <div className="orb orb-blue absolute -top-20 -left-20 h-[300px] w-[300px] !opacity-30" />
        <div className="orb orb-purple absolute -right-20 -bottom-20 h-[250px] w-[250px] !opacity-20" />
        <div className="dot-grid absolute inset-0 -z-[5] opacity-30" />

        <h2 className="relative mb-4 font-display text-3xl font-bold text-white md:text-5xl">
          {t('contact_cta.title')}
        </h2>
        <p className="relative mb-8 text-lg text-zinc-400">{t('contact_cta.subtitle')}</p>
        <Link
          to="/contact"
          className="group relative inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-medium text-white transition-all hover:shadow-lg hover:shadow-accent-blue/25"
          style={{ background: 'linear-gradient(135deg, #2e9bfb, #CE42FF)' }}
        >
          {t('contact_cta.button')} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.section>
  )
}

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { tools } from '@/data/tools'
import Section from '@/components/ui/Section'

export default function ToolsSection() {
  const { t } = useTranslation()

  return (
    <Section>
      <h2 className="mb-2 font-display text-3xl font-bold md:text-4xl">
        <span className="gradient-text">{t('tools.title')}</span>
      </h2>
      <p className="mb-10 text-zinc-400">{t('tools.subtitle')}</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.pkg}
            className="group flex flex-col items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800/60"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ scale: 1.05, y: -3 }}
          >
            <img src={tool.icon} alt={tool.name} className="h-10 w-10" loading="lazy" />
            <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{tool.name}</span>
            <span className="font-mono text-[10px] text-zinc-600">{tool.pkg}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

import { motion } from 'framer-motion'
import type { Skill } from '@/types'

export default function SkillBadge({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.span
      className="flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-300 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800/60 hover:text-white"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      {skill.icon && (
        <img src={skill.icon} alt={skill.name} className="h-5 w-5" loading="lazy" />
      )}
      {skill.name}
    </motion.span>
  )
}

import { useTranslation } from 'react-i18next'
import { Github, Twitch, Mail } from 'lucide-react'
import { socials } from '@/data/socials'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = { Github, Twitch, Mail }

export default function Footer({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const { t } = useTranslation()
  return (
    <footer>
      <div className="gradient-line" />
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 px-6 py-10 md:flex-row md:justify-between">
        <p className="text-sm text-zinc-500">
          {t('footer.developed_by')}
        </p>

        <div className="flex items-center gap-4">
          {socials.map((social) => {
            const Icon = iconMap[social.icon]
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-accent-blue"
                aria-label={social.name}
              >
                {Icon && <Icon size={20} />}
              </a>
            )
          })}
          <button
            onClick={onOpenTerminal}
            className="font-mono text-sm text-zinc-600 transition-colors hover:text-green-400"
            title="..."
          >
            <span className="animate-pulse">_</span>
          </button>
        </div>

        <p className="text-sm text-zinc-600">
          {t('footer.last_updated')}
        </p>
      </div>
    </footer>
  )
}

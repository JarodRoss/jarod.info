import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { Github, Twitch, Mail, GitCommit } from 'lucide-react'
import { socials } from '@/data/socials'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = { Github, Twitch, Mail }

interface CommitInfo {
  sha: string
  message: string
  date: string
}

function useLastCommit() {
  const [commit, setCommit] = useState<CommitInfo | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/JarodRoss/jarod.info/commits?per_page=1')
      .then(r => r.json())
      .then(data => {
        if (data[0]) {
          setCommit({
            sha: data[0].sha.slice(0, 7),
            message: data[0].commit.message.split('\n')[0],
            date: new Date(data[0].commit.author.date).toLocaleDateString('fr-FR', {
              day: 'numeric', month: 'short', year: 'numeric'
            }),
          })
        }
      })
      .catch(() => {})
  }, [])

  return commit
}

export default function Footer({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const { t } = useTranslation()
  const commit = useLastCommit()

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
            className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-white"
            title="..."
          >
            <img src="/images/arch-linux-svgrepo-com.svg" alt="Terminal" className="h-5 w-5 brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {commit ? (
          <a
            href="https://github.com/JarodRoss/jarod.info/commits/main"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-zinc-600 transition-colors hover:text-zinc-400"
          >
            <GitCommit size={12} />
            <span>{commit.sha}</span>
            <span className="text-zinc-700">· {commit.date}</span>
          </a>
        ) : (
          <p className="text-sm text-zinc-600">
            {t('footer.last_updated')}
          </p>
        )}
      </div>
    </footer>
  )
}

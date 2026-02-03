import { useTranslation } from 'react-i18next'
import Section from '@/components/ui/Section'

export default function CurrentlyDoing() {
  const { t } = useTranslation()

  return (
    <Section>
      <div className="grid gap-4 md:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 py-5">
          <p className="text-sm text-zinc-500">{t('currently.label')}</p>
          <p className="mt-1 text-zinc-300">{t('currently.text')}</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-zinc-800">
          <iframe
            style={{ borderRadius: 0 }}
            src="https://open.spotify.com/embed/track/4WmB04GBqS4xPMYN9dHgBw?utm_source=generator&theme=0"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="min-h-[152px]"
          />
        </div>
      </div>
    </Section>
  )
}

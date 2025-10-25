import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Github, Twitch, Mail, Coffee, Heart, Handshake, type LucideIcon } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import Section from '@/components/ui/Section'
import ContactForm from '@/components/ui/ContactForm'
import { socials } from '@/data/socials'

const iconMap: Record<string, LucideIcon> = { Github, Twitch, Mail }

export default function Contact() {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <Helmet>
        <title>Jarod | {t('nav.contact')}</title>
        <meta property="og:title" content="Jarod | Contact" />
        <meta property="og:description" content="Get in touch for projects, orders, technical assistance or just to chat." />
        <meta property="og:url" content="https://jarod.info/contact" />
      </Helmet>

      <Section className="pt-28">
        <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
          <span className="gradient-text">{t('contact.title')}</span>
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-zinc-400">{t('contact.subtitle')}</p>

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <ContactForm />

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">Socials</h3>
            <div className="space-y-3">
              {socials.map((social) => {
                const Icon = iconMap[social.icon]
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-400 transition-all hover:border-zinc-700 hover:text-white"
                  >
                    {Icon && <Icon size={20} className="text-accent-blue" />}
                    <span>{social.name}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-zinc-800/60 bg-zinc-900/70 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-800/60">
                <Handshake size={20} className="text-accent-blue" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                {t('contact.services_title')}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              {t('contact.services_desc')}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800/60 bg-zinc-900/70 p-8 text-center">
            <Coffee size={28} className="mb-4 text-amber-400" />
            <h3 className="mb-2 font-display text-lg font-bold text-white">
              {t('contact.coffee_title')}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-zinc-400">
              {t('contact.coffee_desc')}
            </p>
            <a
              href="https://streamlabs.com/jarod_ross/tip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-amber-500/20"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}
            >
              <Heart size={16} fill="currentColor" />
              {t('contact.coffee_button')}
            </a>
          </div>
        </div>
      </Section>
    </PageTransition>
  )
}

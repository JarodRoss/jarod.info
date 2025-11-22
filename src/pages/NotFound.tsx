import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Mail } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <Helmet>
        <title>404 | Jarod</title>
      </Helmet>
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-sm text-zinc-600">$ curl jarod.info/???</p>
        <h1 className="mt-3 font-display text-8xl font-bold text-white">{t('not_found.title')}</h1>
        <p className="mt-4 max-w-md text-lg text-zinc-400">{t('not_found.message')}</p>
        <p className="mt-2 text-sm text-zinc-600">{t('not_found.subtitle')}</p>
        <div className="mt-8 flex gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          >
            <ArrowLeft size={18} /> {t('not_found.back')}
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-2 rounded-lg border border-zinc-800 px-6 py-3 text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-300"
          >
            <Mail size={18} /> Contact
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}

import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          website: data.get('website'),
        }),
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClasses = 'w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-600 outline-none transition-colors focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">{t('contact.name')}</label>
          <input
            type="text"
            name="name"
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">{t('contact.email')}</label>
          <input
            type="email"
            name="email"
            required
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-400">{t('contact.subject')}</label>
        <select
          name="subject"
          required
          className={inputClasses}
        >
          <option value="project">{t('contact.subjects.project')}</option>
          <option value="order">{t('contact.subjects.order')}</option>
          <option value="info">{t('contact.subjects.info')}</option>
          <option value="recruitment">{t('contact.subjects.recruitment')}</option>
          <option value="proposal">{t('contact.subjects.proposal')}</option>
          <option value="ideas">{t('contact.subjects.ideas')}</option>
          <option value="consultation">{t('contact.subjects.consultation')}</option>
          <option value="assistance">{t('contact.subjects.assistance')}</option>
          <option value="personal">{t('contact.subjects.personal')}</option>
          <option value="other">{t('contact.subjects.other')}</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-400">{t('contact.message')}</label>
        <textarea
          name="message"
          rows={5}
          required
          className={`${inputClasses} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group flex items-center gap-2 rounded-xl px-7 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-accent-blue/25 disabled:opacity-50"
        style={{ background: 'linear-gradient(135deg, #2e9bfb, #CE42FF)' }}
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={18} className="animate-spin" /> {t('contact.sending')}
          </>
        ) : (
          <>
            <Send size={18} /> {t('contact.send')}
          </>
        )}
      </button>

      {status === 'success' && (
        <p className="flex items-center gap-2 text-sm text-emerald-400">
          <CheckCircle size={16} /> {t('contact.success')}
        </p>
      )}
      {status === 'error' && (
        <p className="flex items-center gap-2 text-sm text-red-400">
          <XCircle size={16} /> {t('contact.error')}
        </p>
      )}
    </form>
  )
}

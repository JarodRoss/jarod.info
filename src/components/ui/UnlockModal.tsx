import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { X, KeyRound, ShieldAlert } from 'lucide-react'
import { unlock } from '@/lib/censor'

export default function UnlockModal({ open, onClose, entry = false }: { open: boolean; onClose: () => void; entry?: boolean }) {
  const { t } = useTranslation()
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!unlock(code.trim())) {
      setError(true)
      setTimeout(() => setError(false), 1500)
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center">
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 mx-4 w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/95 p-7"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <X size={16} />
        </button>

        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-800/60">
          {entry ? <ShieldAlert size={20} className="text-amber-400" /> : <KeyRound size={20} className="text-accent-blue" />}
        </div>

        {entry ? (
          <>
            <h3 className="mb-2 font-display text-base font-bold text-white">
              {t('unlock.entry_title')}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-zinc-400">
              {t('unlock.entry_desc')}
            </p>
          </>
        ) : (
          <>
            <h3 className="mb-2 font-display text-base font-bold text-white">
              {t('unlock.title')}
            </h3>
            <p className="mb-4 text-sm text-zinc-500">
              {t('unlock.desc')}
            </p>
          </>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t('unlock.placeholder')}
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-accent-blue/50"
            autoFocus
          />
          <button
            type="submit"
            className={`rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors ${error ? 'bg-red-500/80' : 'bg-accent-blue/80 hover:bg-accent-blue'}`}
          >
            {error ? '...' : 'OK'}
          </button>
        </form>

        {entry && (
          <button
            onClick={onClose}
            className="mt-4 w-full rounded-lg border border-zinc-800 py-2 text-center text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
          >
            {t('unlock.skip')}
          </button>
        )}
      </motion.div>
    </div>
  )
}

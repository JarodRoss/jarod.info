import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, KeyRound } from 'lucide-react'
import { unlock } from '@/lib/censor'

export default function UnlockModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 mx-4 w-full max-w-xs rounded-2xl border border-zinc-800 bg-zinc-900/95 p-6"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <X size={16} />
        </button>

        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-800/60">
          <KeyRound size={18} className="text-accent-blue" />
        </div>

        <h3 className="mb-1 font-display text-sm font-bold text-white">Mode confidentiel</h3>
        <p className="mb-4 text-xs text-zinc-500">Entrez le code pour afficher le contenu complet.</p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code d'accès"
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-accent-blue/50"
            autoFocus
          />
          <button
            type="submit"
            className={`rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors ${error ? 'bg-red-500/80' : 'bg-accent-blue/80 hover:bg-accent-blue'}`}
          >
            {error ? '...' : 'OK'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

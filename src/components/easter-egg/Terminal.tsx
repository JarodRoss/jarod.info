import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface TerminalProps {
  open: boolean
  onClose: () => void
}

export default function Terminal({ open, onClose }: TerminalProps) {
  const { t } = useTranslation()
  const [history, setHistory] = useState<string[]>([t('terminal.welcome')])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const newHistory = [...history, `> ${cmd}`]

    switch (trimmed) {
      case 'help':
        newHistory.push(t('terminal.help'))
        break
      case 'whoami':
        newHistory.push(t('terminal.whoami'))
        break
      case 'ls':
        newHistory.push(t('terminal.ls'))
        break
      case 'cat about.txt':
        newHistory.push(t('terminal.cat_about'))
        break
      case 'ping jarod.info':
        newHistory.push(t('terminal.ping'))
        break
      case 'music':
        newHistory.push(t('terminal.music'))
        break
      case 'stack':
        newHistory.push(t('terminal.stack'))
        break
      case 'secret':
        newHistory.push(t('terminal.secret'))
        break
      case 'exit':
        newHistory.push(t('terminal.exit'))
        setTimeout(onClose, 800)
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      default:
        newHistory.push(`${trimmed}: ${t('terminal.not_found')}`)
    }

    setHistory(newHistory)
    setInput('')
  }

  if (!open) return null

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-2xl rounded-xl border border-zinc-700 bg-zinc-950 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-zinc-500">jarod@portfolio:~</span>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="h-[400px] overflow-y-auto p-4 font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap text-green-400">
              {line}
            </div>
          ))}
          <div className="flex items-center">
            <span className="mr-2 text-accent-blue">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim()) {
                  processCommand(input)
                }
              }}
              className="flex-1 bg-transparent text-green-400 outline-none"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

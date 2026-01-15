import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Tool } from '@/data/tools'

interface TerminalProps {
  open: boolean
  onClose: () => void
  pendingInstall?: Tool | null
  onInstallDone?: () => void
}

const wait = (ms: number) => new Promise(r => setTimeout(r, ms))

export default function Terminal({ open, onClose, pendingInstall, onInstallDone }: TerminalProps) {
  const { t } = useTranslation()
  const [lines, setLines] = useState<string[]>([t('terminal.welcome')])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [lines])

  // pacman install animation
  const pacmanInstall = async (tool: Tool) => {
    setBusy(true)
    setLines([t('terminal.welcome')]) // clear but keep neofetch header

    const add = (line: string) => setLines(h => [...h, line])

    add(`[jarod@arch ~]$ sudo pacman -S ${tool.pkg}`)
    await wait(300)

    add('resolving dependencies...')
    await wait(400)
    add('looking for conflicting packages...')
    await wait(300)
    add('')
    add(`Packages (1) ${tool.pkg}-${tool.version}`)
    await wait(200)
    add('')
    add(`Total Download Size:   ${tool.size}`)
    add(`Total Installed Size:  ${tool.size}`)
    await wait(300)
    add('')
    add(':: Proceed with installation? [Y/n] Y')
    await wait(500)
    add(':: Retrieving packages...')
    await wait(200)

    // progress bar
    for (let i = 1; i <= 25; i++) {
      const pct = Math.round((i / 25) * 100)
      const bar = '#'.repeat(i) + '-'.repeat(25 - i)
      const line = ` ${tool.pkg}-${tool.version}  [${bar}] ${pct}%`
      setLines(h => {
        const copy = [...h]
        if (copy.length > 0 && copy[copy.length - 1].includes('[') && copy[copy.length - 1].includes(tool.pkg)) {
          copy[copy.length - 1] = line
        } else {
          copy.push(line)
        }
        return copy
      })
      await wait(30 + Math.random() * 80)
    }

    await wait(200)
    add('checking keyring...')
    await wait(150)
    add('checking package integrity...')
    await wait(200)
    add('loading package files...')
    await wait(150)
    add('checking for file conflicts...')
    await wait(200)
    add('checking available disk space...')
    await wait(150)
    add('')
    add(':: Processing package changes...')
    await wait(300)

    for (const dep of tool.deps) {
      add(`installing ${dep}...`)
      await wait(100 + Math.random() * 200)
    }

    add(`installing ${tool.pkg}...`)
    await wait(400)
    add('')
    add(`Optional dependencies for ${tool.pkg}`)
    add('    bash-completion: for bash completion')
    await wait(200)
    add('')
    add(':: Running post-transaction hooks...')
    await wait(200)
    add('(1/3) Arming ConditionNeedsUpdate...')
    await wait(150)
    add('(2/3) Updating icon theme caches...')
    await wait(150)
    add('(3/3) Updating the desktop file MIME type cache...')
    await wait(300)
    add('')
    add(`✓ ${tool.pkg}-${tool.version} installed successfully`)
    add(`  ${tool.desc}`)
    add('')

    setBusy(false)
    onInstallDone?.()
  }

  // launch install when a tool is pending
  useEffect(() => {
    if (pendingInstall && open && !busy) {
      pacmanInstall(pendingInstall)
    }
  }, [pendingInstall, open])

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const newLines = [...lines, `[jarod@arch ~]$ ${cmd}`]

    switch (trimmed) {
      case 'help':
        newLines.push(t('terminal.help'))
        break
      case 'whoami':
        newLines.push(t('terminal.whoami'))
        break
      case 'ls':
        newLines.push(t('terminal.ls'))
        break
      case 'cat about.txt':
        newLines.push(t('terminal.cat_about'))
        break
      case 'ping jarod.info':
        newLines.push(t('terminal.ping'))
        break
      case 'music':
        newLines.push(t('terminal.music'))
        break
      case 'stack':
        newLines.push(t('terminal.stack'))
        break
      case 'neofetch':
        newLines.push(t('terminal.welcome'))
        break
      case 'secret':
        newLines.push(t('terminal.secret'))
        break
      case 'exit':
        newLines.push(t('terminal.exit'))
        setTimeout(onClose, 800)
        break
      case 'clear':
        setLines([])
        setInput('')
        return
      default:
        newLines.push(`${trimmed}: ${t('terminal.not_found')}`)
    }

    setLines(newLines)
    setInput('')
  }

  if (!open) return null

  // color a line based on its content
  const colorLine = (line: string) => {
    if (line.includes('✓')) return <span><span className="text-green-500">✓</span>{line.slice(1)}</span>
    if (line.startsWith('::')) return <span className="text-accent-blue font-bold">{line}</span>
    if (line.startsWith('resolving') || line.startsWith('looking') || line.startsWith('checking') || line.startsWith('loading')) return <span className="text-zinc-500">{line}</span>
    if (line.startsWith('installing')) return <span className="text-yellow-400">{line}</span>
    if (line.includes('[#') || line.includes('[-')) return <span className="text-cyan-400">{line}</span>
    if (line.startsWith('[jarod@arch')) return <span><span className="text-accent-blue">[jarod@arch ~]$</span>{line.replace('[jarod@arch ~]$', '')}</span>
    return line
  }

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-3xl rounded-xl border border-zinc-700 bg-zinc-950 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <span className="font-mono text-xs text-accent-blue">jarod@arch</span>
          <span className="text-xs text-zinc-500">~</span>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="h-[500px] overflow-y-auto overflow-x-auto p-4 pt-6 font-mono text-xs"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre text-green-400">
              {colorLine(line)}
            </div>
          ))}

          {!busy && (
            <div className="mt-3 flex items-center">
              <span className="mr-2 text-accent-blue">[jarod@arch ~]$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && input.trim()) runCommand(input)
                }}
                className="flex-1 bg-transparent text-green-400 outline-none"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

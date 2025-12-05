import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Command } from 'cmdk'
import {
  Home, User, FolderKanban, Briefcase, GraduationCap, BookOpen, Mail,
  Sun, Moon, Languages, TerminalSquare, Search,
} from 'lucide-react'
import { navItems } from '@/data/navigation'
import { useLenis } from '@/components/layout/SmoothScroll'

const navIcons: Record<string, React.ElementType> = {
  '/': Home,
  '/about': User,
  '/projects': FolderKanban,
  '/experience': Briefcase,
  '/academics': GraduationCap,
  '/thesis': BookOpen,
  '/contact': Mail,
}

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenTerminal: () => void
}

export default function CommandMenu({ open, onOpenChange, onOpenTerminal }: CommandMenuProps) {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!open) {
      lenis?.enable()
      return
    }

    setTimeout(() => inputRef.current?.focus(), 50)
    lenis?.disable()

    const listEl = () => overlayRef.current?.querySelector('[cmdk-list]') as HTMLElement | null

    const hijackWheel = (e: WheelEvent) => {
      e.stopImmediatePropagation()
      e.preventDefault()
      const list = listEl()
      if (list) {
        list.scrollTop += e.deltaY
      }
    }

    window.addEventListener('wheel', hijackWheel, { passive: false, capture: true })

    return () => {
      window.removeEventListener('wheel', hijackWheel, { capture: true })
      lenis?.enable()
    }
  }, [open, lenis])

  const runAction = (fn: () => void) => {
    fn()
    onOpenChange(false)
  }

  const isDark = document.documentElement.classList.contains('dark')

  return (
    <AnimatePresence>
      {open && (
        <div ref={overlayRef} className="fixed inset-0 z-[80]">
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            className="fixed left-1/2 top-[18%] w-full max-w-[560px] -translate-x-1/2 px-4"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
          >
            <Command
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/95 shadow-2xl shadow-black/40"
              label="Command menu"
            >
              <div className="flex items-center gap-3 border-b border-zinc-800 px-4">
                <Search size={16} className="shrink-0 text-zinc-500" />
                <Command.Input
                  ref={inputRef}
                  placeholder={t('command_menu.placeholder')}
                  className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-zinc-500"
                />
                <kbd className="shrink-0 rounded-md border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[320px] overflow-y-auto overscroll-contain p-2">
                <Command.Empty className="px-4 py-8 text-center text-sm text-zinc-500">
                  Aucun résultat.
                </Command.Empty>
                <Command.Group
                  heading={t('command_menu.navigation')}
                  className="mb-1 px-1 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500"
                >
                  {navItems.map((item) => {
                    const Icon = navIcons[item.path] || Home
                    return (
                      <Command.Item
                        key={item.path}
                        value={t(item.labelKey)}
                        onSelect={() => runAction(() => navigate(item.path))}
                        className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition-colors aria-selected:bg-zinc-800/70 aria-selected:text-white"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-800/50 transition-colors group-aria-selected:border-zinc-700 group-aria-selected:bg-zinc-700/60">
                          <Icon size={15} />
                        </div>
                        <span>{t(item.labelKey)}</span>
                      </Command.Item>
                    )
                  })}
                </Command.Group>

                <div className="mx-3 my-1.5 h-px bg-zinc-800/50" />

                <Command.Group
                  heading={t('command_menu.actions')}
                  className="mb-1 px-1 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500"
                >
                  <Command.Item
                    value={t('command_menu.toggle_theme')}
                    onSelect={() =>
                      runAction(() => {
                        const dark = document.documentElement.classList.contains('dark')
                        document.documentElement.classList.toggle('dark', !dark)
                        document.documentElement.classList.toggle('light', dark)
                        if (dark) {
                          document.body.style.backgroundColor = '#ffffff'
                          document.body.style.color = '#09090b'
                        } else {
                          document.body.style.backgroundColor = '#09090b'
                          document.body.style.color = '#fafafa'
                        }
                        localStorage.setItem('theme', dark ? 'light' : 'dark')
                      })
                    }
                    className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition-colors aria-selected:bg-zinc-800/70 aria-selected:text-white"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-800/50 transition-colors group-aria-selected:border-zinc-700 group-aria-selected:bg-zinc-700/60">
                      {isDark ? <Sun size={15} /> : <Moon size={15} />}
                    </div>
                    <span>{t('command_menu.toggle_theme')}</span>
                  </Command.Item>

                  <Command.Item
                    value={t('command_menu.toggle_lang')}
                    onSelect={() =>
                      runAction(() => {
                        const next = i18n.language === 'fr' ? 'en' : 'fr'
                        i18n.changeLanguage(next)
                        localStorage.setItem('lang', next)
                      })
                    }
                    className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition-colors aria-selected:bg-zinc-800/70 aria-selected:text-white"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-800/50 transition-colors group-aria-selected:border-zinc-700 group-aria-selected:bg-zinc-700/60">
                      <Languages size={15} />
                    </div>
                    <span>{t('command_menu.toggle_lang')}</span>
                  </Command.Item>

                  <Command.Item
                    value="terminal"
                    onSelect={() => runAction(onOpenTerminal)}
                    className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition-colors aria-selected:bg-zinc-800/70 aria-selected:text-white"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-800/50 transition-colors group-aria-selected:border-zinc-700 group-aria-selected:bg-zinc-700/60">
                      <TerminalSquare size={15} />
                    </div>
                    <span>{t('command_menu.open_terminal')}</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-2.5">
                <div className="flex items-center gap-3 text-[11px] text-zinc-600">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1 py-px text-[10px]">↑</kbd>
                    <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1 py-px text-[10px]">↓</kbd>
                    naviguer
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-px text-[10px]">↵</kbd>
                    ouvrir
                  </span>
                </div>
                <span className="text-[11px] text-zinc-600">
                  <kbd className="rounded border border-zinc-700/50 bg-zinc-800/50 px-1.5 py-px text-[10px]">Ctrl+K</kbd>
                </span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

import { useState, useEffect } from 'react'
import disableDevtool from 'disable-devtool'

const STORAGE_KEY = 'dt_blocked'

export default function DevToolsGuard({ children }: { children: React.ReactNode }) {
  const [devtoolsOpen, setDevtoolsOpen] = useState(() => !!sessionStorage.getItem(STORAGE_KEY))

  useEffect(() => {
    disableDevtool({
      ondevtoolopen: () => {
        sessionStorage.setItem(STORAGE_KEY, '1')
        setDevtoolsOpen(true)
      },
      ondevtoolclose: () => {
        sessionStorage.removeItem(STORAGE_KEY)
        setDevtoolsOpen(false)
      },
      disableMenu: true,
      clearLog: true,
      disableSelect: false,
      disableCopy: false,
      disableCut: false,
      disablePaste: false,
      interval: 500,
      url: '',
    })
  }, [])

  if (devtoolsOpen) {
    return <DevToolsScreen onRetry={() => {
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        setDevtoolsOpen(false)
      }
    }} />
  }

  return <>{children}</>
}

const texts = {
  fr: {
    restricted: 'Acc\u00e8s restreint',
    title: 'Dev Tools',
    detected: 'd\u00e9tect\u00e9',
    desc1: 'Curieux de savoir comment ce site a \u00e9t\u00e9 construit\u00a0?',
    desc2: 'Contactez-moi pour en discuter.',
    home: "Retour \u00e0 l'accueil",
    contact: 'Me contacter',
  },
  en: {
    restricted: 'Access Restricted',
    title: 'Dev Tools',
    detected: 'detected',
    desc1: 'Curious about how this was built?',
    desc2: "Let's connect and chat about it.",
    home: 'Return Home',
    contact: 'Get in Touch',
  },
}

function DevToolsScreen({ onRetry }: { onRetry: () => void }) {
  const lang = (localStorage.getItem('lang') || 'fr') as keyof typeof texts
  const t = texts[lang] || texts.fr
  const [shake, setShake] = useState(false)

  const tryNavigate = (url: string) => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      window.location.href = url
    } else {
      onRetry()
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center overflow-hidden"
      style={{ background: '#09090b', fontFamily: "'Poppins', system-ui, sans-serif" }}
    >
      <div className="orb orb-blue absolute -top-32 -left-32 h-[400px] w-[400px]" />
      <div className="orb orb-purple absolute -right-32 bottom-1/4 h-[350px] w-[350px]" />
      <div className="dot-grid absolute inset-0 opacity-30" />

      <div
        className={`relative z-10 w-full max-w-[420px] mx-5 rounded-3xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl p-12${shake ? ' devtools-shake' : ''}`}
        style={{ animation: 'devtools-fadein 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        <style>{`
          @keyframes devtools-fadein {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes devtools-shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-5px); }
            80% { transform: translateX(5px); }
          }
          .devtools-shake { animation: devtools-shake 0.5s ease-in-out !important; }
        `}</style>

        <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#icon-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="icon-grad" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#2e9bfb" />
                <stop offset="100%" stopColor="#CE42FF" />
              </linearGradient>
            </defs>
            <path d="M12 2v10l6 6" />
            <circle cx="12" cy="12" r="2" fill="url(#icon-grad)" stroke="none" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>

        <div className="mb-8 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {t.restricted}
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white">
            {t.title}{' '}
            <span className="gradient-text font-light italic">{t.detected}</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            {t.desc1}<br />
            {t.desc2}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => tryNavigate(window.location.origin)}
            className="group flex w-full items-center justify-center gap-2.5 rounded-full py-4 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #2e9bfb, #CE42FF)', color: '#fff' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {t.home}
          </button>

          <button
            onClick={() => tryNavigate(window.location.origin + '/contact')}
            className="flex w-full items-center justify-center gap-2.5 rounded-full border border-zinc-800 py-4 text-sm font-medium text-zinc-400 transition-all hover:border-zinc-600 hover:bg-zinc-800/30 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {t.contact}
          </button>
        </div>

        <div className="gradient-line my-8" />

        <p className="text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Jarod<span className="italic text-zinc-700"> Ross</span>
        </p>
      </div>
    </div>
  )
}

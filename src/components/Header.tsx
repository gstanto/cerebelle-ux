import { Sparkles } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between px-5 pt-5 pb-3">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-punk to-punk-deep shadow-punk-glow grid place-items-center">
            <span className="text-[11px] font-bold tracking-tighter text-white">c</span>
          </div>
        </div>
        <div className="leading-tight">
          <div className="text-[15px] font-semibold tracking-tight">cerebelle</div>
          <div className="text-[10.5px] uppercase tracking-[0.22em] text-fog-dim">second brain</div>
        </div>
      </div>
      <button
        aria-label="Ambient status"
        className="flex items-center gap-1.5 rounded-full border border-ink-3 bg-ink-1/60 px-2.5 py-1 text-[11px] text-fog-muted backdrop-blur hover:border-punk/40 hover:text-fog transition"
      >
        <Sparkles size={12} className="text-punk" />
        <span className="font-mono">quiet mode</span>
      </button>
    </header>
  )
}

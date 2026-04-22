import clsx from 'clsx'
import { CalendarCheck, CircleDot, Inbox, Send, Sparkles, Target } from 'lucide-react'
import { useStore } from '../store'
import type { TabId } from '../types'

const TABS: {
  id: TabId
  label: string
  icon: typeof Inbox
  count?: (s: ReturnType<typeof useStore.getState>) => number
}[] = [
  { id: 'today', label: 'Today', icon: CalendarCheck, count: (s) => s.loops.filter((l) => l.today && l.status !== 'done').length },
  { id: 'loops', label: 'Open loops', icon: CircleDot, count: (s) => s.loops.filter((l) => l.status !== 'done').length },
  { id: 'priority', label: 'Priority', icon: Target },
  { id: 'inbox', label: 'Inbox', icon: Inbox, count: (s) => s.inbox.filter((i) => i.signal !== 'noise').length },
  { id: 'delegated', label: 'Delegated', icon: Send, count: (s) => s.delegated.length },
]

export function Sidebar() {
  const active = useStore((s) => s.activeTab)
  const setActive = useStore((s) => s.setActiveTab)
  const state = useStore()

  return (
    <aside className="shrink-0 w-[68px] sm:w-[200px] border-r border-ink-3 bg-ink-0/60 flex flex-col">
      {/* Brand */}
      <div className="px-3 sm:px-4 pt-5 pb-6 flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-punk to-punk-deep shadow-punk-glow grid place-items-center shrink-0">
          <span className="text-[12px] font-bold tracking-tighter text-white">c</span>
        </div>
        <div className="hidden sm:block leading-tight">
          <div className="text-[15px] font-semibold tracking-tight">cerebelle</div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-fog-dim">second brain</div>
        </div>
      </div>

      {/* Tabs */}
      <nav className="flex-1 px-2 flex flex-col gap-1">
        {TABS.map((t) => {
          const isActive = active === t.id
          const count = t.count?.(state)
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              aria-label={t.label}
              className={clsx(
                'group relative flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-[13px] transition',
                isActive
                  ? 'bg-punk/10 text-fog'
                  : 'text-fog-muted hover:text-fog hover:bg-ink-1',
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-punk shadow-punk-glow" />
              )}
              <Icon
                size={17}
                className={clsx('shrink-0 transition', isActive ? 'text-punk' : 'text-fog-muted group-hover:text-fog')}
              />
              <span className="hidden sm:block flex-1 text-left font-medium tracking-tight truncate">
                {t.label}
              </span>
              {typeof count === 'number' && (
                <span
                  className={clsx(
                    'hidden sm:inline-flex shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-mono',
                    isActive ? 'bg-punk/20 text-punk' : 'bg-ink-3 text-fog-dim',
                  )}
                >
                  {count}
                </span>
              )}
              {/* Compact badge on small screens */}
              {typeof count === 'number' && count > 0 && (
                <span
                  className={clsx(
                    'sm:hidden absolute top-1 right-1 h-1.5 w-1.5 rounded-full',
                    isActive ? 'bg-punk shadow-punk-glow' : 'bg-fog-dim',
                  )}
                />
              )}
            </button>
          )
        })}
      </nav>

      {/* Quiet mode footer */}
      <div className="p-2">
        <button
          aria-label="Ambient status"
          className="w-full flex items-center gap-2 rounded-lg border border-ink-3 bg-ink-1/60 px-2.5 py-2 text-[11px] text-fog-muted hover:border-punk/40 hover:text-fog transition"
        >
          <Sparkles size={13} className="text-punk shrink-0" />
          <span className="hidden sm:inline font-mono">quiet mode</span>
        </button>
      </div>
    </aside>
  )
}

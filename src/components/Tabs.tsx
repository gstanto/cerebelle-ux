import clsx from 'clsx'
import { useStore } from '../store'
import type { TabId } from '../types'

const TABS: { id: TabId; label: string; count?: (s: ReturnType<typeof useStore.getState>) => number }[] = [
  { id: 'today', label: 'Today', count: (s) => s.loops.filter((l) => l.today && l.status !== 'done').length },
  { id: 'loops', label: 'Open loops', count: (s) => s.loops.filter((l) => l.status !== 'done').length },
  { id: 'priority', label: 'Priority' },
  { id: 'inbox', label: 'Inbox', count: (s) => s.inbox.filter((i) => i.signal !== 'noise').length },
  { id: 'delegated', label: 'Delegated', count: (s) => s.delegated.length },
]

export function Tabs() {
  const active = useStore((s) => s.activeTab)
  const setActive = useStore((s) => s.setActiveTab)
  const state = useStore()

  return (
    <div className="px-2 border-b border-ink-3">
      <div className="flex gap-1 overflow-x-auto no-scrollbar">
        {TABS.map((t) => {
          const isActive = active === t.id
          const count = t.count?.(state)
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={clsx(
                'relative px-3.5 py-2.5 text-[13px] whitespace-nowrap transition',
                isActive ? 'text-fog' : 'text-fog-muted hover:text-fog',
              )}
            >
              <span className="font-medium tracking-tight">{t.label}</span>
              {typeof count === 'number' && (
                <span
                  className={clsx(
                    'ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-mono',
                    isActive ? 'bg-punk/15 text-punk' : 'bg-ink-3 text-fog-dim',
                  )}
                >
                  {count}
                </span>
              )}
              {isActive && (
                <span className="absolute left-2 right-2 -bottom-px h-0.5 rounded-full bg-punk shadow-punk-glow" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

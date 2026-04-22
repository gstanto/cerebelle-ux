import clsx from 'clsx'
import { ArrowRight, Archive } from 'lucide-react'
import { useStore } from '../store'
import type { InboxItem } from '../types'
import { relTime } from '../lib/format'
import { SourceIcon } from './SourceIcon'

export function InboxItemRow({ item }: { item: InboxItem }) {
  const archive = useStore((s) => s.archiveInbox)
  const promote = useStore((s) => s.promoteInboxToLoop)

  const signalColor =
    item.signal === 'high'
      ? 'bg-punk shadow-punk-glow'
      : item.signal === 'medium'
        ? 'bg-amber-300/80'
        : 'bg-ink-4'

  return (
    <div
      className={clsx(
        'group flex gap-3 px-4 py-3.5 border-b border-ink-2/80 transition',
        item.signal === 'noise' ? 'opacity-55 hover:opacity-80' : 'hover:bg-ink-1/50',
      )}
    >
      <div className="mt-1.5 shrink-0">
        <span className={clsx('block h-1.5 w-1.5 rounded-full', signalColor)} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-[12px] text-fog-muted">
          <span className="inline-flex items-center gap-1 font-mono">
            <SourceIcon source={item.source} />
            <span>{item.source}</span>
          </span>
          <span className="opacity-40">·</span>
          <span className="truncate text-fog">{item.from}</span>
          <span className="opacity-40">·</span>
          <span className="font-mono text-[10.5px] opacity-70">{relTime(item.receivedAt)}</span>
          {item.thread && (
            <>
              <span className="opacity-40">·</span>
              <span className="font-mono text-[10.5px] opacity-70">{item.thread} msgs</span>
            </>
          )}
        </div>
        <div className="mt-1 text-[14px] leading-snug line-clamp-2">{item.preview}</div>
      </div>

      <div className="shrink-0 flex items-start gap-1 opacity-0 group-hover:opacity-100 transition">
        {item.actionable && (
          <button
            onClick={() => promote(item.id)}
            aria-label="Make a loop"
            className="h-8 w-8 grid place-items-center rounded-lg text-fog-muted hover:text-punk hover:bg-ink-2"
          >
            <ArrowRight size={15} />
          </button>
        )}
        <button
          onClick={() => archive(item.id)}
          aria-label="Archive"
          className="h-8 w-8 grid place-items-center rounded-lg text-fog-muted hover:text-fog hover:bg-ink-2"
        >
          <Archive size={15} />
        </button>
      </div>
    </div>
  )
}

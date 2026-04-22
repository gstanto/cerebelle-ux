import clsx from 'clsx'
import { Check, Clock, Flame, Leaf, Moon, Pin, PinOff, Waves } from 'lucide-react'
import { useStore } from '../store'
import type { Loop } from '../types'
import { dueLabel, relTime } from '../lib/format'
import { SourceIcon } from './SourceIcon'

function EnergyGlyph({ energy }: { energy: Loop['energy'] }) {
  if (energy === 'deep') return <Waves size={11} />
  if (energy === 'admin') return <Leaf size={11} />
  return <Moon size={11} />
}

export function LoopItem({ loop, showPin = true }: { loop: Loop; showPin?: boolean }) {
  const toggleDone = useStore((s) => s.toggleLoopDone)
  const toggleToday = useStore((s) => s.toggleToday)

  const isDone = loop.status === 'done'
  const isNow = loop.priority === 'now' && !isDone
  const overdue = loop.dueAt && loop.dueAt < Date.now() && !isDone

  return (
    <div
      className={clsx(
        'group relative flex gap-3 px-4 py-3.5 border-b border-ink-2/80 transition',
        isDone ? 'opacity-45' : 'hover:bg-ink-1/50',
      )}
    >
      <button
        onClick={() => toggleDone(loop.id)}
        aria-label={isDone ? 'Mark open' : 'Mark done'}
        className={clsx(
          'mt-0.5 shrink-0 h-5 w-5 rounded-full border transition grid place-items-center',
          isDone
            ? 'bg-punk border-punk text-white'
            : isNow
              ? 'border-punk/70 hover:bg-punk/20'
              : 'border-ink-4 hover:border-punk/60',
        )}
      >
        {isDone && <Check size={12} strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <div className={clsx('flex-1 text-[14.5px] leading-snug', isDone && 'line-through')}>
            {loop.title}
          </div>
          {showPin && (
            <button
              onClick={() => toggleToday(loop.id)}
              aria-label={loop.today ? 'Unpin from today' : 'Pin to today'}
              className={clsx(
                'shrink-0 opacity-0 group-hover:opacity-100 transition p-1 rounded-md',
                loop.today && 'opacity-100 text-punk',
              )}
            >
              {loop.today ? <Pin size={13} /> : <PinOff size={13} />}
            </button>
          )}
        </div>

        {loop.note && (
          <div className="mt-1 text-[12.5px] text-fog-muted leading-relaxed line-clamp-2">
            {loop.note}
          </div>
        )}

        <div className="mt-2 flex items-center flex-wrap gap-x-3 gap-y-1 text-[10.5px] font-mono text-fog-dim">
          <span className="inline-flex items-center gap-1">
            <SourceIcon source={loop.source} />
            <span>{loop.source}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <EnergyGlyph energy={loop.energy} />
            <span>{loop.energy}</span>
          </span>
          {isNow && (
            <span className="inline-flex items-center gap-1 text-punk">
              <Flame size={11} />
              <span>now</span>
            </span>
          )}
          {loop.dueAt && (
            <span className={clsx('inline-flex items-center gap-1', overdue && 'text-punk')}>
              <Clock size={11} />
              <span>{dueLabel(loop.dueAt)}</span>
            </span>
          )}
          {loop.blockedBy && (
            <span className="inline-flex items-center gap-1 text-amber-300/80">
              <span className="h-1 w-1 rounded-full bg-amber-300/80" />
              <span>waiting · {loop.blockedBy}</span>
            </span>
          )}
          <span className="opacity-60">· {relTime(loop.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

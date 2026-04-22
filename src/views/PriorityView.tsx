import { useState } from 'react'
import clsx from 'clsx'
import { useStore } from '../store'
import { LoopItem } from '../components/LoopItem'
import { SectionHeader } from '../components/SectionHeader'
import type { Loop } from '../types'

type Lens = 'impact' | 'energy' | 'staleness'

const LENS_COPY: Record<Lens, { title: string; hint: string }> = {
  impact: { title: 'By impact', hint: 'what moves the needle most' },
  energy: { title: 'By energy', hint: 'match what your brain can give' },
  staleness: { title: 'By staleness', hint: 'the longer it sits, the more it drags' },
}

export function PriorityView() {
  const loops = useStore((s) => s.loops).filter((l) => l.status !== 'done')
  const [lens, setLens] = useState<Lens>('impact')

  let sections: { title: string; items: Loop[]; subtitle?: string }[] = []

  if (lens === 'impact') {
    sections = [
      { title: 'High impact', items: loops.filter((l) => l.impact === 3) },
      { title: 'Medium impact', items: loops.filter((l) => l.impact === 2) },
      { title: 'Low impact', items: loops.filter((l) => l.impact === 1) },
    ]
  } else if (lens === 'energy') {
    sections = [
      { title: 'Deep work', items: loops.filter((l) => l.energy === 'deep'), subtitle: 'quiet, uninterrupted' },
      { title: 'Shallow', items: loops.filter((l) => l.energy === 'shallow'), subtitle: 'lighter lift' },
      { title: 'Admin', items: loops.filter((l) => l.energy === 'admin'), subtitle: 'batch these when tired' },
    ]
  } else {
    const sorted = [...loops].sort((a, b) => a.createdAt - b.createdAt)
    const week = 7 * 86_400_000
    sections = [
      { title: 'Aging (>1 week)', items: sorted.filter((l) => Date.now() - l.createdAt > week) },
      { title: 'Recent', items: sorted.filter((l) => Date.now() - l.createdAt <= week) },
    ]
  }

  return (
    <div className="pb-32">
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-[22px] font-semibold tracking-tight">Priority</h1>
        <p className="mt-1 text-[13px] text-fog-muted">{LENS_COPY[lens].hint}</p>
      </div>

      <div className="px-4 flex gap-1.5 mb-2">
        {(Object.keys(LENS_COPY) as Lens[]).map((l) => (
          <button
            key={l}
            onClick={() => setLens(l)}
            className={clsx(
              'px-3 py-1.5 rounded-full text-[12px] font-medium transition border',
              lens === l
                ? 'border-punk/60 bg-punk/10 text-punk'
                : 'border-ink-3 text-fog-muted hover:text-fog hover:border-ink-4',
            )}
          >
            {LENS_COPY[l].title}
          </button>
        ))}
      </div>

      {sections.map((s) =>
        s.items.length > 0 ? (
          <section key={s.title}>
            <SectionHeader title={s.title} count={s.items.length} subtitle={s.subtitle} />
            {s.items.map((l) => <LoopItem key={l.id} loop={l} />)}
          </section>
        ) : null,
      )}
    </div>
  )
}

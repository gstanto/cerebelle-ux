import { useStore } from '../store'
import { LoopItem } from '../components/LoopItem'
import { SectionHeader } from '../components/SectionHeader'
import type { Loop } from '../types'

function groupByStatus(loops: Loop[]) {
  return {
    in_progress: loops.filter((l) => l.status === 'in_progress'),
    open: loops.filter((l) => l.status === 'open'),
    waiting: loops.filter((l) => l.status === 'waiting'),
    done: loops.filter((l) => l.status === 'done'),
  }
}

export function LoopsView() {
  const loops = useStore((s) => s.loops)
  const groups = groupByStatus(loops)

  return (
    <div className="pb-32">
      <div className="px-5 pt-5 pb-2">
        <h1 className="text-[22px] font-semibold tracking-tight">Open loops</h1>
        <p className="mt-1 text-[13px] text-fog-muted">
          Everything unfinished — parked, in motion, or waiting on someone.
        </p>
      </div>

      {groups.in_progress.length > 0 && (
        <section>
          <SectionHeader title="In motion" count={groups.in_progress.length} />
          {groups.in_progress.map((l) => <LoopItem key={l.id} loop={l} />)}
        </section>
      )}

      {groups.open.length > 0 && (
        <section>
          <SectionHeader title="Open" count={groups.open.length} />
          {groups.open.map((l) => <LoopItem key={l.id} loop={l} />)}
        </section>
      )}

      {groups.waiting.length > 0 && (
        <section>
          <SectionHeader title="Waiting" count={groups.waiting.length} subtitle="blocked by someone else" />
          {groups.waiting.map((l) => <LoopItem key={l.id} loop={l} />)}
        </section>
      )}

      {groups.done.length > 0 && (
        <section>
          <SectionHeader title="Recently closed" count={groups.done.length} />
          {groups.done.map((l) => <LoopItem key={l.id} loop={l} />)}
        </section>
      )}
    </div>
  )
}

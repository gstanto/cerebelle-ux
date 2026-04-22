import { useStore } from '../store'
import { LoopItem } from '../components/LoopItem'
import { InboxItemRow } from '../components/InboxItemRow'
import { SectionHeader } from '../components/SectionHeader'

export function TodayView() {
  const loops = useStore((s) => s.loops)
  const inbox = useStore((s) => s.inbox)

  const today = loops.filter((l) => l.today)
  const openToday = today.filter((l) => l.status !== 'done')
  const doneToday = today.filter((l) => l.status === 'done')
  const signals = inbox.filter((i) => i.signal === 'high').slice(0, 3)
  const noiseCount = inbox.filter((i) => i.signal === 'noise').length

  const hour = new Date().getHours()
  const greeting = hour < 5 ? 'still up?' : hour < 12 ? 'good morning' : hour < 17 ? 'afternoon' : hour < 21 ? 'evening' : 'late night'

  return (
    <div className="pb-32">
      <div className="px-5 pt-5 pb-2">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-fog-dim">{greeting}</div>
        <h1 className="mt-1 text-[28px] font-semibold tracking-tight leading-tight">
          {openToday.length === 0
            ? 'Your today is clear.'
            : openToday.length === 1
              ? 'One thing for today.'
              : `${openToday.length} loops for today.`}
        </h1>
        <p className="mt-1 text-[13.5px] text-fog-muted max-w-[32rem]">
          The noise is handled. What follows is what you actually chose.
        </p>
      </div>

      {openToday.length > 0 && (
        <section className="mt-3">
          <SectionHeader title="Focus" count={openToday.length} />
          <div>
            {openToday.map((l) => (
              <LoopItem key={l.id} loop={l} />
            ))}
          </div>
        </section>
      )}

      {signals.length > 0 && (
        <section className="mt-4">
          <SectionHeader
            title="Worth a glance"
            subtitle={noiseCount > 0 ? `${noiseCount} noise items hidden` : undefined}
            count={signals.length}
          />
          <div>
            {signals.map((i) => (
              <InboxItemRow key={i.id} item={i} />
            ))}
          </div>
        </section>
      )}

      {doneToday.length > 0 && (
        <section className="mt-4">
          <SectionHeader title="Closed" count={doneToday.length} />
          <div>
            {doneToday.map((l) => (
              <LoopItem key={l.id} loop={l} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

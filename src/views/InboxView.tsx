import { useState } from 'react'
import clsx from 'clsx'
import { useStore } from '../store'
import { InboxItemRow } from '../components/InboxItemRow'
import { SectionHeader } from '../components/SectionHeader'

type Filter = 'signal' | 'all' | 'noise'

export function InboxView() {
  const inbox = useStore((s) => s.inbox)
  const [filter, setFilter] = useState<Filter>('signal')

  const high = inbox.filter((i) => i.signal === 'high')
  const medium = inbox.filter((i) => i.signal === 'medium')
  const noise = inbox.filter((i) => i.signal === 'noise')

  return (
    <div className="pb-32">
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-[22px] font-semibold tracking-tight">Inbox</h1>
        <p className="mt-1 text-[13px] text-fog-muted">
          Email, Slack, calendar — triaged for you. Promote what matters, archive the rest.
        </p>
      </div>

      <div className="px-4 flex gap-1.5 mb-2">
        {([
          ['signal', 'Signal'],
          ['all', 'All'],
          ['noise', `Noise · ${noise.length}`],
        ] as [Filter, string][]).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={clsx(
              'px-3 py-1.5 rounded-full text-[12px] font-medium transition border',
              filter === id
                ? 'border-punk/60 bg-punk/10 text-punk'
                : 'border-ink-3 text-fog-muted hover:text-fog hover:border-ink-4',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {(filter === 'signal' || filter === 'all') && high.length > 0 && (
        <section>
          <SectionHeader title="High signal" count={high.length} subtitle="probably needs you" />
          {high.map((i) => <InboxItemRow key={i.id} item={i} />)}
        </section>
      )}

      {(filter === 'signal' || filter === 'all') && medium.length > 0 && (
        <section>
          <SectionHeader title="Maybe" count={medium.length} subtitle="quick decision" />
          {medium.map((i) => <InboxItemRow key={i.id} item={i} />)}
        </section>
      )}

      {(filter === 'noise' || filter === 'all') && noise.length > 0 && (
        <section>
          <SectionHeader title="Noise" count={noise.length} subtitle="muted unless you ask" />
          {noise.map((i) => <InboxItemRow key={i.id} item={i} />)}
        </section>
      )}
    </div>
  )
}

import clsx from 'clsx'
import { Clock, CheckCircle2, Send, Hourglass } from 'lucide-react'
import { useStore } from '../store'
import { SectionHeader } from '../components/SectionHeader'
import type { DelegatedItem, DelegatedState } from '../types'
import { relTime } from '../lib/format'
import { SourceIcon } from '../components/SourceIcon'

const STATE_META: Record<DelegatedState, { label: string; icon: any; tone: string }> = {
  drafted: { label: 'draft ready for you', icon: Clock, tone: 'text-punk border-punk/40' },
  scheduled: { label: 'scheduled', icon: Send, tone: 'text-amber-300 border-amber-300/30' },
  awaiting_reply: { label: 'awaiting reply', icon: Hourglass, tone: 'text-sky-300 border-sky-300/30' },
  sent: { label: 'sent', icon: CheckCircle2, tone: 'text-emerald-300 border-emerald-300/30' },
}

function Row({ item }: { item: DelegatedItem }) {
  const meta = STATE_META[item.state]
  const Icon = meta.icon
  return (
    <div className="px-4 py-4 border-b border-ink-2/80 hover:bg-ink-1/50 transition">
      <div className="flex items-start gap-3">
        <div className={clsx('mt-0.5 shrink-0 h-7 w-7 rounded-lg border grid place-items-center bg-ink-1', meta.tone)}>
          <Icon size={13} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[14.5px] font-medium leading-snug">{item.title}</div>
            <span className={clsx('shrink-0 text-[10.5px] font-mono uppercase tracking-widest', meta.tone.split(' ')[0])}>
              {meta.label}
            </span>
          </div>
          <div className="mt-1 text-[12.5px] text-fog-muted leading-relaxed">{item.summary}</div>
          <div className="mt-2 flex items-center gap-3 text-[10.5px] font-mono text-fog-dim">
            <span className="inline-flex items-center gap-1">
              <SourceIcon source={item.source} />
              {item.source}
            </span>
            <span>→ {item.to}</span>
            <span className="opacity-60">· {relTime(item.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DelegatedView() {
  const items = useStore((s) => s.delegated)

  return (
    <div className="pb-32">
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-[22px] font-semibold tracking-tight">Delegated</h1>
        <p className="mt-1 text-[13px] text-fog-muted max-w-[32rem]">
          Things cerebelle is handling on your behalf. Review drafts, confirm sends, step away from the rest.
        </p>
      </div>

      <SectionHeader title="Needs your eyes" count={items.filter((i) => i.state === 'drafted').length} />
      {items.filter((i) => i.state === 'drafted').map((i) => <Row key={i.id} item={i} />)}

      <SectionHeader title="In flight" />
      {items.filter((i) => i.state !== 'drafted' && i.state !== 'sent').map((i) => <Row key={i.id} item={i} />)}

      <SectionHeader title="Done" />
      {items.filter((i) => i.state === 'sent').map((i) => <Row key={i.id} item={i} />)}
    </div>
  )
}

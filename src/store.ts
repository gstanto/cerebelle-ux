import { create } from 'zustand'
import type { DelegatedItem, InboxItem, Loop, TabId } from './types'
import { seedDelegated, seedInbox, seedLoops } from './fixtures'

interface CerebelleState {
  activeTab: TabId
  setActiveTab: (t: TabId) => void

  loops: Loop[]
  inbox: InboxItem[]
  delegated: DelegatedItem[]

  addLoop: (title: string, note?: string, viaVoice?: boolean) => void
  toggleLoopDone: (id: string) => void
  toggleToday: (id: string) => void
  archiveInbox: (id: string) => void
  promoteInboxToLoop: (id: string) => void
}

export const useStore = create<CerebelleState>((set) => ({
  activeTab: 'today',
  setActiveTab: (t) => set({ activeTab: t }),

  loops: seedLoops,
  inbox: seedInbox,
  delegated: seedDelegated,

  addLoop: (title, note, viaVoice) =>
    set((s) => ({
      loops: [
        {
          id: `l_${Date.now()}`,
          title: title.trim(),
          note: note?.trim() || undefined,
          status: 'open',
          priority: 'soon',
          energy: 'shallow',
          impact: 2,
          source: viaVoice ? 'voice' : 'capture',
          createdAt: Date.now(),
          today: true,
        },
        ...s.loops,
      ],
    })),

  toggleLoopDone: (id) =>
    set((s) => ({
      loops: s.loops.map((l) =>
        l.id === id ? { ...l, status: l.status === 'done' ? 'open' : 'done' } : l,
      ),
    })),

  toggleToday: (id) =>
    set((s) => ({
      loops: s.loops.map((l) => (l.id === id ? { ...l, today: !l.today } : l)),
    })),

  archiveInbox: (id) =>
    set((s) => ({ inbox: s.inbox.filter((i) => i.id !== id) })),

  promoteInboxToLoop: (id) =>
    set((s) => {
      const item = s.inbox.find((i) => i.id === id)
      if (!item) return s
      return {
        inbox: s.inbox.filter((i) => i.id !== id),
        loops: [
          {
            id: `l_${Date.now()}`,
            title: `${item.from}: ${item.preview.slice(0, 60)}${item.preview.length > 60 ? '…' : ''}`,
            status: 'open',
            priority: item.signal === 'high' ? 'now' : 'soon',
            energy: 'shallow',
            impact: item.signal === 'high' ? 3 : 2,
            source: item.source,
            createdAt: Date.now(),
            today: item.signal === 'high',
          },
          ...s.loops,
        ],
      }
    }),
}))

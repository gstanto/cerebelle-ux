export type LoopStatus = 'open' | 'in_progress' | 'waiting' | 'done'
export type Priority = 'now' | 'soon' | 'later'
export type Energy = 'deep' | 'shallow' | 'admin'
export type Source = 'capture' | 'voice' | 'email' | 'slack' | 'calendar' | 'notion'

export interface Loop {
  id: string
  title: string
  note?: string
  status: LoopStatus
  priority: Priority
  energy: Energy
  impact: 1 | 2 | 3 // 3 = highest
  source: Source
  createdAt: number
  dueAt?: number
  today?: boolean
  tags?: string[]
  blockedBy?: string // person or thing
}

export type InboxKind = 'mention' | 'dm' | 'email' | 'invite' | 'newsletter' | 'thread'

export interface InboxItem {
  id: string
  kind: InboxKind
  source: Source
  from: string
  preview: string
  receivedAt: number
  signal: 'high' | 'medium' | 'noise'
  actionable?: boolean
  thread?: number // count of messages
}

export type DelegatedState = 'drafted' | 'scheduled' | 'sent' | 'awaiting_reply'

export interface DelegatedItem {
  id: string
  title: string
  summary: string
  state: DelegatedState
  source: Source
  to: string
  updatedAt: number
}

export type TabId = 'today' | 'loops' | 'priority' | 'inbox' | 'delegated'

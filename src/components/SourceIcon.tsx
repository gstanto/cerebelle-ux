import { AtSign, Calendar, Hash, Mail, Mic, PenLine } from 'lucide-react'
import type { Source } from '../types'

export function SourceIcon({ source, size = 12 }: { source: Source; size?: number }) {
  switch (source) {
    case 'email':
      return <Mail size={size} />
    case 'slack':
      return <Hash size={size} />
    case 'calendar':
      return <Calendar size={size} />
    case 'notion':
      return <PenLine size={size} />
    case 'voice':
      return <Mic size={size} />
    case 'capture':
    default:
      return <AtSign size={size} />
  }
}

export function relTime(ts: number): string {
  const diff = Date.now() - ts
  const abs = Math.abs(diff)
  const mins = Math.round(abs / 60_000)
  const hours = Math.round(abs / 3_600_000)
  const days = Math.round(abs / 86_400_000)
  const sign = diff >= 0 ? '' : 'in '
  const suffix = diff >= 0 ? ' ago' : ''
  if (mins < 1) return 'just now'
  if (mins < 60) return `${sign}${mins}m${suffix}`
  if (hours < 24) return `${sign}${hours}h${suffix}`
  return `${sign}${days}d${suffix}`
}

export function dueLabel(ts: number): string {
  const diff = ts - Date.now()
  const abs = Math.abs(diff)
  const hours = Math.round(abs / 3_600_000)
  const days = Math.round(abs / 86_400_000)
  if (diff < 0) {
    if (hours < 24) return `overdue ${hours}h`
    return `overdue ${days}d`
  }
  if (hours < 24) return `due in ${hours}h`
  return `due in ${days}d`
}

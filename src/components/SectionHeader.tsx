export function SectionHeader({
  title,
  subtitle,
  count,
}: {
  title: string
  subtitle?: string
  count?: number
}) {
  return (
    <div className="flex items-baseline justify-between px-4 pt-5 pb-2">
      <div className="flex items-baseline gap-2">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fog-muted">
          {title}
        </h2>
        {typeof count === 'number' && (
          <span className="text-[10.5px] font-mono text-fog-dim">{count}</span>
        )}
      </div>
      {subtitle && (
        <div className="text-[10.5px] font-mono text-fog-dim">{subtitle}</div>
      )}
    </div>
  )
}

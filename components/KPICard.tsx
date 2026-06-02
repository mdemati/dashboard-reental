interface KPICardProps {
  title: string
  value: string
  subLabel?: string
  icon?: React.ReactNode
  highlight?: boolean
  loading?: boolean
}

export default function KPICard({
  title,
  value,
  subLabel,
  icon,
  highlight = false,
  loading = false,
}: KPICardProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="skeleton h-4 w-24 rounded" />
          <div className="skeleton h-8 w-8 rounded-lg" />
        </div>
        <div className="skeleton h-8 w-32 rounded mb-2" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    )
  }

  return (
    <div
      className={`rounded-2xl shadow-sm border p-5 transition-all hover:shadow-md ${
        highlight
          ? 'bg-brand-dark border-brand-gold text-white'
          : 'bg-white border-gray-100 text-gray-800'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <p
          className={`text-xs font-semibold uppercase tracking-wider ${
            highlight ? 'text-brand-light' : 'text-gray-500'
          }`}
        >
          {title}
        </p>
        {icon && (
          <span
            className={`text-xl flex items-center justify-center w-9 h-9 rounded-lg ${
              highlight ? 'bg-white/10 text-brand-gold' : 'bg-brand-light text-brand-gold'
            }`}
          >
            {icon}
          </span>
        )}
      </div>
      <p
        className={`text-3xl font-bold leading-none mb-1 ${
          highlight ? 'text-brand-gold' : 'text-brand-dark'
        }`}
      >
        {value}
      </p>
      {subLabel && (
        <p className={`text-xs mt-2 ${highlight ? 'text-gray-300' : 'text-gray-400'}`}>
          {subLabel}
        </p>
      )}
    </div>
  )
}

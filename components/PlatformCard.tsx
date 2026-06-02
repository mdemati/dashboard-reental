interface PlatformSummary {
  spend: number
  conversions: number
  cpa: number
  impressions: number
  clicks: number
  ctr: number
}

interface PlatformCardProps {
  platform: 'google' | 'meta'
  summary: PlatformSummary
  currency?: string
  error?: string
  loading?: boolean
}

const CURRENCY_SYMBOLS: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' }

function fmt(value: number, type: 'currency' | 'number' | 'percent', currency = 'EUR'): string {
  if (type === 'currency') {
    const sym = CURRENCY_SYMBOLS[currency] ?? currency + ' '
    return sym + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  if (type === 'percent') {
    return value.toFixed(2) + '%'
  }
  return value.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

export default function PlatformCard({ platform, summary, currency = 'EUR', error, loading }: PlatformCardProps) {
  const isGoogle = platform === 'google'
  const accentColor = isGoogle ? '#FCA311' : '#1877F2'
  const bgColor = isGoogle ? 'bg-amber-50' : 'bg-blue-50'
  const borderColor = isGoogle ? 'border-amber-200' : 'border-blue-200'
  const badgeStyle = isGoogle
    ? 'bg-brand-gold text-white'
    : 'bg-[#1877F2] text-white'

  const metrics = [
    { label: 'Gasto', value: fmt(summary?.spend ?? 0, 'currency', currency) },
    { label: 'Leads', value: fmt(summary?.conversions ?? 0, 'number') },
    { label: 'CPA', value: fmt(summary?.cpa ?? 0, 'currency', currency) },
    { label: 'Impresiones', value: fmt(summary?.impressions ?? 0, 'number') },
    { label: 'Clicks', value: fmt(summary?.clicks ?? 0, 'number') },
    { label: 'CTR', value: fmt(summary?.ctr ?? 0, 'percent') },
  ]

  return (
    <div
      className={`rounded-2xl shadow-sm border ${bgColor} ${borderColor} p-5 flex flex-col gap-4`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-2 text-sm font-bold px-3 py-1 rounded-full ${badgeStyle}`}
        >
          {isGoogle ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          )}
          {isGoogle ? 'Google Ads' : 'Meta Ads'}
        </span>
        {error && (
          <span className="text-xs text-red-500 font-medium bg-red-50 px-2 py-1 rounded-full border border-red-200">
            Error de datos
          </span>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white/60 rounded-xl p-3">
              <div className="skeleton h-3 w-16 rounded mb-2" />
              <div className="skeleton h-6 w-20 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {metrics.map(({ label, value }) => (
            <div key={label} className="bg-white/70 rounded-xl p-3">
              <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
              <p
                className="text-base font-bold"
                style={{ color: accentColor }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

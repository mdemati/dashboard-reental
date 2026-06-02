'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface DailyPoint {
  date: string
  spend: number
  conversions: number
}

interface SpendChartProps {
  googleDaily: DailyPoint[]
  metaDaily: DailyPoint[]
  loading?: boolean
}

interface ChartDataPoint {
  date: string
  google: number
  meta: number
}

function formatDate(dateStr: string): string {
  const [, month, day] = dateStr.split('-')
  return `${parseInt(day)}/${parseInt(month)}`
}

function mergeDaily(googleDaily: DailyPoint[], metaDaily: DailyPoint[]): ChartDataPoint[] {
  const map: Record<string, ChartDataPoint> = {}

  for (const d of googleDaily) {
    if (!map[d.date]) map[d.date] = { date: d.date, google: 0, meta: 0 }
    map[d.date].google += d.spend
  }
  for (const d of metaDaily) {
    if (!map[d.date]) map[d.date] = { date: d.date, google: 0, meta: 0 }
    map[d.date].meta += d.spend
  }

  return Object.values(map).sort((a, b) => a.date.localeCompare(b.date))
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}) => {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="flex items-center gap-2">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600">{entry.name}:</span>
          <span className="font-bold text-gray-800">
            ${entry.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </p>
      ))}
    </div>
  )
}

export default function SpendChart({ googleDaily, metaDaily, loading }: SpendChartProps) {
  const data = mergeDaily(googleDaily, metaDaily)

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="skeleton h-5 w-48 rounded mb-4" />
        <div className="skeleton h-64 w-full rounded-xl" />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Gasto diario — Google vs Meta</h3>
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          No hay datos de gasto diario disponibles
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Gasto diario — Google vs Meta</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-xs text-gray-600 font-medium">{value}</span>
            )}
          />
          <Line
            type="monotone"
            dataKey="google"
            name="Google Ads"
            stroke="#FCA311"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#FCA311' }}
          />
          <Line
            type="monotone"
            dataKey="meta"
            name="Meta Ads"
            stroke="#1877F2"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#1877F2' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

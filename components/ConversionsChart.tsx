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
  conversions: number
}

interface Props {
  googleDaily: DailyPoint[]
  metaDaily: DailyPoint[]
  loading: boolean
}

function fmtDate(dateStr: string): string {
  const [, month, day] = dateStr.split('-')
  return `${day}/${month}`
}

function mergeDaily(
  googleDaily: DailyPoint[],
  metaDaily: DailyPoint[]
): { date: string; google: number; meta: number }[] {
  const map: Record<string, { google: number; meta: number }> = {}

  for (const pt of googleDaily) {
    if (!map[pt.date]) map[pt.date] = { google: 0, meta: 0 }
    map[pt.date].google += pt.conversions
  }
  for (const pt of metaDaily) {
    if (!map[pt.date]) map[pt.date] = { google: 0, meta: 0 }
    map[pt.date].meta += pt.conversions
  }

  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, vals]) => ({ date: fmtDate(date), ...vals }))
}

export default function ConversionsChart({ googleDaily, metaDaily, loading }: Props) {
  const data = mergeDaily(googleDaily, metaDaily)

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="skeleton h-5 w-52 rounded mb-4" />
        <div className="skeleton h-64 w-full rounded-xl" />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <p className="text-sm font-semibold text-gray-700 mb-4">Evolución de conversiones</p>
        <p className="text-xs text-gray-400 text-center py-12">Sin datos disponibles</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <p className="text-sm font-semibold text-gray-700 mb-4">Evolución de conversiones</p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 4, right: 12, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: 12,
            }}
            formatter={(value: number, name: string) => [
              value.toLocaleString('en-US', { maximumFractionDigits: 0 }),
              name === 'google' ? 'Google Ads' : 'Meta Ads',
            ]}
          />
          <Legend
            formatter={(value) => (value === 'google' ? 'Google Ads' : 'Meta Ads')}
            wrapperStyle={{ fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="google"
            stroke="#FCA311"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="meta"
            stroke="#1877F2"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

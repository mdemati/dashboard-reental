'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface Props {
  googleSpend: number
  metaSpend: number
  metaCurrency?: string
  googleCurrency?: string
  loading: boolean
}

const COLORS = { google: '#FCA311', meta: '#1877F2' }
const SYM: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' }

function fmt(v: number, currency = 'EUR') {
  const sym = SYM[currency] ?? currency + ' '
  return sym + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function pct(part: number, total: number) {
  if (total === 0) return '0%'
  return ((part / total) * 100).toFixed(1) + '%'
}

export default function SpendByChannel({ googleSpend, metaSpend, metaCurrency = 'EUR', googleCurrency = 'EUR', loading }: Props) {
  const total = googleSpend + metaSpend

  const data = [
    { name: 'Google Ads', value: googleSpend, color: COLORS.google },
    { name: 'Meta Ads', value: metaSpend, color: COLORS.meta },
  ].filter((d) => d.value > 0)

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="skeleton h-5 w-48 rounded mb-4" />
        <div className="flex items-center gap-6">
          <div className="skeleton h-48 w-48 rounded-full" />
          <div className="flex-1 space-y-3">
            <div className="skeleton h-10 w-full rounded-xl" />
            <div className="skeleton h-10 w-full rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <p className="text-sm font-semibold text-gray-700 mb-4">Gasto total por canal</p>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Donut chart */}
        <div className="shrink-0 w-48 h-48">
          {total > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={76}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: 12,
                  }}
                  formatter={(value: number) => [fmt(value), '']}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-xs text-gray-400">Sin datos</p>
            </div>
          )}
        </div>

        {/* Legend + stats */}
        <div className="flex-1 w-full space-y-3">
          {/* Total */}
          <div className="text-center sm:text-left pb-2 border-b border-gray-100">
            <p className="text-xs text-gray-400">Total combinado</p>
            <p className="text-2xl font-black text-gray-800">{fmt(total, metaCurrency)}</p>
          </div>

          {/* Google row */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: COLORS.google }} />
              <span className="text-sm font-semibold text-gray-700">Google Ads</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">{fmt(googleSpend, googleCurrency)}</p>
              <p className="text-xs text-gray-400">{pct(googleSpend, total)}</p>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: COLORS.meta }} />
              <span className="text-sm font-semibold text-gray-700">Meta Ads</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">{fmt(metaSpend, metaCurrency)}</p>
              <p className="text-xs text-gray-400">{pct(metaSpend, total)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

interface BreakdownRow {
  name: string
  id: string
  campaignName?: string
  adsetName?: string
  spend: number
  dailySpend: number
  conversions: number
  cpa: number
  impressions: number
  uniqueLinkClicks: number
  ctr: number
}

interface Props {
  campaigns: BreakdownRow[]
  adsets: BreakdownRow[]
  ads: BreakdownRow[]
  currency?: string
  loading: boolean
}

type Level = 'campaign' | 'adset' | 'ad'
type SortKey = keyof Pick<BreakdownRow, 'spend' | 'dailySpend' | 'conversions' | 'cpa' | 'impressions' | 'uniqueLinkClicks' | 'ctr'>

const SYM: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' }

function fmt(v: number, type: 'currency' | 'number' | 'pct', currency = 'EUR'): string {
  if (type === 'currency') {
    const sym = SYM[currency] ?? currency + ' '
    return sym + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  if (type === 'pct') return v.toFixed(2) + '%'
  return v.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

const COLUMNS: { key: SortKey; label: string; type: 'currency' | 'number' | 'pct' }[] = [
  { key: 'spend', label: 'Inversión', type: 'currency' },
  { key: 'dailySpend', label: 'Inv. diaria', type: 'currency' },
  { key: 'conversions', label: 'Conversiones', type: 'number' },
  { key: 'cpa', label: 'Coste/Conv.', type: 'currency' },
  { key: 'impressions', label: 'Impresiones', type: 'number' },
  { key: 'uniqueLinkClicks', label: 'Clics únicos', type: 'number' },
  { key: 'ctr', label: 'CTR', type: 'pct' },
]

function SortIcon({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) {
  return (
    <span className={`ml-1 inline-block text-xs ${active ? 'text-[#1877F2]' : 'text-gray-300'}`}>
      {dir === 'asc' ? '↑' : '↓'}
    </span>
  )
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i}>
          <td className="px-3 py-3"><div className="skeleton h-3 w-full rounded" /></td>
          {COLUMNS.map((col) => (
            <td key={col.key} className="px-3 py-3 text-right"><div className="skeleton h-3 w-16 rounded ml-auto" /></td>
          ))}
        </tr>
      ))}
    </>
  )
}

export default function MetaBreakdownTable({ campaigns, adsets, ads, currency = 'EUR', loading }: Props) {
  const [level, setLevel] = useState<Level>('campaign')
  const [sortKey, setSortKey] = useState<SortKey>('spend')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const rows = level === 'campaign' ? campaigns : level === 'adset' ? adsets : ads

  const sorted = [...rows].sort((a, b) => {
    const diff = a[sortKey] - b[sortKey]
    return sortDir === 'desc' ? -diff : diff
  })

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    else { setSortKey(key); setSortDir('desc') }
  }

  const LEVELS: { key: Level; label: string }[] = [
    { key: 'campaign', label: 'Campaña' },
    { key: 'adset', label: 'Ad Set' },
    { key: 'ad', label: 'Anuncio' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-blue-50 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center text-xs font-bold px-2 py-1 rounded-full bg-[#1877F2] text-white">
            Meta Ads
          </span>
          <h3 className="text-sm font-semibold text-gray-700">Desglose de rendimiento</h3>
        </div>
        {/* Level selector */}
        <div className="flex items-center gap-1 bg-white rounded-lg p-0.5 border border-gray-200">
          {LEVELS.map((l) => (
            <button
              key={l.key}
              onClick={() => setLevel(l.key)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                level === l.key
                  ? 'bg-[#1877F2] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Parent breadcrumb for adset/ad level */}
      {!loading && level !== 'campaign' && rows.length > 0 && (
        <div className="px-5 py-2 bg-gray-50 border-b border-gray-100">
          <p className="text-xs text-gray-400">
            {level === 'adset' ? `${rows.length} ad sets` : `${rows.length} anuncios`} en el período seleccionado
          </p>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-3 py-3 text-left font-semibold text-gray-500 whitespace-nowrap">
                {level === 'campaign' ? 'Campaña' : level === 'adset' ? 'Ad Set' : 'Anuncio'}
              </th>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-3 text-right font-semibold text-gray-500 whitespace-nowrap cursor-pointer hover:text-gray-700 select-none"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  <SortIcon active={sortKey === col.key} dir={sortKey === col.key ? sortDir : 'desc'} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <SkeletonRows />
            ) : sorted.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length + 1} className="px-3 py-8 text-center text-gray-400">
                  Sin datos disponibles
                </td>
              </tr>
            ) : (
              sorted.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3 text-gray-800 max-w-[220px]">
                    <div className="truncate font-medium" title={row.name}>{row.name}</div>
                    {level === 'ad' && row.adsetName && (
                      <div className="text-gray-400 truncate mt-0.5" title={row.adsetName}>{row.adsetName}</div>
                    )}
                    {(level === 'adset' || level === 'ad') && row.campaignName && (
                      <div className="text-gray-300 truncate" title={row.campaignName}>{row.campaignName}</div>
                    )}
                  </td>
                  {COLUMNS.map((col) => (
                    <td key={col.key} className={`px-3 py-3 text-right tabular-nums ${col.key === sortKey ? 'font-semibold text-[#1877F2]' : 'text-gray-600'}`}>
                      {fmt(row[col.key], col.type, currency)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
          {!loading && sorted.length > 0 && (
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td className="px-3 py-2.5 font-semibold text-gray-700 text-xs">Total</td>
                {COLUMNS.map((col) => {
                  const total = col.key === 'ctr'
                    ? (sorted.reduce((s, r) => s + r.impressions, 0) > 0
                      ? (sorted.reduce((s, r) => s + r.uniqueLinkClicks, 0) / sorted.reduce((s, r) => s + r.impressions, 0)) * 100
                      : 0)
                    : col.key === 'cpa'
                    ? (sorted.reduce((s, r) => s + r.conversions, 0) > 0
                      ? sorted.reduce((s, r) => s + r.spend, 0) / sorted.reduce((s, r) => s + r.conversions, 0)
                      : 0)
                    : sorted.reduce((s, r) => s + r[col.key], 0)
                  return (
                    <td key={col.key} className="px-3 py-2.5 text-right font-semibold text-gray-700 text-xs tabular-nums">
                      {fmt(total, col.type, currency)}
                    </td>
                  )
                })}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}

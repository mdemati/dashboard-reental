'use client'

import { useState } from 'react'

interface Campaign {
  name: string
  id: string
  spend: number
  conversions: number
  cpa: number
  impressions: number
  clicks: number
  ctr: number
}

interface CampaignTableProps {
  campaigns: Campaign[]
  platform: 'google' | 'meta'
  loading?: boolean
}

type SortKey = keyof Campaign
type SortDir = 'asc' | 'desc'

function fmt(value: number, type: 'currency' | 'number' | 'percent'): string {
  if (type === 'currency') {
    return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  if (type === 'percent') return value.toFixed(2) + '%'
  return value.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

export default function CampaignTable({ campaigns, platform, loading }: CampaignTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('spend')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const isGoogle = platform === 'google'
  const accentClass = isGoogle ? 'text-brand-gold' : 'text-[#1877F2]'
  const headerBg = isGoogle ? 'bg-amber-50' : 'bg-blue-50'

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sorted = [...campaigns].sort((a, b) => {
    const aVal = a[sortKey]
    const bVal = b[sortKey]
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }
    return sortDir === 'asc'
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number)
  })

  const columns: { key: SortKey; label: string; type: 'currency' | 'number' | 'percent' | 'name' }[] =
    [
      { key: 'name', label: 'Campaña', type: 'name' },
      { key: 'spend', label: 'Gasto', type: 'currency' },
      { key: 'conversions', label: 'Leads', type: 'number' },
      { key: 'cpa', label: 'CPA', type: 'currency' },
      { key: 'clicks', label: 'Clicks', type: 'number' },
      { key: 'ctr', label: 'CTR', type: 'percent' },
    ]

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <span className="text-gray-300 ml-1">↕</span>
    return <span className={`ml-1 ${accentClass}`}>{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className={`px-5 py-4 ${headerBg} border-b border-gray-100 flex items-center gap-2`}>
        <span
          className={`inline-flex items-center text-xs font-bold px-2 py-1 rounded-full ${
            isGoogle ? 'bg-brand-gold text-white' : 'bg-[#1877F2] text-white'
          }`}
        >
          {isGoogle ? 'Google Ads' : 'Meta Ads'}
        </span>
        <h3 className="text-sm font-semibold text-gray-700">Top Campañas</h3>
      </div>

      {loading ? (
        <div className="p-5 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="skeleton h-4 flex-1 rounded" />
              <div className="skeleton h-4 w-16 rounded" />
              <div className="skeleton h-4 w-10 rounded" />
              <div className="skeleton h-4 w-16 rounded" />
              <div className="skeleton h-4 w-14 rounded" />
              <div className="skeleton h-4 w-12 rounded" />
            </div>
          ))}
        </div>
      ) : campaigns.length === 0 ? (
        <div className="p-8 text-center text-gray-400 text-sm">No hay campañas activas</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 cursor-pointer select-none hover:text-gray-700 transition-colors ${
                      col.key === 'name' ? 'text-left' : 'text-right'
                    }`}
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                    <SortIcon col={col.key} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sorted.map((campaign, idx) => (
                <tr
                  key={campaign.id ?? idx}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 max-w-[200px]">
                    <span
                      className="block truncate font-medium text-gray-800"
                      title={campaign.name}
                    >
                      {campaign.name}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-right font-semibold ${accentClass}`}>
                    {fmt(campaign.spend, 'currency')}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {fmt(campaign.conversions, 'number')}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {campaign.conversions > 0 ? fmt(campaign.cpa, 'currency') : '—'}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {fmt(campaign.clicks, 'number')}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {fmt(campaign.ctr, 'percent')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

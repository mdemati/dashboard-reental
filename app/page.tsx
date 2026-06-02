'use client'

import { useState, useEffect, useCallback } from 'react'
import KPICard from '@/components/KPICard'
import PlatformCard from '@/components/PlatformCard'
import SpendChart from '@/components/SpendChart'
import ConversionsChart from '@/components/ConversionsChart'
import CampaignTable from '@/components/CampaignTable'
import MetaBreakdownTable from '@/components/MetaBreakdownTable'
import SpendByChannel from '@/components/SpendByChannel'

interface PlatformSummary {
  spend: number
  conversions: number
  cpa: number
  impressions: number
  clicks: number
  ctr: number
}

interface Campaign {
  name: string
  id: string
  spend: number
  dailySpend: number
  conversions: number
  cpa: number
  impressions: number
  clicks: number
  uniqueLinkClicks: number
  ctr: number
  campaignName?: string
  adsetName?: string
}

interface DailyPoint {
  date: string
  spend: number
  conversions: number
}

interface PlatformData {
  currency?: string
  summary: PlatformSummary
  campaigns: Campaign[]
  adsets?: Campaign[]
  ads?: Campaign[]
  daily: DailyPoint[]
  error?: string
}

interface DashboardData {
  google: PlatformData
  meta: PlatformData
  combined: {
    spend: number
    conversions: number
    cpa: number
    clicks: number
  }
  updatedAt: string
}

const DAYS_OPTIONS = [
  { label: '7 días', value: 7 },
  { label: '14 días', value: 14 },
  { label: '30 días', value: 30 },
  { label: '90 días', value: 90 },
]

function currencySymbol(code?: string): string {
  const map: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' }
  return code ? (map[code] ?? code + ' ') : '$'
}

function fmt(value: number, type: 'currency' | 'number', currency?: string): string {
  if (type === 'currency') {
    return currencySymbol(currency) + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  return value.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

function formatUpdatedAt(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

export default function HomePage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDays, setSelectedDays] = useState(30)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = useCallback(
    async (days: number, isRefresh = false) => {
      if (isRefresh) setRefreshing(true)
      else setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/dashboard?days=${days}`, { cache: 'no-store' })
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
        const json: DashboardData = await res.json()
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los datos')
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    },
    []
  )

  useEffect(() => {
    fetchData(selectedDays)
  }, [selectedDays, fetchData])

  const handleRefresh = () => {
    fetchData(selectedDays, true)
  }

  const handleDaysChange = (days: number) => {
    setSelectedDays(days)
  }

  const combined = data?.combined
  const google = data?.google
  const meta = data?.meta
  const metaCurrency = meta?.currency ?? 'EUR'
  const googleCurrency = google?.currency ?? 'EUR'
  const hasGoogleError = !!google?.error
  const hasMetaError = !!meta?.error

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-dark">
                <span className="text-brand-gold font-black text-sm">R</span>
              </div>
              <div>
                <h1 className="text-lg font-black text-brand-dark leading-none">
                  <span style={{ color: '#FCA311' }}>Reental</span>
                </h1>
                <p className="text-xs text-gray-400 leading-none mt-0.5">Dashboard PPC</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Date range selector */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                {DAYS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleDaysChange(opt.value)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      selectedDays === opt.value
                        ? 'bg-white text-brand-dark shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Refresh button */}
              <button
                onClick={handleRefresh}
                disabled={loading || refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-white text-xs font-bold rounded-xl hover:bg-amber-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <svg
                  className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Actualizar datos
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Error banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-400 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-red-700">Error al cargar datos</p>
              <p className="text-xs text-red-500 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Platform error banners */}
        {!loading && hasGoogleError && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <p className="text-xs text-amber-700">
              <span className="font-semibold">Google Ads:</span> {google?.error}
            </p>
          </div>
        )}
        {!loading && hasMetaError && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <p className="text-xs text-blue-700">
              <span className="font-semibold">Meta Ads:</span> {meta?.error}
            </p>
          </div>
        )}

        {/* Last updated */}
        {data?.updatedAt && !loading && (
          <p className="text-xs text-gray-400 text-right -mb-2">
            Última actualización: {formatUpdatedAt(data.updatedAt)}
          </p>
        )}

        {/* KPI cards — combined summary */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Resumen combinado
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Gasto total"
              value={loading ? '—' : fmt(combined?.spend ?? 0, 'currency', metaCurrency)}
              subLabel="Google + Meta"
              highlight
              loading={loading}
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <KPICard
              title="Leads totales"
              value={loading ? '—' : fmt(combined?.conversions ?? 0, 'number')}
              subLabel="Conversiones combinadas"
              loading={loading}
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
            <KPICard
              title="CPA blended"
              value={loading ? '—' : fmt(combined?.cpa ?? 0, 'currency', metaCurrency)}
              subLabel="Costo por lead combinado"
              loading={loading}
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            <KPICard
              title="Clicks totales"
              value={loading ? '—' : fmt(combined?.clicks ?? 0, 'number')}
              subLabel="Google + Meta"
              loading={loading}
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              }
            />
          </div>
        </section>

        {/* Spend by channel */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Distribución del gasto
          </h2>
          <SpendByChannel
            googleSpend={google?.summary?.spend ?? 0}
            metaSpend={meta?.summary?.spend ?? 0}
            googleCurrency={googleCurrency}
            metaCurrency={metaCurrency}
            loading={loading}
          />
        </section>

        {/* Platform cards */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Desglose por plataforma
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PlatformCard
              platform="google"
              summary={google?.summary ?? { spend: 0, conversions: 0, cpa: 0, impressions: 0, clicks: 0, ctr: 0 }}
              currency={googleCurrency}
              error={google?.error}
              loading={loading}
            />
            <PlatformCard
              platform="meta"
              summary={meta?.summary ?? { spend: 0, conversions: 0, cpa: 0, impressions: 0, clicks: 0, ctr: 0 }}
              currency={metaCurrency}
              error={meta?.error}
              loading={loading}
            />
          </div>
        </section>

        {/* Daily spend chart */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Tendencia de gasto
          </h2>
          <SpendChart
            googleDaily={google?.daily ?? []}
            metaDaily={meta?.daily ?? []}
            loading={loading}
          />
        </section>

        {/* Conversions chart */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Evolución de conversiones
          </h2>
          <ConversionsChart
            googleDaily={google?.daily ?? []}
            metaDaily={meta?.daily ?? []}
            loading={loading}
          />
        </section>

        {/* Campaign tables */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Campañas activas — Google Ads
          </h2>
          <CampaignTable
            campaigns={google?.campaigns ?? []}
            platform="google"
            loading={loading}
          />
        </section>

        {/* Meta breakdown table */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Desglose Meta Ads
          </h2>
          <MetaBreakdownTable
            campaigns={(meta?.campaigns ?? []) as Campaign[]}
            adsets={(meta?.adsets ?? []) as Campaign[]}
            ads={(meta?.ads ?? []) as Campaign[]}
            currency={metaCurrency}
            loading={loading}
          />
        </section>
      </main>

      <footer className="mt-8 pb-6 text-center text-xs text-gray-300">
        Reental PPC Dashboard — Datos actualizados manualmente
      </footer>
    </div>
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'

const GOOGLE_ADS_API_BASE = 'https://googleads.googleapis.com/v20'
const TOKEN_URL = 'https://oauth2.googleapis.com/token'

interface CampaignRow {
  campaign: { name: string; id: string }
  metrics: {
    costMicros: string
    conversions: number
    costPerConversion: number
    impressions: string
    clicks: string
    ctr: number
  }
}

interface DailyRow {
  segments: { date: string }
  metrics: {
    costMicros: string
    conversions: number
    clicks: string
    impressions: string
  }
}

function daysToGaqlPeriod(days: number): string {
  const map: Record<number, string> = {
    7: 'LAST_7_DAYS',
    14: 'LAST_14_DAYS',
    30: 'LAST_30_DAYS',
    90: 'LAST_90_DAYS',
  }
  return map[days] ?? 'LAST_30_DAYS'
}

async function getAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
    grant_type: 'refresh_token',
  })

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Token exchange failed: ${res.status} ${text}`)
  }

  const data = await res.json()
  return data.access_token as string
}

async function runGaqlQuery(
  accessToken: string,
  customerId: string,
  query: string
): Promise<unknown[]> {
  const url = `${GOOGLE_ADS_API_BASE}/customers/${customerId}/googleAds:searchStream`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
      'login-customer-id': process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID ?? process.env.GOOGLE_ADS_CUSTOMER_ID!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Google Ads API error: ${res.status} ${text}`)
  }

  const text = await res.text()
  const rows: unknown[] = []

  try {
    const batches = JSON.parse(text)
    if (Array.isArray(batches)) {
      for (const batch of batches) {
        if (batch.results && Array.isArray(batch.results)) {
          rows.push(...batch.results)
        }
      }
    }
  } catch {
    for (const line of text.split('\n')) {
      const trimmed = line.trim().replace(/^,/, '')
      if (!trimmed || trimmed === '[' || trimmed === ']') continue
      try {
        const parsed = JSON.parse(trimmed)
        if (parsed.results && Array.isArray(parsed.results)) {
          rows.push(...parsed.results)
        }
      } catch { /* skip */ }
    }
  }

  return rows
}

async function fetchGoogleAdsData(days: number) {
  const period = daysToGaqlPeriod(days)
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!

  const accessToken = await getAccessToken()

  const campaignQuery = `
    SELECT
      campaign.name,
      campaign.id,
      metrics.cost_micros,
      metrics.conversions,
      metrics.cost_per_conversion,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr
    FROM campaign
    WHERE segments.date DURING ${period}
      AND campaign.status = 'ENABLED'
    ORDER BY metrics.cost_micros DESC
    LIMIT 20
  `

  const dailyQuery = `
    SELECT
      segments.date,
      metrics.cost_micros,
      metrics.conversions,
      metrics.clicks,
      metrics.impressions
    FROM campaign
    WHERE segments.date DURING ${period}
    ORDER BY segments.date ASC
  `

  const [campaignRows, dailyRows] = await Promise.all([
    runGaqlQuery(accessToken, customerId, campaignQuery),
    runGaqlQuery(accessToken, customerId, dailyQuery),
  ])

  const campaigns = (campaignRows as CampaignRow[]).map((row) => {
    const spend = (parseInt(String(row.metrics.costMicros ?? '0'), 10) || 0) / 1_000_000
    const conversions = row.metrics.conversions ?? 0
    const impressions = parseInt(String(row.metrics.impressions ?? '0'), 10) || 0
    const clicks = parseInt(String(row.metrics.clicks ?? '0'), 10) || 0
    const ctr = (row.metrics.ctr ?? 0) * 100
    const cpa = conversions > 0 ? spend / conversions : 0
    return { name: row.campaign.name, id: row.campaign.id, spend, conversions, cpa, impressions, clicks, ctr }
  })

  const dailyMap: Record<string, { date: string; spend: number; conversions: number; clicks: number; impressions: number }> = {}
  for (const row of dailyRows as DailyRow[]) {
    const date = row.segments.date
    if (!dailyMap[date]) dailyMap[date] = { date, spend: 0, conversions: 0, clicks: 0, impressions: 0 }
    dailyMap[date].spend += (parseInt(String(row.metrics.costMicros ?? '0'), 10) || 0) / 1_000_000
    dailyMap[date].conversions += row.metrics.conversions ?? 0
    dailyMap[date].clicks += parseInt(String(row.metrics.clicks ?? '0'), 10) || 0
    dailyMap[date].impressions += parseInt(String(row.metrics.impressions ?? '0'), 10) || 0
  }
  const daily = Object.values(dailyMap).sort((a, b) => a.date.localeCompare(b.date))

  const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0)
  const totalConversions = campaigns.reduce((s, c) => s + c.conversions, 0)
  const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0)
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0)
  const blendedCpa = totalConversions > 0 ? totalSpend / totalConversions : 0
  const blendedCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0

  return {
    summary: { spend: totalSpend, conversions: totalConversions, cpa: blendedCpa, impressions: totalImpressions, clicks: totalClicks, ctr: blendedCtr },
    campaigns,
    daily,
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') ?? '30', 10)

    const getCachedData = unstable_cache(
      () => fetchGoogleAdsData(days),
      [`google-ads-${days}`],
      { revalidate: 86400, tags: [`google-ads`, `google-ads-${days}`] }
    )

    const data = await getCachedData()
    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[google-ads] Error:', message)
    return NextResponse.json(
      {
        error: message,
        summary: { spend: 0, conversions: 0, cpa: 0, impressions: 0, clicks: 0, ctr: 0 },
        campaigns: [],
        daily: [],
      },
      { status: 200 }
    )
  }
}

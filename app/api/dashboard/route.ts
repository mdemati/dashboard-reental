import { NextRequest, NextResponse } from 'next/server'

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
  conversions: number
  cpa: number
  impressions: number
  clicks: number
  ctr: number
}

interface DailyPoint {
  date: string
  spend: number
  conversions: number
}

interface MetaBreakdownRow {
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

interface PlatformData {
  currency?: string
  summary: PlatformSummary
  campaigns: Campaign[] | MetaBreakdownRow[]
  adsets?: MetaBreakdownRow[]
  ads?: MetaBreakdownRow[]
  daily: DailyPoint[]
  error?: string
}

const emptySummary = (): PlatformSummary => ({
  spend: 0,
  conversions: 0,
  cpa: 0,
  impressions: 0,
  clicks: 0,
  ctr: 0,
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const days = searchParams.get('days') ?? '30'

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

  const [googleResult, metaResult] = await Promise.allSettled([
    fetch(`${baseUrl}/api/google-ads?days=${days}`, { cache: 'no-store' }).then((r) => r.json()),
    fetch(`${baseUrl}/api/meta-ads?days=${days}`, { cache: 'no-store' }).then((r) => r.json()),
  ])

  let googleData: PlatformData = {
    summary: emptySummary(),
    campaigns: [],
    daily: [],
    error: undefined,
  }

  let metaData: PlatformData = {
    summary: emptySummary(),
    campaigns: [],
    adsets: [],
    ads: [],
    daily: [],
    error: undefined,
  }

  if (googleResult.status === 'fulfilled') {
    googleData = googleResult.value
  } else {
    googleData.error = googleResult.reason?.message ?? 'Google Ads fetch failed'
  }

  if (metaResult.status === 'fulfilled') {
    metaData = metaResult.value
  } else {
    metaData.error = metaResult.reason?.message ?? 'Meta Ads fetch failed'
  }

  const combinedSpend = (googleData.summary?.spend ?? 0) + (metaData.summary?.spend ?? 0)
  const combinedConversions =
    (googleData.summary?.conversions ?? 0) + (metaData.summary?.conversions ?? 0)
  const combinedClicks = (googleData.summary?.clicks ?? 0) + (metaData.summary?.clicks ?? 0)
  const combinedCpa = combinedConversions > 0 ? combinedSpend / combinedConversions : 0

  return NextResponse.json({
    google: googleData,
    meta: metaData,
    combined: {
      spend: combinedSpend,
      conversions: combinedConversions,
      cpa: combinedCpa,
      clicks: combinedClicks,
    },
    updatedAt: new Date().toISOString(),
  })
}

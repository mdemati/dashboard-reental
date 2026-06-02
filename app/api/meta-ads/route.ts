import { NextRequest, NextResponse } from 'next/server'

const META_BASE = 'https://graph.facebook.com/v20.0'
const ACCOUNT_ID = 'act_6633565470069747'

// 'lead' already aggregates onsite_conversion.lead_grouped + offsite_conversion.fb_pixel_lead
// counting sub-types separately causes double-counting
const LEAD_ACTION_TYPES = new Set(['lead'])

function daysToMetaPreset(days: number): string {
  const map: Record<number, string> = {
    7: 'last_7d',
    14: 'last_14d',
    30: 'last_30d',
    90: 'last_90d',
  }
  return map[days] ?? 'last_30d'
}

interface MetaAction {
  action_type: string
  value: string
}

interface MetaInsightRow {
  campaign_name?: string
  campaign_id?: string
  adset_name?: string
  adset_id?: string
  ad_name?: string
  ad_id?: string
  spend: string
  impressions: string
  clicks: string
  unique_clicks?: string
  ctr: string
  outbound_clicks?: MetaAction[]
  actions?: MetaAction[]
  date_start?: string
}

interface MetaDailyInsight {
  date_start: string
  spend: string
  actions?: MetaAction[]
}

function countLeads(actions?: MetaAction[]): number {
  if (!actions) return 0
  return actions
    .filter((a) => LEAD_ACTION_TYPES.has(a.action_type))
    .reduce((sum, a) => sum + (parseFloat(a.value) || 0), 0)
}

function getUniqueOutboundClicks(row: MetaInsightRow): number {
  if (row.unique_clicks) return parseInt(row.unique_clicks, 10) || 0
  if (row.outbound_clicks) {
    const item = row.outbound_clicks.find((a) => a.action_type === 'outbound_click')
    if (item) return parseFloat(item.value) || 0
  }
  return parseInt(row.clicks ?? '0', 10) || 0
}

async function fetchAllPages<T>(url: string): Promise<T[]> {
  const results: T[] = []
  let nextUrl: string | null = url

  while (nextUrl) {
    const response: Response = await fetch(nextUrl, { cache: 'no-store' })
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Meta API error: ${response.status} ${text}`)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: Record<string, any> = await response.json()
    if (json.error) {
      throw new Error(`Meta API error: ${json.error.message}`)
    }
    if (json.data && Array.isArray(json.data)) {
      results.push(...(json.data as T[]))
    }
    nextUrl = (json.paging?.next as string | undefined) ?? null
  }

  return results
}

const INSIGHT_FIELDS = 'spend,actions,impressions,clicks,unique_clicks,outbound_clicks,ctr'

function buildInsightRow(row: MetaInsightRow, days: number) {
  const spend = parseFloat(row.spend ?? '0') || 0
  const conversions = countLeads(row.actions)
  const impressions = parseInt(row.impressions ?? '0', 10) || 0
  const clicks = parseInt(row.clicks ?? '0', 10) || 0
  const uniqueLinkClicks = getUniqueOutboundClicks(row)
  const ctr = parseFloat(row.ctr ?? '0') || 0
  const cpa = conversions > 0 ? spend / conversions : 0
  const dailySpend = days > 0 ? spend / days : 0
  return { spend, conversions, impressions, clicks, uniqueLinkClicks, ctr, cpa, dailySpend }
}

async function fetchAccountCurrency(token: string): Promise<string> {
  try {
    const res = await fetch(
      `${META_BASE}/${ACCOUNT_ID}?fields=currency&access_token=${token}`,
      { cache: 'no-store' }
    )
    const json = await res.json()
    return (json.currency as string) ?? 'USD'
  } catch {
    return 'USD'
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') ?? '30', 10)
    const preset = daysToMetaPreset(days)
    const token = process.env.META_ACCESS_TOKEN!

    const campaignUrl =
      `${META_BASE}/${ACCOUNT_ID}/insights` +
      `?fields=campaign_name,campaign_id,${INSIGHT_FIELDS}` +
      `&level=campaign` +
      `&date_preset=${preset}` +
      `&access_token=${token}`

    const adsetUrl =
      `${META_BASE}/${ACCOUNT_ID}/insights` +
      `?fields=campaign_name,campaign_id,adset_name,adset_id,${INSIGHT_FIELDS}` +
      `&level=adset` +
      `&date_preset=${preset}` +
      `&access_token=${token}`

    const adUrl =
      `${META_BASE}/${ACCOUNT_ID}/insights` +
      `?fields=campaign_name,campaign_id,adset_name,adset_id,ad_name,ad_id,${INSIGHT_FIELDS}` +
      `&level=ad` +
      `&date_preset=${preset}` +
      `&access_token=${token}`

    const dailyUrl =
      `${META_BASE}/${ACCOUNT_ID}/insights` +
      `?fields=spend,actions` +
      `&time_increment=1` +
      `&date_preset=${preset}` +
      `&access_token=${token}`

    const [campaignInsights, adsetInsights, adInsights, dailyInsights, currency] = await Promise.all([
      fetchAllPages<MetaInsightRow>(campaignUrl),
      fetchAllPages<MetaInsightRow>(adsetUrl),
      fetchAllPages<MetaInsightRow>(adUrl),
      fetchAllPages<MetaDailyInsight>(dailyUrl),
      fetchAccountCurrency(token),
    ])

    const campaigns = campaignInsights.map((row) => {
      const metrics = buildInsightRow(row, days)
      return { name: row.campaign_name ?? '', id: row.campaign_id ?? '', ...metrics }
    })

    const adsets = adsetInsights.map((row) => {
      const metrics = buildInsightRow(row, days)
      return {
        name: row.adset_name ?? '',
        id: row.adset_id ?? '',
        campaignName: row.campaign_name ?? '',
        campaignId: row.campaign_id ?? '',
        ...metrics,
      }
    })

    const ads = adInsights.map((row) => {
      const metrics = buildInsightRow(row, days)
      return {
        name: row.ad_name ?? '',
        id: row.ad_id ?? '',
        adsetName: row.adset_name ?? '',
        adsetId: row.adset_id ?? '',
        campaignName: row.campaign_name ?? '',
        campaignId: row.campaign_id ?? '',
        ...metrics,
      }
    })

    const daily = dailyInsights
      .map((row) => ({
        date: row.date_start,
        spend: parseFloat(row.spend ?? '0') || 0,
        conversions: countLeads(row.actions),
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0)
    const totalConversions = campaigns.reduce((s, c) => s + c.conversions, 0)
    const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0)
    const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0)
    const blendedCpa = totalConversions > 0 ? totalSpend / totalConversions : 0
    const blendedCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0

    return NextResponse.json({
      currency,
      summary: {
        spend: totalSpend,
        conversions: totalConversions,
        cpa: blendedCpa,
        impressions: totalImpressions,
        clicks: totalClicks,
        ctr: blendedCtr,
      },
      campaigns,
      adsets,
      ads,
      daily,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[meta-ads] Error:', message)
    return NextResponse.json(
      {
        error: message,
        summary: { spend: 0, conversions: 0, cpa: 0, impressions: 0, clicks: 0, ctr: 0 },
        campaigns: [],
        adsets: [],
        ads: [],
        daily: [],
      },
      { status: 200 }
    )
  }
}

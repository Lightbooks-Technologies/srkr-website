/**
 * GET /api/analytics/summary?month=YYYY-MM
 * Monthly website analytics (from Umami) for the public /analytics page:
 * headline stats, daily visitor series, top pages / countries / referrers.
 * Defaults to the current month (IST). CDN-cached: 10 min for the current
 * month, 1 day for finished months.
 */
import { NextRequest, NextResponse } from 'next/server'
import {
  CORS_HEADERS,
  statValue,
  TIMEZONE,
  umamiConfigured,
  umamiGet,
  umamiMetrics,
  WEBSITE_ID,
} from '../umami'

export const dynamic = 'force-dynamic'

const IST_OFFSET = '+05:30'

/** Current YYYY-MM in IST. */
const currentMonthIST = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: TIMEZONE, year: 'numeric', month: '2-digit' })
    .format(new Date())
    .slice(0, 7)

const monthStartMs = (month: string) => Date.parse(`${month}-01T00:00:00${IST_OFFSET}`)
const nextMonth = (month: string) => {
  const [y, m] = month.split('-').map(Number)
  return m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, '0')}`
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET(req: NextRequest) {
  if (!umamiConfigured()) {
    return NextResponse.json({ enabled: false }, { headers: CORS_HEADERS })
  }

  const thisMonth = currentMonthIST()
  const month = req.nextUrl.searchParams.get('month') || thisMonth
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month) || month > thisMonth) {
    return NextResponse.json(
      { error: 'month must be YYYY-MM and not in the future' },
      { status: 400, headers: CORS_HEADERS },
    )
  }

  const startAt = monthStartMs(month)
  const monthEnd = monthStartMs(nextMonth(month)) - 1
  const endAt = Math.min(Date.now(), monthEnd)

  try {
    const [stats, series, topPages, topCountries, topReferrers] = await Promise.all([
      umamiGet(`/websites/${WEBSITE_ID}/stats`, { startAt, endAt }),
      umamiGet(`/websites/${WEBSITE_ID}/pageviews`, {
        startAt,
        endAt,
        unit: 'day',
        timezone: TIMEZONE,
      }),
      umamiMetrics(startAt, endAt, 'path', 10),
      umamiMetrics(startAt, endAt, 'country', 10),
      umamiMetrics(startAt, endAt, 'referrer', 10),
    ])

    const body = {
      enabled: true,
      month,
      range: { startAt, endAt },
      stats: {
        visitors: statValue(stats?.visitors),
        pageviews: statValue(stats?.pageviews),
        visits: statValue(stats?.visits),
        bounces: statValue(stats?.bounces),
        totaltime: statValue(stats?.totaltime),
      },
      daily: (series?.pageviews ?? []).map((p: { x: string; y: number }, i: number) => ({
        date: p.x,
        pageviews: p.y,
        sessions: series?.sessions?.[i]?.y ?? 0,
      })),
      topPages,
      topCountries,
      topReferrers,
    }

    const cache =
      month === thisMonth
        ? 'public, s-maxage=600, stale-while-revalidate=3600'
        : 'public, s-maxage=86400, stale-while-revalidate=86400'

    return NextResponse.json(body, { headers: { ...CORS_HEADERS, 'Cache-Control': cache } })
  } catch (err) {
    console.error('analytics/summary:', err)
    return NextResponse.json(
      { enabled: false, error: 'analytics upstream unavailable' },
      { status: 502, headers: CORS_HEADERS },
    )
  }
}

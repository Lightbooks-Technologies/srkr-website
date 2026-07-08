/**
 * GET /api/analytics/online
 * Visitors active on the website in the last 5 minutes (from Umami).
 * Powers the "online now" widget on srkrec.ac.in. CDN-cached for 30s so
 * heavy polling from browsers costs at most ~2 Umami calls per minute.
 */
import { NextResponse } from 'next/server'
import { CORS_HEADERS, umamiConfigured, umamiGet, WEBSITE_ID } from '../umami'

export const dynamic = 'force-dynamic'

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET() {
  if (!umamiConfigured()) {
    return NextResponse.json(
      { enabled: false, online: 0 },
      { headers: { ...CORS_HEADERS, 'Cache-Control': 'public, s-maxage=300' } },
    )
  }
  try {
    const data = await umamiGet(`/websites/${WEBSITE_ID}/active`)
    // { visitors: n } on current API; older versions returned { x: n } or [{ x: n }].
    const online =
      typeof data?.visitors === 'number'
        ? data.visitors
        : Number(Array.isArray(data) ? data[0]?.x : data?.x) || 0
    return NextResponse.json(
      { enabled: true, online },
      {
        headers: {
          ...CORS_HEADERS,
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      },
    )
  } catch {
    // Widget hides itself on { enabled: false } — never break the site over analytics.
    return NextResponse.json({ enabled: false, online: 0 }, { headers: CORS_HEADERS })
  }
}

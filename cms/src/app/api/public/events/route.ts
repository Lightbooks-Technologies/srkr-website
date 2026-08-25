/**
 * GET /api/public/events
 * Published upcoming-events feed for the static website's client-side refresh.
 *
 * The website is prebuilt, so a status change in the admin panel normally waits
 * for a full rebuild (~2 min). The events page re-fetches this endpoint in the
 * browser, so Publish/Draft changes reflect within the CDN window below.
 *
 * CDN-cached for 60s — no matter how many visitors hit the site, Payload runs
 * at most ~1 query per minute. Past-event filtering happens client-side so the
 * cached response is date-independent.
 */
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

// Published-only public data — same as the anonymous REST read, so "*" is safe.
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

type MediaRef = { url?: string | null; alt?: string | null } | number | null | undefined

const media = (m: MediaRef) =>
  m && typeof m === 'object' && m.url ? { url: m.url, alt: m.alt || '' } : null

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'events',
      where: { status: { equals: 'published' } },
      sort: 'date',
      depth: 1,
      limit: 100,
      overrideAccess: false, // anonymous rules apply — drafts can never leak
    })
    return NextResponse.json(
      {
        docs: docs.map((e) => ({
          id: e.id,
          title: e.title,
          department: e.department,
          date: e.date,
          dateText: e.dateText,
          venue: e.venue,
          registrationLink: e.registrationLink,
          image: media(e.image as MediaRef),
          attachment: media(e.attachment as MediaRef),
        })),
      },
      {
        headers: {
          ...CORS_HEADERS,
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      },
    )
  } catch {
    // The website keeps its build-time HTML when this fails — never 500 loudly.
    return NextResponse.json({ docs: null }, { status: 503, headers: CORS_HEADERS })
  }
}

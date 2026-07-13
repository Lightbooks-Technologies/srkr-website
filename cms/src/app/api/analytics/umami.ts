/**
 * Server-side helper for the Umami API (cloud or self-hosted).
 *
 * The public website (static Astro) can't hold secrets, so these CMS routes
 * proxy Umami with credentials kept server-side. Two auth modes:
 *
 * Self-hosted (free, recommended — API keys on Umami Cloud are Pro-only):
 *   UMAMI_API_URL     — e.g. https://srkr-umami.vercel.app/api
 *   UMAMI_USERNAME    — an Umami login (make a dedicated view-only user)
 *   UMAMI_PASSWORD    — its password (proxy logs in and caches the token)
 *   UMAMI_WEBSITE_ID  — the website UUID from Umami settings
 *
 * Umami Cloud with a Pro API key:
 *   UMAMI_API_KEY     — Umami Cloud API key (Settings → API keys)
 *   UMAMI_WEBSITE_ID  — the website UUID
 *   UMAMI_API_URL     — optional, defaults to https://api.umami.is/v1
 */

const API_URL = (process.env.UMAMI_API_URL || 'https://api.umami.is/v1').replace(/\/$/, '')
const API_KEY = process.env.UMAMI_API_KEY || ''
const USERNAME = process.env.UMAMI_USERNAME || ''
const PASSWORD = process.env.UMAMI_PASSWORD || ''

export const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID || ''
export const TIMEZONE = 'Asia/Kolkata'

export const umamiConfigured = () =>
  Boolean(WEBSITE_ID && (API_KEY || (USERNAME && PASSWORD)))

// Self-hosted auth: POST /api/auth/login → bearer token. Cache it for the
// lifetime of the serverless instance; refresh once on a 401.
let cachedToken: string | null = null

async function login(): Promise<string> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Umami login failed (${res.status})`)
  const data = await res.json()
  if (!data?.token) throw new Error('Umami login returned no token')
  cachedToken = data.token
  return data.token
}

async function authHeaders(): Promise<Record<string, string>> {
  if (API_KEY) return { 'x-umami-api-key': API_KEY }
  return { Authorization: `Bearer ${cachedToken || (await login())}` }
}

// Aggregate visitor counts are public info — let the static site fetch from anywhere.
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Accept, Content-Type',
}

export async function umamiGet(
  path: string,
  params: Record<string, string | number> = {},
): Promise<any> {
  const qs = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)]),
  ).toString()
  const url = `${API_URL}${path}${qs ? `?${qs}` : ''}`

  const doFetch = async () =>
    fetch(url, {
      headers: { Accept: 'application/json', ...(await authHeaders()) },
      cache: 'no-store',
    })

  let res = await doFetch()
  // Self-hosted bearer token may have been revoked/expired — re-login once.
  if (res.status === 401 && !API_KEY && cachedToken) {
    cachedToken = null
    res = await doFetch()
  }
  if (!res.ok) {
    throw new Error(`Umami API ${res.status} for ${path}`)
  }
  return res.json()
}

// Umami returns metric buckets as [{ x: label, y: count }].
export type MetricRow = { x: string | null; y: number }

/**
 * Top-N metrics for a type. Umami renamed the pages metric type ('url' → 'path')
 * across versions, so fall back to the other name if the first one 400s.
 */
export async function umamiMetrics(
  startAt: number,
  endAt: number,
  type: string,
  limit = 10,
): Promise<MetricRow[]> {
  const params = { startAt, endAt, limit, timezone: TIMEZONE }
  const tryTypes = type === 'path' ? ['path', 'url'] : [type]
  let lastErr: unknown
  for (const t of tryTypes) {
    try {
      const rows = await umamiGet(`/websites/${WEBSITE_ID}/metrics`, { ...params, type: t })
      return Array.isArray(rows) ? rows : []
    } catch (err) {
      lastErr = err
    }
  }
  throw lastErr
}

// Stats fields arrive as plain numbers or { value, prev } depending on API version.
export const statValue = (v: unknown): number =>
  typeof v === 'number' ? v : typeof v === 'object' && v !== null ? Number((v as any).value) || 0 : 0

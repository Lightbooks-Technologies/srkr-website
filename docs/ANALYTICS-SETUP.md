# Website Analytics (Umami) — Setup Guide

The site uses **two** analytics systems:

1. **Vercel Web Analytics** — already enabled; private, viewable only in the Vercel dashboard.
2. **Umami** (privacy-friendly, no cookies) — powers the two public-facing features:
   - the **"online now" pill** on the right edge of every page (hidden until ≥ 5 visitors are active), and
   - the **`/analytics` page** — monthly visitors, page views, daily chart, top pages / countries / referrers, with a month selector.

Vercel Analytics has no public API, which is why Umami is used for anything shown on the site itself.

## How it works

```
Browser (srkrec.ac.in)                    SRKR CMS (Vercel)               Umami Cloud
  umami script  ───────────── page events ──────────────────────────────►  collects
  online pill   ──► GET /api/analytics/online   ──► /websites/:id/active ─►  (API key
  /analytics    ──► GET /api/analytics/summary  ──► /stats /pageviews ... ─►  stays in CMS)
```

The website is static, so it cannot hold the Umami API key. The CMS (already a
server on Vercel) proxies the Umami API and CDN-caches responses (30 s for the
live count, 10 min for monthly stats) so browser polling barely touches Umami's
rate limits.

## Plan choice

⚠️ **Umami Cloud's free (Hobby) tier does NOT include API keys** — API access
is a Pro feature (~$20/mo). Tracking + their dashboard are free, but our
widget and /analytics page need the API.

**Decision (2026-07-06): Umami Cloud Pro.** The website was created on
2026-07-06 — ID `bb31090e-6112-4614-81ff-0a6992cd4296`.

(Fallback if costs ever matter: self-host Umami on Vercel + Neon for $0 —
the CMS proxy also accepts `UMAMI_API_URL` + `UMAMI_USERNAME`/`UMAMI_PASSWORD`
for a self-hosted instance, and the site accepts `PUBLIC_UMAMI_SCRIPT_URL`.)

## One-time setup (Umami Cloud Pro)

### 1. Upgrade and create an API key

1. At <https://cloud.umami.is>: **Settings → Billing** → upgrade to **Pro**.
2. **Account → API keys → Create key** — copy the key (shown once).

### 2. Set environment variables on Vercel

**Website project** (the Astro site):

| Variable | Value |
| --- | --- |
| `PUBLIC_UMAMI_WEBSITE_ID` | `bb31090e-6112-4614-81ff-0a6992cd4296` |

Already set: `PUBLIC_CMS_URL` (the widget and /analytics page reuse it).
Optional: `PUBLIC_ONLINE_MIN_VISIBLE` — minimum live visitors before the pill
shows (default `5`).

**CMS project** (srkr-website-cms):

| Variable | Value |
| --- | --- |
| `UMAMI_API_KEY` | the API key from step 1 |
| `UMAMI_WEBSITE_ID` | `bb31090e-6112-4614-81ff-0a6992cd4296` |

Optional: `UMAMI_API_URL` (default `https://api.umami.is/v1`).

### 3. Redeploy both projects

Redeploy the site and the CMS so the env vars take effect. Done.

## Verifying

- `curl https://<cms-domain>/api/analytics/online` → `{"enabled":true,"online":N}`
- `curl "https://<cms-domain>/api/analytics/summary?month=2026-07"` → JSON with `stats`, `daily`, `topPages`…
- Open the site → within a minute Umami's dashboard shows your visit; the pill
  appears once ≥ 5 people are on the site.
- Visit `/analytics` for the monthly dashboard (noindex'd and excluded from the sitemap).

## Notes

- Everything fails soft: without env vars the endpoints return `{"enabled":false}`,
  the pill stays hidden, and `/analytics` shows a friendly "being set up" message.
- The tracking script only records the production domains
  (`data-domains="srkrec.ac.in,www.srkrec.ac.in"`), so localhost and preview
  deployments never pollute the numbers.
- Data starts from the day Umami goes live — the first month will look sparse.

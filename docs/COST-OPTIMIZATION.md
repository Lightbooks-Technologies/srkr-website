# Vercel Cost Optimization — SRKR Website

Living document. Records what drives our Vercel bill, what has already been
fixed, and the plan for moving static assets behind Cloudflare.

---

## 1. What we actually pay for

The site is a **fully static Astro build** — no adapter, no SSR, no serverless
functions. So we pay for **bandwidth**, not compute.

Confirmed from the Vercel billing API (`/v2/teams/<team>`, values in cents):

| Metric | Included | Overage |
|---|---|---|
| **Fast Data Transfer** (edge → user) | **1,000 GB** | **$0.15/GB** |
| Edge Requests | 10,000,000 | $2.00 / million |
| Fast Origin Transfer | 0 | $0.06/GB |
| Image Optimization | 0 | $0.05 / 1,000 transforms |
| Blob Data Transfer | 0 | **$0.05/GB** |

Plan: **Pro ("plus")**, 5 seats. Fixed cost ≈ $120/mo before usage.

> Fast Data Transfer is the only line item that matters for us. Everything
> below is about reducing bytes sent per visitor.

### Traffic baseline (July 2026, Vercel Web Analytics)

- **137,836 pageviews / 44,885 visitors**
- India: 82% of pageviews (113,698), 62% of visitors
- Device split: ~52% desktop, ~45% mobile
- Top pages: `/` (23,251 visitors), `/syllabus` (24,448 pv), `/404` (10,663 pv)

The visitor/pageview gap outside India (US 1.4 pv/visitor, CN 1.07, SG, HK) is
crawler traffic — roughly 13,000 near-single-pageview "visitors" per month.

---

## 2. Changes already applied

All of these are visually identical to users.

| Change | Before | After |
|---|---|---|
| Header emblem (loads on **every page**) | 3.0 MB PNG, 2055×2208 | **61 KB WebP** (446×480) + PNG fallback |
| Hero video, desktop | 12.5 MB | **5.6 MB** (CRF 30, audio stripped) |
| Hero video, mobile | 8.1 MB | **3.6 MB** |
| Hero poster | 2.2 MB PNG | **108 KB JPEG** |
| Dead video files (`home.mp4`, `home.mov`) | 79 MB, 0 references | **deleted** |
| 9 program photos stored as PNG | 14.6 MB | **4.5 MB JPEG** |
| 23 other oversized images | 142 MB | **43 MB** (max 1920px) |

Two structural fixes worth calling out:

1. **Both hero videos used to download.** The desktop and mobile `<video>`
   elements were both in the DOM, hidden only by CSS `display:none` — browsers
   still preload those. `src/pages/index.astro` now renders a **single**
   `<video preload="none">` whose source is chosen at runtime via
   `matchMedia`, so exactly one file is ever fetched.
2. **The videos carried an AAC audio track** despite being `muted loop`
   backgrounds. Audio is now stripped.

**Estimated saving: ~350–500 GB/month**, against a modelled ~700 GB–1.1 TB
baseline. That should put us back under the 1 TB allowance and take the
overage charge to zero, with ~3× headroom for traffic growth.

### Bot control (`public/robots.txt`)

Google and Bing keep full access so syllabus/newsletter PDFs still rank.
AI-training crawlers may read site content but are disallowed from
`/assets/documents/`, `/files/` and `/assets/video/`. Pure SEO-metrics
scrapers (Ahrefs, Semrush, MJ12, DotBot, BLEXBot, Bytespider, …) are blocked
outright.

> `robots.txt` is advisory. Abusive bots ignore it — see §4 for enforcement.

---

## 3. Cloudflare plan

**Why Cloudflare and not CloudFront:** India is CloudFront's most expensive
region (~$0.109/GB) — barely below Vercel's $0.15/GB, for far more plumbing.
Cloudflare's free plan is unmetered for standard web content, and R2 has
**zero egress fees**.

**Important ToS caveat:** Cloudflare's Self-Serve Subscription Agreement
§2.8 restricts serving disproportionate **non-HTML** content (video, large
file libraries) on the free plan. So the split must be:

- **Cloudflare CDN (free)** → HTML, CSS, JS, images
- **Cloudflare R2** → the 1.75 GB PDF library + hero video (**$0 egress**,
  ~$0.03/mo storage)

Do **not** proxy the whole PDF library through the free CDN.

### Phase 1 — Add the domain

1. Sign up at cloudflare.com → **Add a site** → `srkrec.ac.in` → **Free**.
2. Cloudflare imports existing DNS. **Audit every record before continuing** —
   especially:
   - **MX records (email!)** — these must stay **DNS only (grey cloud)**.
     Proxying mail records breaks email delivery.
   - TXT records (SPF, DKIM, domain verification) — leave as-is.
   - Any subdomains (CMS, LMS, alumni) — confirm each one imported.
3. Get the exact apex/`www` record values from **Vercel → Project → Settings →
   Domains** (Vercel has changed its recommended apex IP over time — read the
   current value from the dashboard rather than hardcoding one).
4. **Leave the Vercel records grey-clouded for now.**
5. Change nameservers at the registrar to the two Cloudflare NS. `.ac.in` is
   ERNET-administered, so allow extra propagation time; do this in a
   low-traffic window (early morning IST).

### Phase 2 — Verify, then enable the proxy

1. Wait until Vercel shows the domain as **Valid Configuration** while still
   grey-clouded.
2. Set **SSL/TLS → Overview → Full (strict)**. This is mandatory — anything
   less causes redirect loops against Vercel.
3. Enable **Always Use HTTPS**.
4. Only now switch apex + `www` to **Proxied (orange cloud)**.

> After proxying, Vercel's dashboard may flag the domain as misconfigured
> because the A record resolves to Cloudflare IPs. This is expected and does
> not break serving. Vercel Web Analytics keeps working (it is client-side),
> but server-side geo/IP will show Cloudflare addresses.

### Phase 3 — Cache rules (this is where the saving happens)

Cloudflare does **not** cache HTML by default. Since this site is fully
static, we can and should cache it.

| Rule | Match | Settings |
|---|---|---|
| 1. Immutable assets | `/_astro/*` | Eligible for cache, Edge TTL **1 year**, respect origin browser TTL |
| 2. Static assets | `/assets/*` or extension in `css js jpg jpeg png webp svg woff woff2 ttf ico` | Eligible for cache, Edge TTL **1 month** |
| 3. HTML | everything else | Cache Everything, Edge TTL **1 hour**, Browser TTL 0 |

Also enable **Caching → Tiered Cache** (free) to cut origin pulls, and
**Crawler Hints**.

**Deploy invalidation:** with rule 3, a Vercel deploy takes up to an hour to
appear. Either accept that, or purge on deploy — add a Vercel Deploy Hook or a
GitHub Action step calling:

```
POST https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache
Authorization: Bearer <CF_API_TOKEN>       # token scoped to Cache Purge only
{"purge_everything": true}
```

### Phase 4 — Move heavy files to R2

1. Create an R2 bucket, e.g. `srkr-files`.
2. Upload `public/files/` and `public/assets/documents/` (rclone or `wrangler
   r2 object put`).
3. Attach a **custom domain** to the bucket — e.g. `files.srkrec.ac.in`.
   R2 custom-domain egress is free.
4. Rewrite links. Either update the source, or add a Cloudflare **Transform
   Rule** rewriting `/files/*` and `/assets/documents/*` to the R2 host so no
   code changes are needed and old URLs keep working.
5. Once verified, drop those directories from the repo — this also cuts the
   deployment payload from ~2 GB to ~250 MB and speeds up builds.

---

## 4. Enforcement for bad bots

`robots.txt` only stops well-behaved crawlers. For the rest:

**Cloudflare (after migration):**
- **Bot Fight Mode** (free) — challenges obvious bots.
- One-click **Block AI Scrapers and Crawlers** toggle.
- WAF rule: block requests to `/files/*` and `/assets/documents/*` where
  `cf.client.bot` is false and the user agent matches known scrapers.
- Rate-limit PDF paths (e.g. 20 requests/minute per IP).

**Vercel WAF (available now, before any DNS change):**
Project → Firewall → Custom Rules. Useful starting rule: block requests where
path starts with `/files/` or `/assets/documents/` **and** user agent contains
any of `AhrefsBot|SemrushBot|MJ12bot|DotBot|BLEXBot|Bytespider|DataForSeoBot`.

Do **not** geo-block non-India traffic outright — 18% of pageviews and a
meaningful share of prospective-student and alumni traffic come from abroad.

---

## 5. Alternatives considered

| Destination for heavy files | Egress | Verdict |
|---|---|---|
| Vercel static (current) | $0.15/GB | baseline |
| AWS CloudFront (India) | ~$0.109/GB | not worth the complexity |
| Supabase Storage | $0.09/GB after allowance | **rejected — see below** |
| Vercel Blob | $0.05/GB | easiest — no DNS change |
| **Cloudflare R2** | **$0** | **recommended** |

### Why not Supabase

There is no dedicated `srkr` Supabase project. The org `aasaan` contains
`medvault-dev`, `vaylo-prod`, **`DeployU Prod`**, `DeployU Dev`, `vaylo-dev`
and `DhruvaDev` — SRKR exists as course content *inside DeployU Prod*, our
production LMS database. Three reasons this is the wrong destination:

1. **Supabase quotas are per-organization, not per-project.** Website PDF
   traffic (100–300 GB/mo) would draw down the same pooled egress allowance
   that DeployU Prod depends on. That moves cost onto the LMS budget and
   risks overage on a production system to save money on a marketing site.
2. **Wrong region.** DeployU Prod is in `us-east-1`. Our traffic is 82% India
   and Vercel currently serves these files from edge POPs including Mumbai.
   Routing student PDF downloads through Virginia is a latency regression —
   the opposite of the "no user impact" goal.
3. **Pricing is not competitive** — $0.09/GB is worse than Vercel Blob and far
   worse than R2's $0.

If we offload, the target is R2 (or Vercel Blob if we want to avoid any DNS
change). Never the LMS's Supabase org.

---

## 6. Monitoring

- **Vercel → Usage → Fast Data Transfer** is the number to watch. Target:
  stay under 1,000 GB/month.
- The billing API (`GET /v2/teams/<team>`) exposes `billing.invoiceItems` with
  live quantities and thresholds.
- Re-check the asset audit after any large content upload:

```bash
# largest files in the deploy
find public -type f -exec du -m {} + | sort -rn | head -30

# total by extension
find public -type f -exec du -k {} + | awk '{ext=tolower($2); sub(/.*\./,"",ext); s[ext]+=$1} END {for (e in s) printf "%10.1f MB  .%s\n", s[e]/1024, e}' | sort -rn | head
```

Rules of thumb:
- Nothing loaded on every page should exceed ~100 KB.
- No image wider than 1920px unless it is a genuine full-bleed hero.
- Photos are JPEG or WebP, never PNG. PNG is for logos and transparency only.
- Background video: no audio track, CRF 30, and never more than one variant
  downloaded per visitor.

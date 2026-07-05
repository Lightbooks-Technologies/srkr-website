# SRKR CMS — deployment guide

The CMS (`cms/`) is a **Payload 3 + Next.js** app. It is deployed as its **own
Vercel project**, separate from the Astro website. The website reads published
Events & News from this CMS over its REST API.

```
┌──────────────┐   reads /api/events, /api/news   ┌──────────────────────┐
│ Astro site    │ ───────────────────────────────▶ │ SRKR CMS (this app)   │
│ (Vercel #1)   │                                   │ Payload admin + API   │
│ srkrec.ac.in  │ ◀─ Deploy Hook (rebuild) ──────── │ Neon PG + Vercel Blob │
└──────────────┘                                    └──────────────────────┘
```

## 1. Provision the database (Neon)
1. Create a project at https://neon.tech (free tier is fine).
2. Copy the **pooled** connection string (looks like
   `postgres://user:pass@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require`).

## 2. Provision file storage (Vercel Blob)
1. In the Vercel dashboard → **Storage → Create → Blob**.
2. Connect it to the CMS project; Vercel injects `BLOB_READ_WRITE_TOKEN`
   automatically (or copy it into env manually).

## 3. Deploy the CMS to Vercel
1. **New Project** → import this same GitHub repo.
2. Set **Root Directory = `cms`** (important — not the repo root).
3. Framework preset: **Next.js** (auto-detected).
4. Add the environment variables from `.env.example` (see list below).
5. Deploy. Then open `https://<cms-domain>/admin` and create the first admin user.

## 4. Point the website at the CMS
In the **Astro** Vercel project, add:
```
PUBLIC_CMS_URL=https://<your-cms-domain>
```
Redeploy the website. Add the same CMS domain and the website domain to the
CMS's `CORS_ORIGINS`.

## 5. Auto-rebuild on publish (recommended)
1. In the **Astro** Vercel project → Settings → **Deploy Hooks** → create one
   (e.g. "CMS publish") for the production branch. Copy the URL.
2. Set it on the **CMS** project as `SITE_DEPLOY_HOOK_URL`.
   Now publishing/unpublishing content rebuilds the site automatically (~1–2 min).

## Environment variables (CMS project)
| Variable | Required | Purpose |
|---|---|---|
| `PAYLOAD_SECRET` | ✅ | Signs auth tokens. `openssl rand -base64 32` |
| `DATABASE_URI` | ✅ | Neon Postgres pooled connection string |
| `BLOB_READ_WRITE_TOKEN` | ✅ | Vercel Blob token for uploads |
| `CORS_ORIGINS` | ✅ | Comma-separated allowed origins (website + CMS domains) |
| `SITE_DEPLOY_HOOK_URL` | ➖ | Vercel Deploy Hook to rebuild the site on publish |

## Environment variables (Astro website project)
| Variable | Required | Purpose |
|---|---|---|
| `PUBLIC_CMS_URL` | ✅ | Base URL of the deployed CMS (e.g. `https://cms.srkrec.ac.in`) |

## Notes
- Local dev uses SQLite + local disk automatically (no DB/token needed) — just
  `npm install && npm run dev` in `cms/`, admin at http://localhost:3001/admin.
- The config auto-selects Postgres when `DATABASE_URI` starts with `postgres://`.
- Rotate the prototype passwords before go-live; create real accounts in `/admin`.

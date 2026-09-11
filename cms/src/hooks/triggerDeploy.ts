import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

// Ping the site's Vercel Deploy Hook so the static site rebuilds and picks up
// the change. No-op if SITE_DEPLOY_HOOK_URL isn't configured (e.g. local dev).
const rebuild = async (req: {
  payload: { logger: { info: (m: string) => void; error: (m: string) => void } }
}) => {
  const url = process.env.SITE_DEPLOY_HOOK_URL
  if (!url) return
  try {
    const res = await fetch(url, { method: 'POST' })
    if (!res.ok) {
      // A revoked/regenerated hook URL answers with an error status, not a
      // network failure — without this check the site silently stops syncing.
      req.payload.logger.error(`Deploy hook responded ${res.status}: ${await res.text()}`)
    } else {
      req.payload.logger.info('Deploy hook triggered — site rebuilding (~2 min)')
    }
  } catch (err) {
    req.payload.logger.error(`Deploy hook failed: ${String(err)}`)
  }
}

// Only rebuild when the change affects PUBLISHED content (ignore draft edits).
export const rebuildOnPublish: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (doc?.status === 'published' || previousDoc?.status === 'published') {
    await rebuild(req)
  }
  return doc
}

export const rebuildOnDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (doc?.status === 'published') {
    await rebuild(req)
  }
  return doc
}

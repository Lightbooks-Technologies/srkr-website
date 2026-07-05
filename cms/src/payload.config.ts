import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Events } from './collections/Events'
import { News } from './collections/News'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

// Database: Postgres (Neon) in production, local SQLite for zero-config dev.
// Accept any of the common connection-string env names — DATABASE_URI (manual),
// or DATABASE_URL / POSTGRES_URL (what the Neon–Vercel integration injects).
// Prefer the pooled variants. Trim + strip stray quotes from the pasted value.
const rawDbURI = (
  process.env.DATABASE_URI ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  ''
)
  .trim()
  .replace(/^["']|["']$/g, '')
const databaseURI = rawDbURI || 'file:./cms.db'
const usePostgres = /^postgres(ql)?:\/\//i.test(databaseURI)

// Fail loudly on Vercel if we'd silently fall back to (unwritable) SQLite.
// (Local dev is unaffected and keeps using SQLite.)
if (process.env.VERCEL && !usePostgres) {
  throw new Error(
    'No Postgres connection string found on Vercel. Set DATABASE_URI (or ' +
      'DATABASE_URL / POSTGRES_URL) to your Neon pooled connection string ' +
      '(starts with postgres://), enabled for the Production environment.',
  )
}
const db = usePostgres
  ? postgresAdapter({
      pool: { connectionString: databaseURI },
      // Auto-create/sync tables on boot. Enable for the first prod deploy
      // (Payload disables push in production by default) via PAYLOAD_DB_PUSH=true.
      push: process.env.PAYLOAD_DB_PUSH === 'true',
    })
  : sqliteAdapter({ client: { url: databaseURI } })

// Storage: Vercel Blob in production (when a token is set), else local disk for dev.
const plugins = []
if (process.env.BLOB_READ_WRITE_TOKEN) {
  plugins.push(
    vercelBlobStorage({
      enabled: true,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/graphics/Logo',
        Icon: '/components/graphics/Icon',
      },
    },
    meta: {
      titleSuffix: '· SRKR Admin',
      title: 'SRKR Admin',
      description: 'SRKR Engineering College — content administration',
      icons: [{ rel: 'icon', type: 'image/png', url: '/srkr-logo.png' }],
    },
  },
  collections: [Users, Media, Events, News],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db,
  plugins,
  sharp,
  cors: corsOrigins,
  csrf: corsOrigins,
})

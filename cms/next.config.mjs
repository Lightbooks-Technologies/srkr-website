import { withPayload } from '@payloadcms/next/withPayload'
import { fileURLToPath } from 'url'
import path from 'path'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the build root to this folder (repo has multiple lockfiles).
  turbopack: { root: dirname },
}

export default withPayload(nextConfig)

#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/growth.ts',
  'components/StorePublicLanding.tsx',
  'components/PromoTextGenerator.tsx',
  'app/store/public/[id]/page.tsx',
  'app/features/[slug]/page.tsx',
  'app/ranking/page.tsx',
  'app/store/blog/page.tsx',
  'app/store/growth/page.tsx',
  'docs/V4_2_STORE_GROWTH_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const growth = fs.readFileSync(path.join(process.cwd(), 'lib/growth.ts'), 'utf8')
const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const checks = [
  ['store public data exists', growth.includes('getStorePublicData')],
  ['feature data exists', growth.includes('getFeatureData')],
  ['ranking data exists', growth.includes('getRankingData')],
  ['promo text generator exists', growth.includes('createAiPromoText')],
  ['store blog table exists', schema.includes('store_blog_posts')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

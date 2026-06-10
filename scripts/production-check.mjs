#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/env-check.ts',
  'app/admin/production/page.tsx',
  'app/api/production/check/route.ts',
  'vercel.json',
  'docs/V2_1_PRODUCTION_READY_REPORT.md',
  'docs/PRODUCTION_CHECKLIST.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const env = fs.readFileSync(path.join(process.cwd(), 'lib/env-check.ts'), 'utf8')
const checks = [
  ['checks Supabase', env.includes('NEXT_PUBLIC_SUPABASE_URL')],
  ['checks OpenAI', env.includes('OPENAI_API_KEY')],
  ['checks LINE', env.includes('LINE_CHANNEL_ACCESS_TOKEN')],
  ['checks Stripe', env.includes('STRIPE_SECRET_KEY')],
  ['checks score', env.includes('getReadinessScore')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/concierge.ts',
  'components/ConciergeChat.tsx',
  'components/RecommendationCard.tsx',
  'app/concierge/page.tsx',
  'app/api/concierge/route.ts',
  'docs/V4_0_AI_CONCIERGE_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const concierge = fs.readFileSync(path.join(process.cwd(), 'lib/concierge.ts'), 'utf8')
const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const checks = [
  ['concierge state exists', concierge.includes('ConciergeState')],
  ['recommendations exist', concierge.includes('getConciergeRecommendations')],
  ['comparison exists', concierge.includes('comparison')],
  ['concierge sessions table exists', schema.includes('concierge_sessions')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

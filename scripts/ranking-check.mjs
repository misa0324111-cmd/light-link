#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/ai-ranking.ts',
  'components/AiRankingTabs.tsx',
  'app/ranking/page.tsx',
  'app/api/ranking/route.ts',
  'app/admin/ranking/page.tsx',
  'docs/V4_3_AI_RANKING_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const ranking = fs.readFileSync(path.join(process.cwd(), 'lib/ai-ranking.ts'), 'utf8')
const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const checks = [
  ['ranking score exists', ranking.includes('calculateRankingScore')],
  ['ranking groups exist', ranking.includes('getAllRankingGroups')],
  ['metrics exist', ranking.includes('getTalentMetrics')],
  ['ranking snapshots table exists', schema.includes('ranking_snapshots')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

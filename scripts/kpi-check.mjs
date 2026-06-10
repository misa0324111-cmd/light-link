#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/kpi.ts',
  'components/KpiDashboard.tsx',
  'app/admin/kpi/page.tsx',
  'app/api/admin/kpi/route.ts',
  'docs/V2_2_KPI_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const kpi = fs.readFileSync(path.join(process.cwd(), 'lib/kpi.ts'), 'utf8')
const checks = [
  ['analytics events table exists', schema.includes('analytics_events')],
  ['kpi cards exist', kpi.includes('getSampleKpis')],
  ['funnel exists', kpi.includes('getSampleFunnel')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

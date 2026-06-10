#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/safety.ts',
  'components/ReportForm.tsx',
  'app/terms/page.tsx',
  'app/privacy/page.tsx',
  'app/report/page.tsx',
  'app/admin/reports/page.tsx',
  'app/admin/safety/page.tsx',
  'app/api/reports/route.ts',
  'docs/V5_1_SAFETY_COMPLIANCE_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const safety = fs.readFileSync(path.join(process.cwd(), 'lib/safety.ts'), 'utf8')
const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const checks = [
  ['report reasons exist', safety.includes('reportReasons')],
  ['safety checklist exists', safety.includes('getSafetyChecklist')],
  ['create report exists', safety.includes('createReport')],
  ['safety reports table exists', schema.includes('safety_reports')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

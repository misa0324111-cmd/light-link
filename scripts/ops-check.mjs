#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/operations.ts',
  'components/OperationsDashboard.tsx',
  'components/AnalyticsScript.tsx',
  'app/admin/operations/page.tsx',
  'app/api/operations/check/route.ts',
  'docs/V5_0_PRODUCTION_OPERATIONS_REPORT.md',
  'docs/LAUNCH_RUNBOOK.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const operations = fs.readFileSync(path.join(process.cwd(), 'lib/operations.ts'), 'utf8')
const layout = fs.readFileSync(path.join(process.cwd(), 'app/layout.tsx'), 'utf8')
const checks = [
  ['operation checks exist', operations.includes('getOperationChecks')],
  ['operation score exists', operations.includes('getOperationScore')],
  ['launch checklist exists', operations.includes('getLaunchChecklist')],
  ['analytics script installed', layout.includes('AnalyticsScript')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

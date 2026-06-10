#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'docs/USER_GUIDE.md',
  'docs/STORE_ADMIN_GUIDE.md',
  'docs/ADMIN_GUIDE.md',
  'lib/final-check.ts',
  'app/final-check/page.tsx',
  'docs/V3_1_OPERATION_MANUALS_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const finalCheck = fs.readFileSync(path.join(process.cwd(), 'lib/final-check.ts'), 'utf8')
const readme = fs.readFileSync(path.join(process.cwd(), 'README.md'), 'utf8')
const checks = [
  ['final check items exist', finalCheck.includes('getFinalCheckItems')],
  ['user guide linked', readme.includes('USER_GUIDE')],
  ['store guide linked', readme.includes('STORE_ADMIN_GUIDE')],
  ['admin guide linked', readme.includes('ADMIN_GUIDE')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

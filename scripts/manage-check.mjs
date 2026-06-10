#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'components/ManagedTalentList.tsx',
  'components/ReservationStatusList.tsx',
  'app/store-admin/talents/page.tsx',
  'app/store-admin/reservations/page.tsx',
  'docs/V1_7_MANAGE_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const repo = fs.readFileSync(path.join(process.cwd(), 'lib/repositories.ts'), 'utf8')
const checks = [
  ['updateTalent exists', repo.includes('updateTalent')],
  ['deleteTalent exists', repo.includes('deleteTalent')],
  ['updateReservationStatus exists', repo.includes('updateReservationStatus')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

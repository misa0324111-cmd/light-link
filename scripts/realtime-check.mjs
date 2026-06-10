#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/realtime.ts',
  'components/NotificationBadge.tsx',
  'components/RealtimeNoticeToast.tsx',
  'app/store-admin/page.tsx',
  'app/admin/page.tsx',
  'docs/V2_9_REALTIME_NOTIFICATIONS_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const realtime = fs.readFileSync(path.join(process.cwd(), 'lib/realtime.ts'), 'utf8')
const storeAdmin = fs.readFileSync(path.join(process.cwd(), 'app/store-admin/page.tsx'), 'utf8')
const checks = [
  ['Supabase channel exists', realtime.includes('.channel(')],
  ['postgres changes exists', realtime.includes('postgres_changes')],
  ['notification badge used', storeAdmin.includes('NotificationBadge')],
  ['toast used', storeAdmin.includes('RealtimeNoticeToast')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

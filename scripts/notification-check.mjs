#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/notifications.ts',
  'components/NotificationCenter.tsx',
  'app/store-admin/notifications/page.tsx',
  'app/admin/notifications/page.tsx',
  'app/api/notifications/route.ts',
  'app/api/notifications/reservation/route.ts',
  'docs/V2_7_NOTIFICATIONS_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const notifications = fs.readFileSync(path.join(process.cwd(), 'lib/notifications.ts'), 'utf8')
const checks = [
  ['notifications table exists', schema.includes('public.notifications')],
  ['create notification exists', notifications.includes('createNotification')],
  ['mark read exists', notifications.includes('markNotificationRead')],
  ['reservation notification hook exists', fs.readFileSync(path.join(process.cwd(), 'components/ReservationForm.tsx'), 'utf8').includes('/api/notifications/reservation')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

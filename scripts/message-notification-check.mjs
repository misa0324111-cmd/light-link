#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/email.ts',
  'lib/message-templates.ts',
  'lib/message-dispatch.ts',
  'app/admin/message-test/page.tsx',
  'app/api/notifications/reservation/route.ts',
  'docs/V2_8_MESSAGE_NOTIFICATIONS_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const email = fs.readFileSync(path.join(process.cwd(), 'lib/email.ts'), 'utf8')
const dispatch = fs.readFileSync(path.join(process.cwd(), 'lib/message-dispatch.ts'), 'utf8')
const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const checks = [
  ['Resend support exists', email.includes('RESEND_API_KEY')],
  ['Email send exists', dispatch.includes('sendEmail')],
  ['LINE send exists', dispatch.includes('sendLineNotify')],
  ['Notification create exists', dispatch.includes('createNotification')],
  ['dispatch logs table exists', schema.includes('notification_dispatch_logs')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

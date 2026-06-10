#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/line.ts',
  'lib/line-client.ts',
  'components/LineCta.tsx',
  'app/line/page.tsx',
  'app/line/complete/page.tsx',
  'app/api/line/notify/route.ts',
  'app/api/line/webhook/route.ts',
  'docs/V1_9_LINE_FLOW_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const line = fs.readFileSync(path.join(process.cwd(), 'lib/line.ts'), 'utf8')
const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const checks = [
  ['LINE token support exists', line.includes('LINE_CHANNEL_ACCESS_TOKEN')],
  ['LINE add friend URL exists', line.includes('NEXT_PUBLIC_LINE_ADD_FRIEND_URL')],
  ['line events table exists', schema.includes('line_events')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/auth.ts',
  'components/AuthGate.tsx',
  'components/UserStatus.tsx',
  'app/login/page.tsx',
  'app/role/page.tsx',
  'app/store-admin/page.tsx',
  'app/admin/page.tsx',
  'docs/V1_5_AUTH_ROLES_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const gate = fs.readFileSync(path.join(process.cwd(), 'components/AuthGate.tsx'), 'utf8')
const storeAdmin = fs.readFileSync(path.join(process.cwd(), 'app/store-admin/page.tsx'), 'utf8')
const admin = fs.readFileSync(path.join(process.cwd(), 'app/admin/page.tsx'), 'utf8')

const checks = [
  ['gate blocks unauthenticated users', gate.includes('ログインが必要です')],
  ['gate blocks unauthorized users', gate.includes('権限がありません')],
  ['store admin allows store_admin', storeAdmin.includes("'store_admin'")],
  ['admin allows admin', admin.includes("'admin'")],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

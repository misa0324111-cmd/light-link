#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/store-scope.ts',
  'lib/auth.ts',
  'components/AuthGate.tsx',
  'components/UserStatus.tsx',
  'supabase/schema.sql',
  'docs/V1_6_SUPABASE_AUTH_STORE_SCOPE_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8').toLowerCase()
const storeScope = fs.readFileSync(path.join(process.cwd(), 'lib/store-scope.ts'), 'utf8')
const auth = fs.readFileSync(path.join(process.cwd(), 'lib/auth.ts'), 'utf8')

const checks = [
  ['store_members table exists', schema.includes('public.store_members') && schema.includes('store_id')],
  ['profiles store_id exists', schema.includes('profiles') && schema.includes('store_id')],
  ['store scope helper exists', storeScope.includes('getCurrentStoreId')],
  ['supabase auth helper exists', auth.includes('signInWithOtp')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

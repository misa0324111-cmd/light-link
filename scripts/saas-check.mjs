#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/saas.ts',
  'components/StoreSignupForm.tsx',
  'components/StoreApplicationsAdmin.tsx',
  'components/StoreSaasDashboard.tsx',
  'app/store/signup/page.tsx',
  'app/store/onboarding/page.tsx',
  'app/store/dashboard/page.tsx',
  'app/admin/store-applications/page.tsx',
  'docs/V4_1_SAAS_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const saas = fs.readFileSync(path.join(process.cwd(), 'lib/saas.ts'), 'utf8')
const checks = [
  ['store applications table exists', schema.includes('store_applications')],
  ['create application exists', saas.includes('createStoreApplication')],
  ['status update exists', saas.includes('updateStoreApplicationStatus')],
  ['onboarding steps exist', saas.includes('onboardingSteps')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

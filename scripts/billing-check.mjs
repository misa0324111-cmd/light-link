#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/billing.ts',
  'components/BillingPlans.tsx',
  'app/billing/page.tsx',
  'app/billing/success/page.tsx',
  'app/billing/cancel/page.tsx',
  'app/api/billing/checkout/route.ts',
  'app/api/billing/webhook/route.ts',
  'docs/V2_0_BILLING_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const billing = fs.readFileSync(path.join(process.cwd(), 'lib/billing.ts'), 'utf8')
const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const checks = [
  ['Stripe secret key support exists', billing.includes('STRIPE_SECRET_KEY')],
  ['Checkout Sessions API exists', billing.includes('checkout/sessions')],
  ['billing subscriptions table exists', schema.includes('billing_subscriptions')],
  ['plans exist', billing.includes('standard') && billing.includes('premium')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

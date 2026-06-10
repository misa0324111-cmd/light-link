#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/repositories.ts',
  'components/TalentForm.tsx',
  'components/ReservationForm.tsx',
  'components/ReservationList.tsx',
  'app/store-admin/talents/page.tsx',
  'app/store-admin/reservations/page.tsx',
  'supabase/schema.sql',
  'supabase/seed.sql',
  'docs/V1_4_SUPABASE_CRUD_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

process.exit(ok ? 0 : 1)

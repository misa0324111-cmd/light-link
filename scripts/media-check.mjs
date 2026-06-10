#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/media.ts',
  'components/TalentMediaManager.tsx',
  'app/store-admin/media/page.tsx',
  'app/store-admin/media/[talentId]/page.tsx',
  'docs/V2_3_MEDIA_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const media = fs.readFileSync(path.join(process.cwd(), 'lib/media.ts'), 'utf8')
const checks = [
  ['talent_media table exists', schema.includes('talent_media')],
  ['storage bucket exists', schema.includes('talent-media')],
  ['signed upload exists', media.includes('createSignedUploadUrl')],
  ['media manager exists', fs.readFileSync(path.join(process.cwd(), 'components/TalentMediaManager.tsx'), 'utf8').includes('TalentMediaManager')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

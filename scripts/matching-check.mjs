#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/matching.ts',
  'components/MatchingWizard.tsx',
  'app/matching/page.tsx',
  'app/api/matching/route.ts',
  'docs/V2_4_AI_MATCHING_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const matching = fs.readFileSync(path.join(process.cwd(), 'lib/matching.ts'), 'utf8')
const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const checks = [
  ['matching engine exists', matching.includes('runMatching')],
  ['match score exists', matching.includes('calculateMatch')],
  ['questions exist', matching.includes('matchingQuestions')],
  ['matching profiles table exists', schema.includes('matching_profiles')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

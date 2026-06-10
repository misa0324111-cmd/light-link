#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/preferences.ts',
  'components/FavoriteButton.tsx',
  'components/ViewTracker.tsx',
  'components/PreferenceDashboard.tsx',
  'app/preferences/page.tsx',
  'app/favorites/page.tsx',
  'docs/V2_5_PREFERENCE_LEARNING_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const prefs = fs.readFileSync(path.join(process.cwd(), 'lib/preferences.ts'), 'utf8')
const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const checks = [
  ['favorites exist', prefs.includes('toggleFavorite')],
  ['view history exists', prefs.includes('addViewHistory')],
  ['matching history exists', prefs.includes('saveMatchingHistory')],
  ['user_preferences table exists', schema.includes('user_preferences')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

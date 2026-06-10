#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = ['app/login/page.tsx', 'lib/supabase.ts']
let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}
process.exit(ok ? 0 : 1)

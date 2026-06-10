#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'README.md',
  'docs/RELEASE_NOTES_V3.md',
  'docs/DEPLOYMENT_GUIDE.md',
  'docs/PRODUCTION_CHECKLIST.md',
  'app/release/page.tsx',
  'app/api/release/health/route.ts',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
const readme = fs.readFileSync(path.join(process.cwd(), 'README.md'), 'utf8')
const checks = [
  ['version is v3 or later', Number(String(pkg.version).split('.')[0]) >= 3],
  ['README mentions AI matching', readme.includes('AIマッチング')],
  ['deployment guide exists', fs.existsSync(path.join(process.cwd(), 'docs/DEPLOYMENT_GUIDE.md'))],
  ['release health exists', fs.existsSync(path.join(process.cwd(), 'app/api/release/health/route.ts'))],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

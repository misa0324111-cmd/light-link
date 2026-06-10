#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/seo.ts',
  'components/JsonLd.tsx',
  'app/sitemap.ts',
  'app/robots.ts',
  'public/og-placeholder.svg',
  'docs/V2_6_SEO_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const layout = fs.readFileSync(path.join(process.cwd(), 'app/layout.tsx'), 'utf8')
const seo = fs.readFileSync(path.join(process.cwd(), 'lib/seo.ts'), 'utf8')
const checks = [
  ['metadata exists', layout.includes('metadata')],
  ['json ld exists', layout.includes('JsonLd')],
  ['organization schema exists', seo.includes('Organization')],
  ['website schema exists', seo.includes('WebSite')],
  ['talent schema exists', seo.includes('getJsonLdTalent')],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

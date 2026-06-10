#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
const required = [
  'package.json','tsconfig.json','next.config.mjs','app/layout.tsx','app/page.tsx',
  'app/welcome/page.tsx','app/chat/page.tsx','app/search/page.tsx','app/talents/[id]/page.tsx',
  'app/reservation/new/page.tsx','app/api/health/route.ts','lib/data.ts','lib/ai.ts',
  'components/Header.tsx','components/BottomNav.tsx'
]
let ok=true
for (const file of required) {
  const exists=fs.existsSync(path.join(process.cwd(),file))
  console.log(`${exists?'✓':'✗'} ${file}`)
  if(!exists) ok=false
}
process.exit(ok?0:1)

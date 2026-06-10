#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/openai.ts',
  'lib/chat-history.ts',
  'components/AiChatBox.tsx',
  'app/api/ai/chat/route.ts',
  'docs/V1_8_OPENAI_CHAT_HISTORY_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const openai = fs.readFileSync(path.join(process.cwd(), 'lib/openai.ts'), 'utf8')
const schema = fs.readFileSync(path.join(process.cwd(), 'supabase/schema.sql'), 'utf8')
const checks = [
  ['OpenAI API integration exists', openai.includes('api.openai.com/v1/chat/completions')],
  ['OPENAI_API_KEY support exists', openai.includes('OPENAI_API_KEY')],
  ['chat history table exists', schema.includes('ai_chat_histories')],
  ['fallback mode exists', fs.readFileSync(path.join(process.cwd(), 'app/api/ai/chat/route.ts'), 'utf8').includes("mode: 'rule'")],
]

for (const [label, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${label}`)
  if (!pass) ok = false
}

process.exit(ok ? 0 : 1)

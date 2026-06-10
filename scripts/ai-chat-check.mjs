#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const required = [
  'lib/ai-chat.ts',
  'components/AiChatBox.tsx',
  'app/chat/page.tsx',
  'app/api/ai/chat/route.ts',
  'docs/V1_3_AI_CHAT_REPORT.md',
]

let ok = true
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`${exists ? '✓' : '✗'} ${file}`)
  if (!exists) ok = false
}

const chat = fs.readFileSync(path.join(process.cwd(), 'lib/ai-chat.ts'), 'utf8')
const hasParser = chat.includes('parseUserPreference') && chat.includes('createAiReply')
console.log(`${hasParser ? '✓' : '✗'} AI parser exists`)
if (!hasParser) ok = false

process.exit(ok ? 0 : 1)

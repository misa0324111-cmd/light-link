import { NextRequest, NextResponse } from 'next/server'
import { createAiReply } from '@/lib/ai-chat'
import { extractPreferenceWithOpenAI } from '@/lib/openai'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const text = String(body.text ?? '')

  const base = createAiReply(text)
  const openai = await extractPreferenceWithOpenAI(text)

  if (!openai) {
    return NextResponse.json({
      ok: true,
      mode: 'rule',
      data: base,
    })
  }

  const merged = {
    ...base,
    parsed: {
      ...base.parsed,
      area: openai.area ?? base.parsed.area,
      mood: openai.mood ?? base.parsed.mood,
      budget: openai.budget ?? base.parsed.budget,
      timing: openai.timing ?? base.parsed.timing,
      confidence: openai.confidence,
      extracted: openai.extracted.length ? openai.extracted : base.parsed.extracted,
    },
    reply: `AIが希望条件を解析しました。おすすめ順に候補を表示します。`,
  }

  return NextResponse.json({
    ok: true,
    mode: 'openai',
    data: merged,
  })
}

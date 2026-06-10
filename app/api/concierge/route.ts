import { NextRequest, NextResponse } from 'next/server'
import {
  getConciergeRecommendations,
  initialConciergeState,
  updateConciergeState,
} from '@/lib/concierge'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const messages = Array.isArray(body.messages) ? body.messages : []

  const texts = messages
    .map((m: any) => String(m.text ?? ''))
    .filter(Boolean)

  const state = texts.reduce(
    (current: typeof initialConciergeState, text: string) =>
      updateConciergeState(current, text),
    initialConciergeState
  )

  const recommendations = getConciergeRecommendations(state)

  return NextResponse.json({
    ok: true,
    data: {
      state,
      recommendations,
    },
  })
}
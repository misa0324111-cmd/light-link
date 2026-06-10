import { NextRequest, NextResponse } from 'next/server'
import { createDefaultAnswer, runMatching } from '@/lib/matching'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const answer = { ...createDefaultAnswer(), ...body }
  const results = runMatching(answer)

  return NextResponse.json({
    ok: true,
    data: { answer, results },
  })
}

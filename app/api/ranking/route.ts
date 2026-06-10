import { NextRequest, NextResponse } from 'next/server'
import { getAiRanking, getAllRankingGroups, type RankingType } from '@/lib/ai-ranking'

export async function GET(req: NextRequest) {
  const type = (req.nextUrl.searchParams.get('type') || 'all') as RankingType | 'all'

  if (type === 'all') {
    return NextResponse.json({ ok: true, data: getAllRankingGroups() })
  }

  return NextResponse.json({
    ok: true,
    data: getAiRanking(type),
  })
}

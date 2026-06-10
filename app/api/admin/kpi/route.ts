import { NextResponse } from 'next/server'
import { getSampleFunnel, getSampleKpis } from '@/lib/kpi'

export async function GET() {
  return NextResponse.json({
    ok: true,
    data: {
      cards: getSampleKpis(),
      funnel: getSampleFunnel(),
    },
  })
}

import { NextRequest, NextResponse } from 'next/server'
import { createReport } from '@/lib/safety'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const report = createReport({
    targetType: String(body.targetType ?? 'general'),
    targetId: body.targetId,
    reason: body.reason ?? 'other',
    detail: String(body.detail ?? ''),
  })

  return NextResponse.json({ ok: true, data: report })
}

import { NextRequest, NextResponse } from 'next/server'
import { sendLineNotify } from '@/lib/line'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const result = await sendLineNotify({
    to: body.to,
    message: String(body.message ?? 'LIGHT LINKからのお知らせです。'),
  })

  return NextResponse.json({
    ok: result.ok,
    data: result,
  })
}

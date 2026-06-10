import { NextRequest, NextResponse } from 'next/server'
import { createNotification, listNotifications } from '@/lib/notifications'

export async function GET() {
  const rows = await listNotifications()
  return NextResponse.json({ ok: true, data: rows })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const created = await createNotification({
    type: body.type ?? 'system',
    title: String(body.title ?? '通知'),
    message: String(body.message ?? ''),
    storeId: body.storeId,
  })

  return NextResponse.json({ ok: true, data: created })
}

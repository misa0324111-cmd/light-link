import { NextRequest, NextResponse } from 'next/server'
import { dispatchReservationNotification } from '@/lib/message-dispatch'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))

  const result = await dispatchReservationNotification({
    customerName: body.customerName,
    talentName: body.talentName,
    requestedAt: body.requestedAt,
    phone: body.phone,
    note: body.note,
    storeId: body.storeId,
    lineTo: body.lineTo,
  })

  return NextResponse.json({ ok: true, data: result })
}

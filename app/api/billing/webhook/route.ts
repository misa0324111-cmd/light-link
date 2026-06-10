import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')
  return NextResponse.json({ ok: true, received: true, hasSignature: Boolean(signature), bytes: body.length })
}

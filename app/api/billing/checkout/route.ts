import { NextRequest, NextResponse } from 'next/server'
import { createStripeCheckoutSession, type BillingPlan } from '@/lib/billing'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const plan = String(body.plan ?? 'free') as BillingPlan
  const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const session = await createStripeCheckoutSession({
    plan,
    storeId: body.storeId,
    successUrl: `${origin}/billing/success`,
    cancelUrl: `${origin}/billing/cancel`,
  })

  return NextResponse.json({ ok: true, data: session })
}

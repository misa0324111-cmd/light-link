export type BillingPlan = 'free' | 'standard' | 'premium'

export type PlanInfo = {
  id: BillingPlan
  name: string
  price: string
  description: string
  features: string[]
  priceId?: string
}

export const plans: PlanInfo[] = [
  { id: 'free', name: '無料', price: '¥0', description: '動作確認・初期設定向け', features: ['AIチャット確認', 'サンプル掲載', '基本管理画面'] },
  { id: 'standard', name: 'スタンダード', price: '¥19,800/月', description: '通常運用向け', features: ['キャスト管理', '予約管理', 'LINE導線', 'AI推薦表示'], priceId: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID },
  { id: 'premium', name: 'プレミアム', price: '¥49,800/月', description: '集客強化向け', features: ['上位表示枠', 'AI優先推薦', '分析強化', '優先サポート'], priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID },
]

export function getPlan(id: BillingPlan) {
  return plans.find((plan) => plan.id === id) ?? plans[0]
}

export async function createStripeCheckoutSession(input: {
  plan: BillingPlan
  storeId?: string
  successUrl: string
  cancelUrl: string
}) {
  const plan = getPlan(input.plan)

  if (plan.id === 'free') return { mode: 'free' as const, url: input.successUrl }

  if (!process.env.STRIPE_SECRET_KEY || !plan.priceId) {
    return { mode: 'demo' as const, url: input.successUrl }
  }

  const params = new URLSearchParams()
  params.set('mode', 'subscription')
  params.set('success_url', input.successUrl)
  params.set('cancel_url', input.cancelUrl)
  params.set('line_items[0][price]', plan.priceId)
  params.set('line_items[0][quantity]', '1')
  params.set('metadata[plan]', plan.id)
  if (input.storeId) params.set('metadata[store_id]', input.storeId)

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'content-type': 'application/x-www-form-urlencoded' },
    body: params,
  })

  if (!res.ok) return { mode: 'error' as const, url: input.cancelUrl, status: res.status }

  const data = await res.json()
  return { mode: 'stripe' as const, url: data.url as string }
}

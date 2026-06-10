export type EnvCheck = {
  key: string
  label: string
  requiredFor: string
  configured: boolean
}

export function getServerEnvChecks(): EnvCheck[] {
  return [
    { key: 'NEXT_PUBLIC_SITE_URL', label: 'サイトURL', requiredFor: '本番URL', configured: Boolean(process.env.NEXT_PUBLIC_SITE_URL) },
    { key: 'NEXT_PUBLIC_SUPABASE_URL', label: 'Supabase URL', requiredFor: 'DB/認証', configured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) },
    { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', label: 'Supabase Anon Key', requiredFor: 'DB/認証', configured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) },
    { key: 'OPENAI_API_KEY', label: 'OpenAI API Key', requiredFor: 'GPT解析', configured: Boolean(process.env.OPENAI_API_KEY) },
    { key: 'LINE_CHANNEL_ACCESS_TOKEN', label: 'LINE Access Token', requiredFor: 'LINE通知', configured: Boolean(process.env.LINE_CHANNEL_ACCESS_TOKEN) },
    { key: 'NEXT_PUBLIC_LINE_ADD_FRIEND_URL', label: 'LINE友だち追加URL', requiredFor: 'LINE導線', configured: Boolean(process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_URL) },
    { key: 'STRIPE_SECRET_KEY', label: 'Stripe Secret Key', requiredFor: '課金', configured: Boolean(process.env.STRIPE_SECRET_KEY) },
    { key: 'STRIPE_WEBHOOK_SECRET', label: 'Stripe Webhook Secret', requiredFor: '課金Webhook', configured: Boolean(process.env.STRIPE_WEBHOOK_SECRET) },
    { key: 'NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID', label: 'Stripe Standard Price', requiredFor: 'スタンダード課金', configured: Boolean(process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID) },
    { key: 'NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID', label: 'Stripe Premium Price', requiredFor: 'プレミアム課金', configured: Boolean(process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID) },
  ]
}

export function getReadinessScore(checks: EnvCheck[]) {
  if (!checks.length) return 0
  return Math.round((checks.filter((check) => check.configured).length / checks.length) * 100)
}

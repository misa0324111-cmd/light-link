export type OperationCheck = {
  group: string
  label: string
  key: string
  configured: boolean
  required: boolean
}

export function getOperationChecks(): OperationCheck[] {
  return [
    { group: 'Core', label: '本番URL', key: 'NEXT_PUBLIC_SITE_URL', configured: Boolean(process.env.NEXT_PUBLIC_SITE_URL), required: true },
    { group: 'Supabase', label: 'Supabase URL', key: 'NEXT_PUBLIC_SUPABASE_URL', configured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL), required: true },
    { group: 'Supabase', label: 'Supabase Anon Key', key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', configured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY), required: true },
    { group: 'OpenAI', label: 'OpenAI API Key', key: 'OPENAI_API_KEY', configured: Boolean(process.env.OPENAI_API_KEY), required: true },
    { group: 'LINE', label: 'LINE Channel Token', key: 'LINE_CHANNEL_ACCESS_TOKEN', configured: Boolean(process.env.LINE_CHANNEL_ACCESS_TOKEN), required: true },
    { group: 'LINE', label: 'LINE友だち追加URL', key: 'NEXT_PUBLIC_LINE_ADD_FRIEND_URL', configured: Boolean(process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_URL), required: true },
    { group: 'Stripe', label: 'Stripe Secret Key', key: 'STRIPE_SECRET_KEY', configured: Boolean(process.env.STRIPE_SECRET_KEY), required: true },
    { group: 'Stripe', label: 'Stripe Webhook Secret', key: 'STRIPE_WEBHOOK_SECRET', configured: Boolean(process.env.STRIPE_WEBHOOK_SECRET), required: true },
    { group: 'Mail', label: 'Resend API Key', key: 'RESEND_API_KEY', configured: Boolean(process.env.RESEND_API_KEY), required: false },
    { group: 'Analytics', label: 'Google Analytics ID', key: 'NEXT_PUBLIC_GA_ID', configured: Boolean(process.env.NEXT_PUBLIC_GA_ID), required: false },
    { group: 'SEO', label: 'Search Console Verification', key: 'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION', configured: Boolean(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION), required: false },
  ]
}

export function getOperationScore() {
  const checks = getOperationChecks()
  const required = checks.filter((check) => check.required)
  const requiredScore = required.length ? Math.round((required.filter((check) => check.configured).length / required.length) * 100) : 0
  const allScore = checks.length ? Math.round((checks.filter((check) => check.configured).length / checks.length) * 100) : 0
  return { requiredScore, allScore }
}

export function getLaunchChecklist() {
  return [
    'Vercelへデプロイ',
    'Supabase schema.sqlを適用',
    'Supabase Auth Site URLを設定',
    'OpenAI API Keyを設定',
    'LINE Messaging APIを設定',
    'Stripe商品/価格/Webhookを設定',
    'Resendメール通知を設定',
    '独自ドメインを設定',
    'Google Search Console登録',
    'Google Analytics登録',
    '最終動作確認',
  ]
}

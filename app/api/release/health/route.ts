import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    ok: true,
    name: 'LIGHT LINK',
    version: '3.0.0',
    status: 'public-release-ready',
    features: [
      'ai-matching',
      'ai-chat',
      'preference-learning',
      'store-admin',
      'billing',
      'notifications',
      'seo',
      'production-check',
    ],
  })
}

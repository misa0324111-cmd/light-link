import { NextResponse } from 'next/server'
import { getReadinessScore, getServerEnvChecks } from '@/lib/env-check'

export async function GET() {
  const checks = getServerEnvChecks()
  return NextResponse.json({
    ok: true,
    data: {
      score: getReadinessScore(checks),
      checks,
    },
  })
}

import { NextResponse } from 'next/server'
import { getLaunchChecklist, getOperationChecks, getOperationScore } from '@/lib/operations'

export async function GET() {
  return NextResponse.json({
    ok: true,
    data: {
      score: getOperationScore(),
      checks: getOperationChecks(),
      launchChecklist: getLaunchChecklist(),
      version: '5.0.0',
    },
  })
}

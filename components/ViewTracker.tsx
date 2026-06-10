'use client'

import { useEffect } from 'react'
import { addViewHistory } from '@/lib/preferences'

export function ViewTracker({ talentId }: { talentId: string }) {
  useEffect(() => {
    addViewHistory(talentId)
  }, [talentId])

  return null
}

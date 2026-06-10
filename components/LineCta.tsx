'use client'

import { getLineAddFriendUrl } from '@/lib/line'
import { trackLineClick } from '@/lib/line-client'

export function LineCta({
  label = 'LINEで相談する',
  source = 'default',
}: {
  label?: string
  source?: string
}) {
  return (
    <a
      className="btn"
      href={getLineAddFriendUrl()}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackLineClick(source)}
    >
      {label}
    </a>
  )
}

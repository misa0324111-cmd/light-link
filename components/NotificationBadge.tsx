'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { listNotifications, type NotificationItem } from '@/lib/notifications'
import { subscribeNotifications } from '@/lib/realtime'

export function NotificationBadge({ href = '/store-admin/notifications' }: { href?: string }) {
  const [rows, setRows] = useState<NotificationItem[]>([])

  useEffect(() => {
    listNotifications().then(setRows)
    const sub = subscribeNotifications((notice) => {
      setRows((prev) => [notice, ...prev])
    })
    return () => sub.unsubscribe()
  }, [])

  const unread = rows.filter((row) => !row.read).length

  return (
    <Link className="btn btn2" href={href}>
      通知 {unread > 0 ? `(${unread})` : ''}
    </Link>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { subscribeNotifications } from '@/lib/realtime'
import type { NotificationItem } from '@/lib/notifications'

export function RealtimeNoticeToast() {
  const [notice, setNotice] = useState<NotificationItem | null>(null)

  useEffect(() => {
    const sub = subscribeNotifications((next) => {
      setNotice(next)
      setTimeout(() => setNotice(null), 5000)
    })
    return () => sub.unsubscribe()
  }, [])

  if (!notice) return null

  return (
    <div style={{
      position: 'fixed',
      left: 16,
      right: 16,
      bottom: 86,
      zIndex: 50,
      maxWidth: 430,
      margin: '0 auto',
    }}>
      <section className="card">
        <div className="badge">新着通知</div>
        <h3>{notice.title}</h3>
        <p className="small muted">{notice.message}</p>
      </section>
    </div>
  )
}

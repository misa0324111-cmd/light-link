'use client'

import { useEffect, useState } from 'react'
import { listNotifications, markNotificationRead, type NotificationItem } from '@/lib/notifications'

export function NotificationCenter() {
  const [rows, setRows] = useState<NotificationItem[]>([])
  const unread = rows.filter((row) => !row.read).length

  useEffect(() => {
    listNotifications().then(setRows)
  }, [])

  async function markRead(id: string) {
    await markNotificationRead(id)
    setRows((prev) => prev.map((row) => row.id === id ? { ...row, read: true } : row))
  }

  return (
    <section className="grid">
      <section className="hero">
        <p className="badge">NOTIFICATIONS</p>
        <h1>通知センター</h1>
        <p className="muted">未読通知: {unread}件</p>
      </section>

      {rows.length ? rows.map((row) => (
        <section className="card grid" key={row.id} style={{ opacity: row.read ? .65 : 1 }}>
          <div>
            <div className="badge">{row.type}</div>
            <h2>{row.title}</h2>
            <p className="muted">{row.message}</p>
            <p className="small muted">{new Date(row.createdAt).toLocaleString('ja-JP')}</p>
          </div>
          {!row.read && <button className="btn btn2" onClick={() => markRead(row.id)}>既読にする</button>}
        </section>
      )) : (
        <section className="card">
          <p className="muted">通知はまだありません。</p>
        </section>
      )}
    </section>
  )
}

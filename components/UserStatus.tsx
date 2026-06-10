'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCurrentSession, roleLabel, signOut, type DemoSession } from '@/lib/auth'

export function UserStatus() {
  const [session, setSession] = useState<DemoSession | null>(null)

  useEffect(() => {
    getCurrentSession().then(setSession)
  }, [])

  if (!session) return <Link className="btn btn2" href="/login">ログイン</Link>

  return (
    <section className="card grid">
      <div>
        <b>{session.email}</b>
        <p className="small muted">{roleLabel(session.role)} {session.storeId ? `/ store ${session.storeId.slice(0, 8)}` : ''}</p>
      </div>
      <button
        className="btn btn2"
        onClick={async () => {
          await signOut()
          location.href = '/login'
        }}
      >
        ログアウト
      </button>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCurrentSession, roleLabel, type DemoSession, type UserRole } from '@/lib/auth'

export function AuthGate({ allow, children }: { allow: UserRole[]; children: React.ReactNode }) {
  const [session, setSession] = useState<DemoSession | null | undefined>(undefined)

  useEffect(() => {
    getCurrentSession().then(setSession)
  }, [])

  if (session === undefined) return <section className="card"><p className="muted">確認中...</p></section>

  if (!session) {
    return (
      <section className="card grid">
        <h1>ログインが必要です</h1>
        <p className="muted">この画面を利用するにはログインしてください。</p>
        <Link className="btn" href="/login">ログインへ</Link>
      </section>
    )
  }

  if (!allow.includes(session.role)) {
    return (
      <section className="card grid">
        <h1>権限がありません</h1>
        <p className="muted">現在の権限: {roleLabel(session.role)}</p>
        <Link className="btn" href="/role">マイページへ</Link>
      </section>
    )
  }

  return <>{children}</>
}

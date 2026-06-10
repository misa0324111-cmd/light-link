'use client'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { UserStatus } from '@/components/UserStatus'
import { getDemoSession, defaultPathForRole } from '@/lib/auth'

export default function RolePage() {
  const session = getDemoSession()
  return <><Header label="マイページ" /><main className="page grid"><section className="card"><h1>マイページ</h1><p className="muted">ログイン状態と権限を確認できます。</p></section><UserStatus />{session && <Link className="btn" href={defaultPathForRole(session.role)}>権限に合った画面へ移動</Link>}</main></>
}

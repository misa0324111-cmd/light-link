'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { defaultPathForRole, signInWithEmail, type UserRole } from '@/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('store@example.com')
  const [role, setRole] = useState<UserRole>('store_admin')
  const [message, setMessage] = useState('')

  async function login() {
    if (!email.includes('@')) {
      setMessage('メールアドレスを入力してください。')
      return
    }

    try {
      const result = await signInWithEmail(email, role)
      if (result.mode === 'supabase') {
        setMessage('ログイン用メールを送信しました。メールを確認してください。')
        return
      }
      location.href = defaultPathForRole(role)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'ログインに失敗しました。')
    }
  }

  return (
    <>
      <Header label="ログイン" />
      <main className="page grid">
        <section className="hero">
          <p className="badge">AUTH</p>
          <h1>ログイン</h1>
          <p className="muted">Supabase設定時はMagic Link、未設定時はデモ認証で動作します。</p>
        </section>

        <section className="card grid">
          <input className="field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" />
          <select className="field" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
            <option value="user">一般ユーザー</option>
            <option value="store_admin">店舗管理者</option>
            <option value="admin">運営管理者</option>
          </select>
          <button className="btn" onClick={login}>ログインする</button>
          {message && <p className="muted">{message}</p>}
          <Link className="btn btn2" href="/welcome">戻る</Link>
        </section>
      </main>
    </>
  )
}

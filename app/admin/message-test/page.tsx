'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'

export default function MessageTestPage() {
  const [message, setMessage] = useState('')

  async function sendTest() {
    setMessage('送信中...')
    const res = await fetch('/api/notifications/reservation', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        customerName: 'テストユーザー',
        talentName: 'れいな',
        requestedAt: '本日 20:00',
        phone: '09000000000',
        note: '通知テストです',
      }),
    })
    const json = await res.json()
    setMessage(json.ok ? '通知テストを送信しました。' : '送信に失敗しました。')
  }

  return (
    <>
      <Header label="通知テスト" />
      <main className="page grid">
        <AuthGate allow={['admin']}>
          <section className="hero">
            <p className="badge">MESSAGE TEST</p>
            <h1>メール/LINE通知テスト</h1>
            <p className="muted">設定済みの通知経路へテスト送信します。未設定時はデモモードで動作します。</p>
          </section>
          <section className="card grid">
            <button className="btn" onClick={sendTest}>予約通知テストを送る</button>
            {message && <p className="muted">{message}</p>}
          </section>
        </AuthGate>
      </main>
    </>
  )
}

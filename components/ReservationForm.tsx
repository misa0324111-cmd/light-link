'use client'

import { useState } from 'react'
import { createReservation } from '@/lib/repositories'

export function ReservationForm({ talentId, storeId }: { talentId?: string; storeId?: string }) {
  const [message, setMessage] = useState('')

  async function submit(formData: FormData) {
    setMessage('送信中...')
    try {
      await createReservation({
        talentId,
        storeId,
        customerName: String(formData.get('customerName') ?? ''),
        phone: String(formData.get('phone') ?? ''),
        requestedAt: String(formData.get('requestedAt') ?? ''),
        note: String(formData.get('note') ?? ''),
      })
      await fetch('/api/notifications/reservation', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          talentId,
          storeId,
          customerName: String(formData.get('customerName') ?? ''),
          phone: String(formData.get('phone') ?? ''),
          requestedAt: String(formData.get('requestedAt') ?? ''),
          note: String(formData.get('note') ?? ''),
        }),
      }).catch(() => null)
      setMessage('予約リクエストを送信しました。')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '送信に失敗しました。')
    }
  }

  return (
    <form action={submit} className="grid">
      <input className="field" name="customerName" placeholder="お名前" required />
      <input className="field" name="phone" placeholder="電話番号" required />
      <input className="field" name="requestedAt" placeholder="希望日時" required />
      <textarea className="field" name="note" placeholder="ご要望" />
      <button className="btn">送信する</button>
      {message && <p className="muted">{message}</p>}
    </form>
  )
}

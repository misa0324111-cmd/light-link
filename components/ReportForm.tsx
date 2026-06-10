'use client'

import { useState } from 'react'
import { createReport, reportReasons, type ReportReason } from '@/lib/safety'

export function ReportForm({ targetType = 'general', targetId = '' }: { targetType?: string; targetId?: string }) {
  const [message, setMessage] = useState('')

  async function submit(formData: FormData) {
    const reason = String(formData.get('reason') ?? 'other') as ReportReason
    const detail = String(formData.get('detail') ?? '')
    if (!detail.trim()) {
      setMessage('内容を入力してください。')
      return
    }

    await fetch('/api/reports', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ targetType, targetId, reason, detail }),
    }).catch(() => null)

    createReport({ targetType, targetId, reason, detail })
    setMessage('通報を受け付けました。運営が確認します。')
  }

  return (
    <form action={submit} className="card grid">
      <h2>通報フォーム</h2>
      <select className="field" name="reason">
        {reportReasons.map((reason) => (
          <option value={reason.value} key={reason.value}>{reason.label}</option>
        ))}
      </select>
      <textarea className="field" name="detail" placeholder="内容を入力してください" rows={5} />
      <button className="btn">送信する</button>
      {message && <p className="muted">{message}</p>}
    </form>
  )
}

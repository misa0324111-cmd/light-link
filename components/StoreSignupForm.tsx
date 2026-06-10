'use client'

import { useState } from 'react'
import { createStoreApplication } from '@/lib/saas'

export function StoreSignupForm() {
  const [message, setMessage] = useState('')

  function submit(formData: FormData) {
    const storeName = String(formData.get('storeName') ?? '')
    const ownerName = String(formData.get('ownerName') ?? '')
    const email = String(formData.get('email') ?? '')
    const phone = String(formData.get('phone') ?? '')
    const area = String(formData.get('area') ?? '')

    if (!storeName || !ownerName || !email) {
      setMessage('店舗名・担当者名・メールを入力してください。')
      return
    }

    createStoreApplication({ storeName, ownerName, email, phone, area })
    setMessage('店舗申請を受け付けました。審査後にご連絡します。')
  }

  return (
    <form action={submit} className="card grid">
      <input className="field" name="storeName" placeholder="店舗名" required />
      <input className="field" name="ownerName" placeholder="担当者名" required />
      <input className="field" name="email" placeholder="メールアドレス" type="email" required />
      <input className="field" name="phone" placeholder="電話番号" />
      <input className="field" name="area" placeholder="主なエリア 例：新宿" />
      <button className="btn">店舗登録を申請する</button>
      {message && <p className="muted">{message}</p>}
    </form>
  )
}

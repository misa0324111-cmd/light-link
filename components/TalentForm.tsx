'use client'

import { useState } from 'react'
import { createTalent, getDefaultStoreId } from '@/lib/repositories'

export function TalentForm() {
  const [message, setMessage] = useState('')

  async function submit(formData: FormData) {
    setMessage('登録中...')
    try {
      const storeId = await getDefaultStoreId()
      await createTalent({
        storeId,
        name: String(formData.get('name') ?? ''),
        age: Number(formData.get('age') ?? 0),
        area: String(formData.get('area') ?? ''),
        profile: String(formData.get('profile') ?? ''),
        tags: String(formData.get('tags') ?? '').split(',').map((v) => v.trim()).filter(Boolean),
        price: Number(formData.get('price') ?? 0),
        schedule: String(formData.get('schedule') ?? ''),
      })
      setMessage('登録しました。ページを更新すると反映されます。')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '登録に失敗しました。')
    }
  }

  return (
    <form action={submit} className="card grid">
      <h2>キャスト登録</h2>
      <input className="field" name="name" placeholder="名前" required />
      <input className="field" name="age" placeholder="年齢" type="number" />
      <input className="field" name="area" placeholder="エリア" defaultValue="新宿" required />
      <input className="field" name="price" placeholder="料金" type="number" defaultValue="18000" />
      <input className="field" name="schedule" placeholder="出勤" defaultValue="本日 12:00-22:00" />
      <input className="field" name="tags" placeholder="タグ カンマ区切り" defaultValue="清楚系,癒し系" />
      <textarea className="field" name="profile" placeholder="プロフィール" />
      <button className="btn">登録する</button>
      {message && <p className="muted">{message}</p>}
    </form>
  )
}

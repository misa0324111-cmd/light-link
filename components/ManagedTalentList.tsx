'use client'

import { useState } from 'react'
import { deleteTalent, updateTalent } from '@/lib/repositories'
import type { Talent } from '@/lib/data'

export function ManagedTalentList({ initialTalents }: { initialTalents: Talent[] }) {
  const [talents, setTalents] = useState(initialTalents)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  async function remove(id: string) {
    if (!confirm('このキャストを非表示にしますか？')) return
    setMessage('削除中...')
    try {
      await deleteTalent(id)
      setTalents((prev) => prev.filter((talent) => talent.id !== id))
      setMessage('非表示にしました。')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '削除に失敗しました。')
    }
  }

  async function save(formData: FormData) {
    const id = String(formData.get('id') ?? '')
    setMessage('保存中...')
    try {
      await updateTalent(id, {
        name: String(formData.get('name') ?? ''),
        age: Number(formData.get('age') ?? 0),
        area: String(formData.get('area') ?? ''),
        price: Number(formData.get('price') ?? 0),
        schedule: String(formData.get('schedule') ?? ''),
        tags: String(formData.get('tags') ?? '').split(',').map((v) => v.trim()).filter(Boolean),
        profile: String(formData.get('profile') ?? ''),
      })

      setTalents((prev) => prev.map((talent) => talent.id === id ? {
        ...talent,
        name: String(formData.get('name') ?? ''),
        age: Number(formData.get('age') ?? 0),
        area: String(formData.get('area') ?? ''),
        price: Number(formData.get('price') ?? 0),
        schedule: String(formData.get('schedule') ?? ''),
        tags: String(formData.get('tags') ?? '').split(',').map((v) => v.trim()).filter(Boolean),
        profile: String(formData.get('profile') ?? ''),
      } : talent))
      setEditingId(null)
      setMessage('保存しました。')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '保存に失敗しました。')
    }
  }

  return (
    <section className="grid">
      {message && <p className="muted">{message}</p>}

      {talents.map((talent) => (
        <section className="card" key={talent.id}>
          {editingId === talent.id ? (
            <form action={save} className="grid">
              <input type="hidden" name="id" value={talent.id} />
              <input className="field" name="name" defaultValue={talent.name} />
              <input className="field" name="age" defaultValue={talent.age} type="number" />
              <input className="field" name="area" defaultValue={talent.area} />
              <input className="field" name="price" defaultValue={talent.price} type="number" />
              <input className="field" name="schedule" defaultValue={talent.schedule} />
              <input className="field" name="tags" defaultValue={talent.tags.join(',')} />
              <textarea className="field" name="profile" defaultValue={talent.profile} />
              <div className="split">
                <button className="btn">保存</button>
                <button type="button" className="btn btn2" onClick={() => setEditingId(null)}>キャンセル</button>
              </div>
            </form>
          ) : (
            <div className="talent">
              <div className="avatar">{talent.name[0]}</div>
              <div style={{ flex: 1 }}>
                <b>{talent.name}</b>
                <div className="small muted">{talent.area} / {talent.schedule}</div>
                <div className="small pink">AI {talent.aiScore}% / ¥{talent.price.toLocaleString()}</div>
                <div className="split" style={{ marginTop: 12 }}>
                  <button className="btn btn2" onClick={() => setEditingId(talent.id)}>編集</button>
                  <button className="btn btn2" onClick={() => remove(talent.id)}>非表示</button>
                </div>
              </div>
            </div>
          )}
        </section>
      ))}
    </section>
  )
}

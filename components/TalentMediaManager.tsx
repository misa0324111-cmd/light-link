'use client'

import { useEffect, useState } from 'react'
import { addTalentMedia, createStorageUploadUrl, deleteTalentMedia, listTalentMedia, type TalentMedia } from '@/lib/media'

export function TalentMediaManager({ talentId }: { talentId: string }) {
  const [rows, setRows] = useState<TalentMedia[]>([])
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    listTalentMedia(talentId).then(setRows)
  }, [talentId])

  async function addUrl() {
    if (!imageUrl.trim()) return
    setMessage('追加中...')
    try {
      const created = await addTalentMedia({ talentId, imageUrl, caption })
      setRows((prev) => [...prev, { id: created.id, talentId, imageUrl, caption, sortOrder: 99 }])
      setImageUrl('')
      setCaption('')
      setMessage('画像を追加しました。')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '追加に失敗しました。')
    }
  }

  async function demoUpload() {
    setMessage('アップロードURLを作成中...')
    try {
      const upload = await createStorageUploadUrl({ path: `${talentId}/main-${Date.now()}.jpg` })
      await addTalentMedia({ talentId, imageUrl: upload.publicUrl, caption: 'Storage画像' })
      setRows((prev) => [...prev, { id: `media-${Date.now()}`, talentId, imageUrl: upload.publicUrl, caption: 'Storage画像', sortOrder: 99 }])
      setMessage(upload.mode === 'demo' ? 'デモ画像を追加しました。Supabase設定後はStorage URLを発行します。' : 'Storage画像URLを追加しました。')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '作成に失敗しました。')
    }
  }

  async function remove(id: string) {
    setMessage('削除中...')
    try {
      await deleteTalentMedia(id)
      setRows((prev) => prev.filter((row) => row.id !== id))
      setMessage('削除しました。')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '削除に失敗しました。')
    }
  }

  return (
    <section className="grid">
      <section className="card grid">
        <h2>画像追加</h2>
        <input className="field" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="画像URL" />
        <input className="field" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="キャプション" />
        <button className="btn" onClick={addUrl}>URL画像を追加</button>
        <button className="btn btn2" onClick={demoUpload}>StorageアップロードURL作成</button>
        {message && <p className="muted">{message}</p>}
      </section>

      {rows.map((row) => (
        <section className="card" key={row.id}>
          <img src={row.imageUrl} alt={row.caption || 'media'} style={{ width: '100%', borderRadius: 20, background: '#18181b' }} />
          <p className="small muted">{row.caption}</p>
          <button className="btn btn2" onClick={() => remove(row.id)}>削除</button>
        </section>
      ))}
    </section>
  )
}

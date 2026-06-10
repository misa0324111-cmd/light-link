'use client'

import { useEffect, useState } from 'react'
import { listReservations, updateReservationStatus } from '@/lib/repositories'

type ReservationRow = {
  id: string
  customerName: string
  phone: string
  requestedAt: string
  status: string
  talentName: string
}

const statusLabels: Record<string, string> = {
  new: '新規',
  confirmed: '確定',
  cancelled: 'キャンセル',
  completed: '完了',
}

export function ReservationStatusList() {
  const [rows, setRows] = useState<ReservationRow[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    listReservations().then(setRows)
  }, [])

  async function changeStatus(id: string, status: 'new' | 'confirmed' | 'cancelled' | 'completed') {
    setMessage('更新中...')
    try {
      await updateReservationStatus(id, status)
      setRows((prev) => prev.map((row) => row.id === id ? { ...row, status } : row))
      setMessage('ステータスを更新しました。')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '更新に失敗しました。')
    }
  }

  return (
    <div className="grid">
      {message && <p className="muted">{message}</p>}
      {rows.map((row) => (
        <section className="card" key={row.id}>
          <b>{row.customerName}</b>
          <p className="small muted">{row.talentName} / {row.requestedAt}</p>
          <p className="small">TEL: {row.phone}</p>
          <span className="badge">{statusLabels[row.status] ?? row.status}</span>
          <select
            className="field"
            style={{ marginTop: 12 }}
            value={row.status}
            onChange={(e) => changeStatus(row.id, e.target.value as 'new' | 'confirmed' | 'cancelled' | 'completed')}
          >
            <option value="new">新規</option>
            <option value="confirmed">確定</option>
            <option value="cancelled">キャンセル</option>
            <option value="completed">完了</option>
          </select>
        </section>
      ))}
    </div>
  )
}

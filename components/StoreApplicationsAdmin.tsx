'use client'

import { useEffect, useState } from 'react'
import { listStoreApplications, updateStoreApplicationStatus, type StoreApplication, type StoreApplicationStatus } from '@/lib/saas'

const labels: Record<StoreApplicationStatus, string> = {
  pending: '審査待ち',
  approved: '承認',
  rejected: '却下',
  hold: '保留',
}

export function StoreApplicationsAdmin() {
  const [rows, setRows] = useState<StoreApplication[]>([])

  useEffect(() => {
    setRows(listStoreApplications())
  }, [])

  function change(id: string, status: StoreApplicationStatus) {
    updateStoreApplicationStatus(id, status)
    setRows(listStoreApplications())
  }

  return (
    <section className="grid">
      {rows.length ? rows.map((row) => (
        <section className="card grid" key={row.id}>
          <div>
            <div className="badge">{labels[row.status]}</div>
            <h2>{row.storeName}</h2>
            <p className="small muted">{row.area} / {row.ownerName}</p>
            <p className="small">{row.email} / {row.phone}</p>
          </div>
          <div className="split">
            <button className="btn" onClick={() => change(row.id, 'approved')}>承認</button>
            <button className="btn btn2" onClick={() => change(row.id, 'hold')}>保留</button>
            <button className="btn btn2" onClick={() => change(row.id, 'rejected')}>却下</button>
          </div>
        </section>
      )) : (
        <section className="card">
          <p className="muted">店舗申請はまだありません。</p>
        </section>
      )}
    </section>
  )
}

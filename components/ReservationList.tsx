'use client'

import { useEffect, useState } from 'react'
import { listReservations } from '@/lib/repositories'

type ReservationRow = {
  id: string
  customerName: string
  phone: string
  requestedAt: string
  status: string
  talentName: string
}

export function ReservationList() {
  const [rows, setRows] = useState<ReservationRow[]>([])

  useEffect(() => {
    listReservations().then(setRows)
  }, [])

  return (
    <div className="grid">
      {rows.map((row) => (
        <section className="card" key={row.id}>
          <b>{row.customerName}</b>
          <p className="small muted">{row.talentName} / {row.requestedAt}</p>
          <p className="small">TEL: {row.phone}</p>
          <span className="badge">{row.status}</span>
        </section>
      ))}
    </div>
  )
}

import Link from 'next/link'
import { Header } from '@/components/Header'
import { ReservationStatusList } from '@/components/ReservationStatusList'
import { AuthGate } from '@/components/AuthGate'

export default function StoreReservationsPage() {
  return (
    <>
      <Header label="予約管理" />
      <main className="page grid">
        <AuthGate allow={['store_admin','admin']}>
          <section className="card">
            <h1>予約管理</h1>
            <p className="muted">予約リクエストのステータスを変更できます。</p>
          </section>
          <ReservationStatusList />
          <Link className="btn" href="/store-admin">戻る</Link>
        </AuthGate>
      </main>
    </>
  )
}

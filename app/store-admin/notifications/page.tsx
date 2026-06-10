import Link from 'next/link'
import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { NotificationCenter } from '@/components/NotificationCenter'

export default function StoreNotificationsPage() {
  return (
    <>
      <Header label="通知" />
      <main className="page grid">
        <AuthGate allow={['store_admin','admin']}>
          <NotificationCenter />
          <Link className="btn" href="/store-admin">店舗管理へ戻る</Link>
        </AuthGate>
      </main>
    </>
  )
}

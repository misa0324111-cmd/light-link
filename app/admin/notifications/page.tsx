import Link from 'next/link'
import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { NotificationCenter } from '@/components/NotificationCenter'

export default function AdminNotificationsPage() {
  return (
    <>
      <Header label="運営通知" />
      <main className="page grid">
        <AuthGate allow={['admin']}>
          <NotificationCenter />
          <Link className="btn" href="/admin">運営管理へ戻る</Link>
        </AuthGate>
      </main>
    </>
  )
}

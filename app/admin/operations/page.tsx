import Link from 'next/link'
import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { OperationsDashboard } from '@/components/OperationsDashboard'

export default function OperationsPage() {
  return (
    <>
      <Header label="本番運営" />
      <main className="page grid">
        <AuthGate allow={['admin']}>
          <OperationsDashboard />
          <Link className="btn" href="/admin">運営管理へ戻る</Link>
        </AuthGate>
      </main>
    </>
  )
}

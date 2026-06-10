import Link from 'next/link'
import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { StoreApplicationsAdmin } from '@/components/StoreApplicationsAdmin'

export default function StoreApplicationsPage() {
  return (
    <>
      <Header label="店舗申請" />
      <main className="page grid">
        <AuthGate allow={['admin']}>
          <section className="hero">
            <p className="badge">APPLICATIONS</p>
            <h1>店舗申請管理</h1>
            <p className="muted">新規店舗申請を承認・却下・保留できます。</p>
          </section>
          <StoreApplicationsAdmin />
          <Link className="btn" href="/admin">運営管理へ戻る</Link>
        </AuthGate>
      </main>
    </>
  )
}

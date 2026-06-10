import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { StoreSaasDashboard } from '@/components/StoreSaasDashboard'

export default function StoreDashboardPage() {
  return (
    <>
      <Header label="店舗ダッシュボード" />
      <main className="page grid">
        <AuthGate allow={['store_admin','admin']}>
          <section className="hero">
            <p className="badge">STORE DASHBOARD</p>
            <h1>SaaSダッシュボード</h1>
            <p className="muted">AI相談・予約・LINE相談・プラン状況を確認できます。</p>
          </section>
          <StoreSaasDashboard />
        </AuthGate>
      </main>
    </>
  )
}

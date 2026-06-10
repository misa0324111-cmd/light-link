import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { KpiDashboard } from '@/components/KpiDashboard'

export default function AdminKpiPage() {
  return (
    <>
      <Header label="KPI分析" />
      <main className="page grid">
        <AuthGate allow={['admin']}>
          <section className="hero">
            <p className="badge">ANALYTICS</p>
            <h1>運営KPI</h1>
            <p className="muted">AI相談・LINE・予約・課金の流れを確認します。</p>
          </section>
          <KpiDashboard />
        </AuthGate>
      </main>
    </>
  )
}

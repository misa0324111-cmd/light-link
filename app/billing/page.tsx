import { Header } from '@/components/Header'
import { BillingPlans } from '@/components/BillingPlans'
import { AuthGate } from '@/components/AuthGate'

export default function BillingPage() {
  return (
    <>
      <Header label="プラン管理" />
      <main className="page grid">
        <AuthGate allow={['store_admin','admin']}>
          <section className="hero">
            <p className="badge">BILLING</p>
            <h1>店舗プラン</h1>
            <p className="muted">店舗の利用プランを選択してください。</p>
          </section>
          <BillingPlans />
        </AuthGate>
      </main>
    </>
  )
}

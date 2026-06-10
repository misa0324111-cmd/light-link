import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { StoreSaasDashboard } from '@/components/StoreSaasDashboard'

export default function StoreOnboardingPage() {
  return (
    <>
      <Header label="オンボーディング" />
      <main className="page grid">
        <AuthGate allow={['store_admin','admin']}>
          <section className="hero">
            <p className="badge">ONBOARDING</p>
            <h1>公開準備を進めましょう</h1>
            <p className="muted">店舗情報、候補登録、画像、プラン設定を順番に進めます。</p>
          </section>
          <StoreSaasDashboard />
        </AuthGate>
      </main>
    </>
  )
}

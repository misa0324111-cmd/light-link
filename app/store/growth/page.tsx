import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { PromoTextGenerator } from '@/components/PromoTextGenerator'

export default function StoreGrowthPage() {
  return (
    <>
      <Header label="集客ツール" />
      <main className="page grid">
        <AuthGate allow={['store_admin','admin']}>
          <section className="hero">
            <p className="badge">GROWTH</p>
            <h1>店舗集客ツール</h1>
            <p className="muted">LP文章・SNS投稿・SEO文章を生成します。</p>
          </section>
          <PromoTextGenerator />
        </AuthGate>
      </main>
    </>
  )
}

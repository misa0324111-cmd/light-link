import Link from 'next/link'
import { Header } from '@/components/Header'

export default function BillingCancelPage() {
  return (
    <>
      <Header label="課金キャンセル" />
      <main className="page grid">
        <section className="card" style={{ textAlign: 'center' }}>
          <h1>プラン設定を中止しました</h1>
          <p className="muted">いつでもプラン管理から再開できます。</p>
          <Link className="btn" href="/billing">プラン管理へ</Link>
        </section>
      </main>
    </>
  )
}

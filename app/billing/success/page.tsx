import Link from 'next/link'
import { Header } from '@/components/Header'

export default function BillingSuccessPage() {
  return (
    <>
      <Header label="課金完了" />
      <main className="page grid">
        <section className="card" style={{ textAlign: 'center' }}>
          <h1>プラン設定が完了しました</h1>
          <p className="muted">店舗管理画面に戻って運用を開始できます。</p>
          <Link className="btn" href="/store-admin">店舗管理へ</Link>
        </section>
      </main>
    </>
  )
}

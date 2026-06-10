import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'

export default function StoreBlogPage() {
  return (
    <>
      <Header label="店舗ブログ" />
      <main className="page grid">
        <AuthGate allow={['store_admin','admin']}>
          <section className="hero">
            <p className="badge">BLOG</p>
            <h1>店舗ブログ</h1>
            <p className="muted">新着情報・キャンペーン・イベント投稿の土台です。</p>
          </section>
          <section className="card grid">
            <input className="field" placeholder="タイトル" />
            <textarea className="field" placeholder="本文" rows={6} />
            <button className="btn">下書き保存</button>
            <p className="small muted">v4.2では投稿UIの土台です。v4.3以降でDB保存/公開に拡張します。</p>
          </section>
        </AuthGate>
      </main>
    </>
  )
}

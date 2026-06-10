import Link from 'next/link'
import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'

export default function AdminReportsPage() {
  return (
    <>
      <Header label="通報管理" />
      <main className="page grid">
        <AuthGate allow={['admin']}>
          <section className="hero">
            <p className="badge">REPORTS</p>
            <h1>通報管理</h1>
            <p className="muted">通報・修正依頼の確認画面です。</p>
          </section>
          <section className="card">
            <p className="muted">v5.1では管理画面の土台です。DB接続後、通報一覧を表示します。</p>
          </section>
          <Link className="btn" href="/admin">運営管理へ戻る</Link>
        </AuthGate>
      </main>
    </>
  )
}

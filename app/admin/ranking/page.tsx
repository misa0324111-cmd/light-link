import Link from 'next/link'
import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { AiRankingTabs } from '@/components/AiRankingTabs'

export default function AdminRankingPage() {
  return (
    <>
      <Header label="ランキング管理" />
      <main className="page grid">
        <AuthGate allow={['admin']}>
          <section className="hero">
            <p className="badge">RANKING ADMIN</p>
            <h1>AIランキング管理</h1>
            <p className="muted">ランキングロジックと表示内容を確認します。</p>
          </section>
          <AiRankingTabs />
          <Link className="btn" href="/admin">運営管理へ戻る</Link>
        </AuthGate>
      </main>
    </>
  )
}

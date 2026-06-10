import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { ConciergeChat } from '@/components/ConciergeChat'

export const metadata = {
  title: 'AIコンシェルジュ',
  description: 'AIが会話で希望を聞き取り、相性の良い候補を提案します。',
}

export default function ConciergePage() {
  return (
    <>
      <Header label="AIコンシェルジュ" />
      <main className="page grid">
        <section className="hero">
          <p className="badge">CONCIERGE</p>
          <h1>AIが会話でヒアリングし<br />最適な候補を提案します</h1>
          <p className="muted">希望を文章で伝えるだけで、推薦理由・比較・予約導線まで案内します。</p>
        </section>
        <ConciergeChat />
      </main>
      <BottomNav />
    </>
  )
}

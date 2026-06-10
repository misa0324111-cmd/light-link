import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { AiRankingTabs } from '@/components/AiRankingTabs'

export const metadata = {
  title: 'AIランキング',
  description: '人気・急上昇・AIおすすめ・初めて向けランキングを確認できます。',
}

export default function RankingPage() {
  return (
    <>
      <Header label="ランキング" />
      <main className="page grid">
        <section className="hero">
          <p className="badge">AI RANKING</p>
          <h1>AIランキング</h1>
          <p className="muted">閲覧・お気に入り・予約・LINE相談をもとにランキング化します。</p>
        </section>
        <AiRankingTabs />
      </main>
      <BottomNav />
    </>
  )
}

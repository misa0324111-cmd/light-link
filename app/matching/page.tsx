import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { MatchingWizard } from '@/components/MatchingWizard'

export const metadata = {
  title: 'AIマッチング診断',
  description: '質問に答えるだけで相性の良い候補をAIが提案します。',
}

export default function MatchingPage() {
  return (
    <>
      <Header label="AIマッチング" />
      <main className="page grid">
        <section className="hero">
          <p className="badge">AI MATCHING</p>
          <h1>質問に答えるだけで<br />相性の良い候補を提案</h1>
          <p className="muted">雰囲気・予算・エリア・利用タイミングから相性スコアを計算します。</p>
        </section>
        <MatchingWizard />
      </main>
      <BottomNav />
    </>
  )
}

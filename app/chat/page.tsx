import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { AiChatBox } from '@/components/AiChatBox'

export default function Chat() {
  return (
    <>
      <Header label="AIチャット" />
      <main className="page grid">
        <section className="hero">
          <p className="badge">AI CONCIERGE</p>
          <h1>希望を文章で入力して<br />AIが候補を提案します</h1>
          <p className="muted">例：今日、新宿で優しい人、予算2万円くらい。</p>
        </section>
        <AiChatBox />
      </main>
      <BottomNav />
    </>
  )
}

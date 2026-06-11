import Link from 'next/link'
import { BottomNav } from '@/components/BottomNav'

export default function Welcome() {
  return (
    <>
      <main className="mag-home">
        <section className="mag-hero">
          <div className="mag-overlay" />

          <div className="mag-content">
            <div className="mag-badge">AI CONCIERGE</div>

            <h1>
              AIが理想の相手を
              <br />
              会話でご案内します
            </h1>

            <p>
              タイプ・予算・エリアを話すだけ。
              相性スコア付きでおすすめします。
            </p>

            <div className="hero-buttons">
              <Link href="/concierge" className="btn">
                AIコンシェルジュ
              </Link>

              <Link href="/search" className="btn btn2">
                一覧から探す
              </Link>
            </div>
          </div>
        </section>

        <section className="search-box">
          <h2>AI検索</h2>

          <input
            type="text"
            placeholder="例：れいな / 新宿 / 癒し系 / 本日出勤"
          />
        </section>

        <section className="ranking-section">
          <h2>👑 RANKING</h2>

          <div className="ranking-grid">
            <div className="rank-card">
              <div className="rank-no">1</div>
              <div className="rank-image" />
              <h3>れいな</h3>
              <p>新宿 / AIおすすめ度96%</p>
            </div>

            <div className="rank-card">
              <div className="rank-no">2</div>
              <div className="rank-image" />
              <h3>あや</h3>
              <p>渋谷 / AIおすすめ度92%</p>
            </div>

            <div className="rank-card">
              <div className="rank-no">3</div>
              <div className="rank-image" />
              <h3>みさき</h3>
              <p>池袋 / AIおすすめ度90%</p>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  )
}
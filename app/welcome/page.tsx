import Link from 'next/link'
import { BottomNav } from '@/components/BottomNav'

export default function Welcome() {
  return (
    <>
      <main className="mag-home">
        <section className="mag-hero">
          <div className="mag-content">
            <p className="mag-logo">✦ AI CONCIERGE ✦</p>

            <h1>
              AIが理想の相手を
              <br />
              会話でご案内します
            </h1>

            <p className="mag-lead">
              タイプ・予算・エリアを話すだけ。
              <br />
              相性スコア付きでおすすめします。
            </p>

            <div className="hero-buttons">
              <Link className="btn" href="/concierge">
                AIコンシェルジュ
              </Link>
              <Link className="btn btn2" href="/search">
                一覧から探す
              </Link>
            </div>
          </div>
        </section>

        <section className="mag-search">
          <h2>AI検索 ✨</h2>
          <input placeholder="例：れいな / 新宿 / 癒し系 / 本日出勤" />
        </section>

        <section className="mag-ranking">
          <div className="ranking-title">
            <h2>👑 RANKING</h2>
            <Link href="/ranking">もっと見る ›</Link>
          </div>

          <div className="ranking-grid">
            {[
              ['1', 'れいな', '新宿', '96%'],
              ['2', 'あや', '渋谷', '92%'],
              ['3', 'みさき', '池袋', '90%'],
            ].map(([rank, name, area, score]) => (
              <Link className="rank-card" href="/search" key={rank}>
                <div className="rank-badge">{rank}</div>
                <div className="rank-photo">{name[0]}</div>
                <div className="rank-body">
                  <h3>{name}</h3>
                  <p>{area}</p>
                  <b>AIおすすめ度 <span>{score}</span></b>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  )
}
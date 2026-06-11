import Link from 'next/link'
import { BottomNav } from '@/components/BottomNav'

export default function Welcome() {
  const ranking = [
    { rank: '1', name: 'れいな', area: '新宿', score: '96%', emoji: '👩🏻' },
    { rank: '2', name: 'あや', area: '渋谷', score: '92%', emoji: '👩' },
    { rank: '3', name: 'みさき', area: '池袋', score: '90%', emoji: '👩🏻‍🦰' },
  ]

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
            {ranking.map((item) => (
              <Link className="rank-card" href="/search" key={item.rank}>
                <div className="rank-badge">{item.rank}</div>

                <div className="rank-photo">
                  <span className="rank-emoji">{item.emoji}</span>
                </div>

                <div className="rank-body">
                  <h3>{item.name}</h3>
                  <p>{item.area}</p>
                  <b>
                    AIおすすめ度 <span>{item.score}</span>
                  </b>
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
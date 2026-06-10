import Link from 'next/link'
import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { AiSearchBar } from '@/components/AiSearchBar'
import { talents } from '@/lib/data'

export default function Welcome() {
  return (
    <>
      <Header />

      <main className="page_grid">
        <section className="hero">
          <p className="badge">AI CONCIERGE</p>

          <h1>
            AIが理想の相手を
            <br />
            会話でご案内します
          </h1>

          <p className="muted">
            タイプ・予算・エリアを話すだけ。
            相性スコア付きでおすすめします。
          </p>

          <div className="split" style={{ marginTop: 18 }}>
            <Link className="btn" href="/concierge">
              AIコンシェルジュ
            </Link>

            <Link className="btn btn2" href="/search">
              一覧から探す
            </Link>
          </div>
        </section>

        <AiSearchBar />

        <section className="card">
          <h2>人気キャスト</h2>

          <div className="grid">
            {talents.slice(0, 3).map((talent) => (
              <Link
                key={talent.id}
                href={`/talents/${talent.id}`}
                className="card talent"
              >
                <div className="avatar">
                  {talent.name[0]}
                </div>

                <div>
                  <b>{talent.name}</b>

                  <p className="muted">
                    {talent.area}
                  </p>

                  <p>
                    AIおすすめ度 {talent.aiScore}%
                  </p>
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
import Link from 'next/link'
import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { AiSearchBar } from '@/components/AiSearchBar'
import { talents } from '@/lib/data'

export default function Welcome() {
  const ranking = talents.slice(0, 3)

  return (
    <>
      <Header />

      <main className="page grid">
        <section
          className="hero"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.92)), radial-gradient(circle at top right, rgba(236,72,153,.35), transparent 35%), #080808',
          }}
        >
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

        <section className="card grid">
          <p className="badge">RANKING</p>
          <h2>人気ランキング</h2>

          <div className="split">
            {ranking.map((talent, index) => (
              <Link
                key={talent.id}
                href={`/talents/${talent.id}`}
                className="card"
              >
                <div className="avatar">{index + 1}</div>
                <h3>{talent.name}</h3>
                <p className="muted">
                  {talent.area} / {talent.aiScore}%
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  )
}
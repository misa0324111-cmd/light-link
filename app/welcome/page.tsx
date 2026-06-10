import Link from 'next/link'
import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { talents } from '@/lib/data'

export default function Welcome() {
  return <>
    <Header />
    <main className="page grid">
      <section className="hero">
        <p className="badge">AI CONCIERGE</p>
        <h1>AIが理想の相手を<br/>会話でご案内します</h1>
        <p className="muted">タイプ・予算・エリアを話すだけ。相性スコア付きでおすすめします。</p>
        <div className="split" style={{marginTop:18}}>
          <Link className="btn" href="/concierge">AIコンシェルジュ</Link>
          <Link className="btn btn2" href="/search">一覧から探す</Link>
        </div>
      </section>
      <section className="card">
        <h2>AIおすすめ候補</h2>
        <div className="grid">{talents.slice(0,3).map(t=><Link href={`/talents/${t.id}`} className="talent" key={t.id}><div className="avatar">{t.name[0]}</div><div><b>{t.name}</b><div className="small muted">{t.area} / {t.schedule}</div><div className="small pink">AIおすすめ度 {t.aiScore}%</div></div></Link>)}</div>
      </section>
    </main>
    <BottomNav />
  </>
}

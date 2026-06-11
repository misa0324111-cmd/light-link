import Link from 'next/link'
import { BottomNav } from '@/components/BottomNav'

const items = [
  { name: 'れいな', area: '新宿', score: '96%' },
  { name: 'あや', area: '渋谷', score: '92%' },
  { name: 'みさき', area: '池袋', score: '90%' },
]

export default function FavoritesPage() {
  return (
    <>
      <main className="mag-home">
        <section className="mag-search">
          <h1>❤️ お気に入り</h1>
          <p className="mag-lead">気になるキャストをあとで見返せます。</p>
        </section>
        <section className="mag-ranking">
          <div className="ranking-grid">
            {items.map((item) => (
              <Link className="rank-card" href="/search" key={item.name}>
                <div className="rank-photo"><span className="rank-emoji">👩</span></div>
                <div className="rank-body">
                  <h3>{item.name}</h3>
                  <p>{item.area}</p>
                  <b>AIおすすめ度 <span>{item.score}</span></b>
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

import Link from 'next/link'
import { LineCta } from '@/components/LineCta'
import { getStorePublicData } from '@/lib/growth'

export function StorePublicLanding({ storeId }: { storeId: string }) {
  const data = getStorePublicData(storeId)

  return (
    <section className="grid">
      <section className="hero">
        <p className="badge">STORE LP</p>
        <h1>{data.store.name}</h1>
        <p className="muted">{data.store.area}のAIマッチング対応店舗です。</p>
        <LineCta label="LINEで相談" source="store_public" />
      </section>

      <section className="card grid">
        <h2>AIおすすめランキング</h2>
        {data.ranking.map((talent, index) => (
          <Link className="talent" href={`/talents/${talent.id}`} key={talent.id}>
            <div className="avatar">{index + 1}</div>
            <div>
              <b>{talent.name}</b>
              <p className="small muted">AI相性 {talent.aiScore}% / {talent.area}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="card grid">
        <h2>在籍候補</h2>
        {data.talents.map((talent) => (
          <Link className="card" href={`/talents/${talent.id}`} key={talent.id}>
            <b>{talent.name}</b>
            <p className="small muted">{talent.tags.join(' / ')}</p>
          </Link>
        ))}
      </section>
    </section>
  )
}

import Link from 'next/link'
import { FavoriteButton } from '@/components/FavoriteButton'
import { LineCta } from '@/components/LineCta'
import type { ConciergeRecommendation } from '@/lib/concierge'

function Stars({ value }: { value: number }) {
  return <span>{'★'.repeat(value)}{'☆'.repeat(5 - value)}</span>
}

export function RecommendationCard({ item, rank }: { item: ConciergeRecommendation; rank: number }) {
  return (
    <section className="card grid">
      <div className="small muted">AIコンシェルジュ推薦 {rank}位</div>
      <div className="talent">
        <div className="avatar">{item.talent.name[0]}</div>
        <div>
          <h2>{item.talent.name}</h2>
          <div className="score">{item.score}%</div>
        </div>
      </div>

      <section className="card">
        <h3>おすすめ理由</h3>
        {item.reasons.map((reason) => <p className="small" key={reason}>✓ {reason}</p>)}
      </section>

      <section className="card">
        <h3>AI比較</h3>
        <p className="small">雰囲気 <Stars value={item.comparison.mood} /></p>
        <p className="small">会話力 <Stars value={item.comparison.talk} /></p>
        <p className="small">初回向け <Stars value={item.comparison.beginner} /></p>
        <p className="small">対応しやすさ <Stars value={item.comparison.availability} /></p>
      </section>

      <div className="split">
        <Link className="btn" href={`/reservation/new?talent=${item.talent.id}`}>予約する</Link>
        <LineCta label="LINE相談" source="concierge" />
      </div>
      <div className="split">
        <Link className="btn btn2" href={`/talents/${item.talent.id}`}>詳細</Link>
        <FavoriteButton talentId={item.talent.id} />
      </div>
    </section>
  )
}

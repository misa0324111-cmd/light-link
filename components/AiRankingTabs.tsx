'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { getAiRanking, type RankingType } from '@/lib/ai-ranking'

const tabs: { key: RankingType; label: string }[] = [
  { key: 'popular', label: '人気' },
  { key: 'rising', label: '急上昇' },
  { key: 'ai', label: 'AIおすすめ' },
  { key: 'beginner', label: '初めて向け' },
]

export function AiRankingTabs() {
  const [active, setActive] = useState<RankingType>('popular')
  const rows = useMemo(() => getAiRanking(active).slice(0, 10), [active])

  return (
    <section className="grid">
      <div className="split">
        {tabs.map((tab) => (
          <button
            className={active === tab.key ? 'btn' : 'btn btn2'}
            key={tab.key}
            onClick={() => setActive(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {rows.map((item, index) => (
        <section className="card grid" key={item.talent.id}>
          <div className="talent">
            <div className="avatar">{index + 1}</div>
            <div>
              <h2>{item.talent.name}</h2>
              <div className="score">{item.score}</div>
              <p className="small muted">{item.rankReason}</p>
            </div>
          </div>

          <section className="card">
            <p className="small">AI: {item.metrics.ai}</p>
            <p className="small">閲覧: {item.metrics.views}</p>
            <p className="small">お気に入り: {item.metrics.favorites}</p>
            <p className="small">予約: {item.metrics.reservations}</p>
            <p className="small">LINE: {item.metrics.lineClicks}</p>
          </section>

          <div className="split">
            <Link className="btn" href={`/talents/${item.talent.id}`}>詳細</Link>
            <Link className="btn btn2" href={`/reservation/new?talent=${item.talent.id}`}>予約</Link>
          </div>
        </section>
      ))}
    </section>
  )
}

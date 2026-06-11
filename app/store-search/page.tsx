'use client'

import { useState } from 'react'
import { BottomNav } from '@/components/BottomNav'

const areas = [
  '新宿', '池袋', '渋谷', '上野', '五反田',
  '新橋', '品川', '吉原', '錦糸町', '立川',
  '町田', '横浜', '川崎', '大宮', '千葉'
]

const keywords = [
  '高級', '韓国系', '新人', '本日出勤', '口コミ',
  'ランキング', 'デリヘル', 'ホテヘル', 'エステ', 'ソープ',
  '癒し系', '即案内可能', '初心者向け', '人気店', 'イベント'
]

export default function StoreSearchPage() {
  const [area, setArea] = useState('新宿')
  const [keyword, setKeyword] = useState('高級')

  const baseQuery = `${area} ${keyword} 風俗 店舗情報`

  const links = [
    {
      title: 'シティヘブン系で探す',
      text: `${area}の${keyword}系店舗を検索`,
      url: `https://www.google.com/search?q=${encodeURIComponent(`site:cityheaven.net ${baseQuery}`)}`
    },
    {
      title: '口コミを探す',
      text: `${area} ${keyword} 口コミ`,
      url: `https://www.google.com/search?q=${encodeURIComponent(`${area} ${keyword} 風俗 口コミ`)}`
    },
    {
      title: 'ランキングを探す',
      text: `${area} ${keyword} ランキング`,
      url: `https://www.google.com/search?q=${encodeURIComponent(`${area} ${keyword} 風俗 ランキング`)}`
    },
    {
      title: '本日出勤を探す',
      text: `${area} 本日出勤`,
      url: `https://www.google.com/search?q=${encodeURIComponent(`${area} 風俗 本日出勤`)}`
    },
    {
      title: 'Googleで広く探す',
      text: baseQuery,
      url: `https://www.google.com/search?q=${encodeURIComponent(baseQuery)}`
    },
    {
      title: '地図で周辺を探す',
      text: `${area} 周辺 店舗`,
      url: `https://www.google.com/maps/search/${encodeURIComponent(`${area} 風俗 店舗`)}`
    }
  ]

  return (
    <>
      <main className="mag-home">
        <section className="store-search-hero">
          <p className="mag-logo">REAL STORE SEARCH</p>
          <h1>地域別 店舗情報検索</h1>
          <p className="mag-lead">
            エリア・ジャンル・口コミ・ランキングから、
            ネット上の公開店舗情報を探せます。
          </p>
        </section>

        <section className="tag-panel">
          <h2>📍 エリアを選ぶ</h2>
          <div className="tag-row">
            {areas.map((a) => (
              <button
                key={a}
                className={area === a ? 'tag-chip hot-chip' : 'tag-chip'}
                onClick={() => setArea(a)}
              >
                {a}
              </button>
            ))}
          </div>

          <h2 style={{ marginTop: 28 }}>🏷️ ジャンル・条件</h2>
          <div className="tag-row">
            {keywords.map((k) => (
              <button
                key={k}
                className={keyword === k ? 'tag-chip hot-chip' : 'tag-chip'}
                onClick={() => setKeyword(k)}
              >
                {k}
              </button>
            ))}
          </div>
        </section>

        <section className="mag-search">
          <h2>検索条件</h2>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="自由入力：韓国系 / 高級 / 新人 / 口コミ"
          />
        </section>

        <section className="mag-ranking">
          <div className="ranking-title">
            <h2>検索メニュー</h2>
            <span>{area} × {keyword}</span>
          </div>

          <div className="store-result-grid">
            {links.map((item) => (
              <a
                key={item.title}
                className="store-result-card"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <b>検索する ›</b>
              </a>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  )
}

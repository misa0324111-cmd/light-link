'use client'

import { useState } from 'react'
import { BottomNav } from '@/components/BottomNav'

const areas = ['新宿', '池袋', '渋谷', '上野', '五反田', '横浜', '川崎']
const keywords = ['高級', '韓国系', '新人', '本日出勤', '口コミ', 'ランキング']

export default function StoreSearchPage() {
  const [area, setArea] = useState('新宿')
  const [keyword, setKeyword] = useState('高級')

  const q = `${area} ${keyword} 風俗 店舗情報`
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(q)}`
  const cityHeavenUrl = `https://www.google.com/search?q=${encodeURIComponent(`site:cityheaven.net ${q}`)}`

  return (
    <>
      <main className="mag-home">
        <section className="mag-search">
          <h1>🔍 店舗検索</h1>
          <p className="mag-lead">地域別にネット上の公開店舗情報を検索できます。</p>

          <h3>📍 エリア</h3>
          <div className="tag-row">
            {areas.map((a) => (
              <button key={a} className={area === a ? 'tag-chip hot-chip' : 'tag-chip'} onClick={() => setArea(a)}>
                {a}
              </button>
            ))}
          </div>

          <h3 style={{ marginTop: 22 }}>🏷️ キーワード</h3>
          <div className="tag-row">
            {keywords.map((k) => (
              <button key={k} className={keyword === k ? 'tag-chip hot-chip' : 'tag-chip'} onClick={() => setKeyword(k)}>
                {k}
              </button>
            ))}
          </div>

          <div className="hero-buttons">
            <a className="btn" href={googleUrl} target="_blank">Googleで検索</a>
            <a className="btn btn2" href={cityHeavenUrl} target="_blank">シティヘブン系で検索</a>
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  )
}

'use client'

import { useState } from 'react'
import { BottomNav } from '@/components/BottomNav'

export default function StoreSearchPage() {
  const [area, setArea] = useState('新宿')
  const [keyword, setKeyword] = useState('')

  const query = `${area} ${keyword} 風俗 店舗情報`
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`
  const cityUrl = `https://www.google.com/search?q=${encodeURIComponent(`site:cityheaven.net ${query}`)}`

  return (
    <>
      <main className="mag-home">
        <section className="mag-search">
          <h2>店舗情報検索</h2>
          <p className="mag-lead">
            エリア・店名・ジャンルで実際の店舗情報を検索できます。
          </p>

          <input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="例：新宿 / 池袋 / 渋谷"
          />

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="例：店舗名 / 韓国系 / デリヘル / 高級"
            style={{ marginTop: 12 }}
          />

          <div className="hero-buttons">
            <a className="btn" href={googleUrl} target="_blank">
              Googleで検索
            </a>

            <a className="btn btn2" href={cityUrl} target="_blank">
              シティヘブン系で検索
            </a>
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  )
}
'use client'

import { useState } from 'react'

export default function StoreSearchPage() {
  const [area, setArea] = useState('')
  const [keyword, setKeyword] = useState('')

  const search = () => {
    const q = `${area} ${keyword} 店舗情報`
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(q)}`,
      '_blank'
    )
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>🔍 店舗検索</h1>

      <input
        placeholder="エリア（新宿・池袋など）"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        style={{
          width: '100%',
          padding: 12,
          marginTop: 12
        }}
      />

      <input
        placeholder="キーワード"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          width: '100%',
          padding: 12,
          marginTop: 12
        }}
      />

      <button
        onClick={search}
        style={{
          marginTop: 16,
          padding: 16,
          width: '100%'
        }}
      >
        検索する
      </button>
    </main>
  )
}
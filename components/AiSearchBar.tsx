'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { talents } from '@/lib/data'

export function AiSearchBar() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()

    if (!q) return talents.slice(0, 3)

    return talents
      .filter((talent) => {
        const text = [
          talent.name,
          talent.area,
          talent.profile,
          talent.tags.join(' '),
          String(talent.aiScore),
        ]
          .join(' ')
          .toLowerCase()

        return text.includes(q)
      })
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, 5)
  }, [query])

  return (
    <section className="card grid">
      <h2>AI検索</h2>
      <p className="muted">名前・エリア・特徴を入力してください。</p>

      <input
        className="field"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="例：れいな / 新宿 / 癒し系 / 本日出勤"
      />

      <div className="grid">
        {results.map((talent) => (
          <Link
            key={talent.id}
            className="card talent"
            href={`/talents/${talent.id}`}
          >
            <div className="avatar">{talent.name[0]}</div>
            <div>
              <b>{talent.name}</b>
              <p className="small muted">
                {talent.area} / AIおすすめ度 {talent.aiScore}%
              </p>
              <p className="small">{talent.tags.join(' / ')}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
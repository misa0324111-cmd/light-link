'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getFavoriteTalents, getMatchingHistory, getPreferenceSummary, getRecentTalents } from '@/lib/preferences'
import type { Talent } from '@/lib/data'

export function PreferenceDashboard() {
  const [favorites, setFavorites] = useState<Talent[]>([])
  const [recent, setRecent] = useState<Talent[]>([])
  const [summary, setSummary] = useState({ favoritesCount: 0, recentCount: 0, topTags: [] as string[] })
  const [matchingHistory, setMatchingHistory] = useState<any[]>([])

  useEffect(() => {
    setFavorites(getFavoriteTalents())
    setRecent(getRecentTalents())
    setSummary(getPreferenceSummary())
    setMatchingHistory(getMatchingHistory())
  }, [])

  return (
    <section className="grid">
      <section className="hero">
        <p className="badge">PREFERENCE</p>
        <h1>好み学習</h1>
        <p className="muted">お気に入り・閲覧履歴・診断履歴から、あなたの好みを整理します。</p>
      </section>

      <section className="card">
        <h2>あなたの傾向</h2>
        <p className="small muted">お気に入り: {summary.favoritesCount}件 / 閲覧履歴: {summary.recentCount}件</p>
        <p className="small">よく見るタグ: {summary.topTags.length ? summary.topTags.join(' / ') : 'まだありません'}</p>
      </section>

      <section className="card grid">
        <h2>お気に入り</h2>
        {favorites.length ? favorites.map((talent) => (
          <Link className="talent" href={`/talents/${talent.id}`} key={talent.id}>
            <div className="avatar">{talent.name[0]}</div>
            <div><b>{talent.name}</b><p className="small muted">{talent.tags.join(' / ')}</p></div>
          </Link>
        )) : <p className="muted">まだお気に入りはありません。</p>}
      </section>

      <section className="card grid">
        <h2>最近見た候補</h2>
        {recent.length ? recent.map((talent) => (
          <Link className="talent" href={`/talents/${talent.id}`} key={talent.id}>
            <div className="avatar">{talent.name[0]}</div>
            <div><b>{talent.name}</b><p className="small muted">{talent.area}</p></div>
          </Link>
        )) : <p className="muted">閲覧履歴はまだありません。</p>}
      </section>

      <section className="card">
        <h2>診断履歴</h2>
        <p className="small muted">{matchingHistory.length}件の診断履歴があります。</p>
      </section>
    </section>
  )
}

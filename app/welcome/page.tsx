import Link from 'next/link'
import { BottomNav } from '@/components/BottomNav'

const quickTags = ['🔥 今夜人気急上昇', '👑 AIおすすめNo.1', '💎 VIP向け', '✨ 本日の注目']

const moodTags = [
  '癒されたい',
  '楽しく話したい',
  '甘えたい',
  'ドキドキしたい',
  'ストレス発散',
  '恋人気分',
  'ご褒美時間',
  '特別感',
]

const typeTags = [
  '韓国系',
  '清楚系',
  'ギャル系',
  'お姉さん系',
  '可愛い系',
  '美人系',
  'アイドル系',
  'モデル系',
  '小悪魔系',
  '癒し系',
]

const areaTags = ['新宿', '池袋', '渋谷', '上野', '五反田', '品川', '新橋', '吉祥寺']

const conditionTags = ['本日出勤', '即案内可能', '初心者人気', '会話上手', '聞き上手', 'リピート多数']

const cityMenu = [
  { label: '本日出勤', icon: '📅', href: '/search?q=本日出勤' },
  { label: '新人', icon: '🌸', href: '/search?q=新人' },
  { label: 'ランキング', icon: '👑', href: '/ranking' },
  { label: '写メ日記', icon: '📸', href: '/diary' },
  { label: 'クーポン', icon: '🎟️', href: '/coupons' },
  { label: '口コミ', icon: '💬', href: '/reviews' },
]

export default function Welcome() {
  const ranking = [
    { rank: '1', name: 'れいな', area: '新宿', score: '96%', emoji: '👩🏻' },
    { rank: '2', name: 'あや', area: '渋谷', score: '92%', emoji: '👩' },
    { rank: '3', name: 'みさき', area: '池袋', score: '90%', emoji: '👩🏻‍🦰' },
  ]

  const tagLink = (tag: string) => `/search?q=${encodeURIComponent(tag)}`

  return (
    <>
      <main className="mag-home">
        <section className="mag-hero">
          <div className="mag-content">
            <p className="mag-logo">✦ AI CONCIERGE ✦</p>

            <h1>
              AIが理想の相手を
              <br />
              会話でご案内します
            </h1>

            <p className="mag-lead">
              タイプ・予算・エリアを選ぶだけ。
              <br />
              相性スコア付きでおすすめします。
            </p>

            <div className="hero-buttons">
              <Link className="btn" href="/concierge">AIコンシェルジュ</Link>
              <Link className="btn btn2" href="/search">一覧から探す</Link>
            </div>
          </div>
        </section>

        <section className="city-menu">
          {cityMenu.map((item) => (
            <Link className="city-menu-card" href={item.href} key={item.label}>
              <span>{item.icon}</span>
              <b>{item.label}</b>
            </Link>
          ))}
        </section>

        <section className="mag-search">
          <h2>AI検索 ✨</h2>
          <input placeholder="例：れいな / 新宿 / 癒し系 / 本日出勤" />
        </section>

        <section className="tag-panel">
          <h2>気分で探す</h2>

          <div className="tag-row hot">
            {quickTags.map((tag) => (
              <Link href={tagLink(tag)} className="tag-chip hot-chip" key={tag}>
                {tag}
              </Link>
            ))}
          </div>

          <h3>💕 希望タイプ</h3>
          <div className="tag-row">
            {moodTags.map((tag) => (
              <Link href={tagLink(tag)} className="tag-chip" key={tag}>
                {tag}
              </Link>
            ))}
          </div>

          <h3>👩 タイプ</h3>
          <div className="tag-row">
            {typeTags.map((tag) => (
              <Link href={tagLink(tag)} className="tag-chip" key={tag}>
                {tag}
              </Link>
            ))}
          </div>

          <h3>📍 エリア</h3>
          <div className="tag-row">
            {areaTags.map((tag) => (
              <Link href={tagLink(tag)} className="tag-chip area-chip" key={tag}>
                {tag}
              </Link>
            ))}
          </div>

          <h3>⚡ 条件</h3>
          <div className="tag-row">
            {conditionTags.map((tag) => (
              <Link href={tagLink(tag)} className="tag-chip" key={tag}>
                {tag}
              </Link>
            ))}
          </div>
        </section>

        <section className="mag-ranking">
          <div className="ranking-title">
            <h2>👑 RANKING</h2>
            <Link href="/ranking">もっと見る ›</Link>
          </div>

          <div className="ranking-grid">
            {ranking.map((item) => (
              <Link className="rank-card" href="/search" key={item.rank}>
                <div className="rank-badge">{item.rank}</div>
                <div className="rank-photo">
                  <span className="rank-emoji">{item.emoji}</span>
                </div>
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
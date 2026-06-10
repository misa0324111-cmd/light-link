import Link from 'next/link'
import { Header } from '@/components/Header'

const items = [
  ['利用規約', '/terms'],
  ['プライバシー', '/privacy'],
  ['通報フォーム', '/report'],
  ['本番運営', '/admin/operations'],
  ['ランキング', '/ranking'],
  ['新宿特集', '/features/shinjuku'],
  ['店舗集客ツール', '/store/growth'],
  ['店舗登録', '/store/signup'],
  ['店舗ダッシュボード', '/store/dashboard'],
  ['店舗申請管理', '/admin/store-applications'],
  ['AIコンシェルジュ', '/concierge'],
  ['AIマッチング', '/matching'],
  ['AIチャット', '/chat'],
  ['好み学習', '/preferences'],
  ['店舗管理', '/store-admin'],
  ['運営管理', '/admin'],
  ['本番公開チェック', '/admin/production'],
  ['最終確認', '/final-check'],
  ['KPI分析', '/admin/kpi'],
  ['プラン管理', '/billing'],
  ['LINE相談', '/line'],
]

export default function ReleasePage() {
  return (
    <>
      <Header label="v3.0" />
      <main className="page grid">
        <section className="hero">
          <p className="badge">PUBLIC RELEASE</p>
          <h1>LIGHT LINK v3.0</h1>
          <p className="muted">AIマッチングサービス公開版です。</p>
        </section>

        {items.map(([label, href]) => (
          <Link className="card" href={href} key={href}>
            <b>{label}</b>
            <p className="small muted">機能を確認する</p>
          </Link>
        ))}
      </main>
    </>
  )
}

import Link from 'next/link'
import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { LineCta } from '@/components/LineCta'
import { FavoriteButton } from '@/components/FavoriteButton'
import { ViewTracker } from '@/components/ViewTracker'
import { JsonLd } from '@/components/JsonLd'
import { getJsonLdTalent } from '@/lib/seo'
import { getTalent } from '@/lib/data'

export default async function TalentDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const talent = getTalent(id)

  if (!talent) {
    return (
      <>
        <Header label="詳細" />
        <main className="page grid">
          <section className="card">
            <h1>見つかりません</h1>
            <Link className="btn" href="/search">
              一覧へ戻る
            </Link>
          </section>
        </main>
        <BottomNav />
      </>
    )
  }

  return (
    <>
      <JsonLd data={getJsonLdTalent(talent.id)} />
      <Header label="詳細" />
      <ViewTracker talentId={talent.id} />

      <main className="page grid">
        <section className="card">
          <div className="avatar">{talent.name[0]}</div>
          <h1>{talent.name}</h1>
          <p className="muted">{talent.area}</p>
          <p>{talent.profile}</p>
          <p className="score">AIおすすめ度 {talent.aiScore}%</p>
        </section>

        <section className="card">
          <h2>タグ</h2>
          <p className="muted">{talent.tags.join(' / ')}</p>
        </section>

        <section className="card grid">
          <Link className="btn" href={`/reservation/new?talent=${talent.id}`}>
            予約する
          </Link>
          <LineCta label="LINE相談" source="talent_detail" />
          <FavoriteButton talentId={talent.id} />
          <Link className="btn btn2" href="/report">
            通報
          </Link>
        </section>
      </main>

      <BottomNav />
    </>
  )
}
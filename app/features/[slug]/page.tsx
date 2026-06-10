import Link from 'next/link'
import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { getFeatureData } from '@/lib/growth'

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { feature, rows } = getFeatureData(slug)
  return (
    <>
      <Header label="特集" />
      <main className="page grid">
        <section className="hero">
          <p className="badge">FEATURE</p>
          <h1>{feature.title}</h1>
          <p className="muted">{feature.description}</p>
        </section>

        {rows.map((talent, index) => (
          <Link className="card talent" href={`/talents/${talent.id}`} key={talent.id}>
            <div className="avatar">{index + 1}</div>
            <div>
              <b>{talent.name}</b>
              <p className="small muted">AI相性 {talent.aiScore}% / {talent.area}</p>
            </div>
          </Link>
        ))}
      </main>
      <BottomNav />
    </>
  )
}

import Link from 'next/link'
import { Header } from '@/components/Header'
import { getFinalCheckItems } from '@/lib/final-check'

export default function FinalCheckPage() {
  const items = getFinalCheckItems()
  return (
    <>
      <Header label="最終確認" />
      <main className="page grid">
        <section className="hero">
          <p className="badge">FINAL CHECK</p>
          <h1>公開前の最終確認</h1>
          <p className="muted">主要画面と外部サービス設定を確認します。</p>
        </section>

        {items.map((item) => (
          <Link className="card" href={item.path} key={`${item.category}-${item.label}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <b>{item.label}</b>
              <span className={item.status === 'ready' ? 'pink' : 'muted'}>
                {item.status === 'ready' ? 'READY' : 'CONFIG'}
              </span>
            </div>
            <p className="small muted">{item.category} / {item.path}</p>
          </Link>
        ))}
      </main>
    </>
  )
}

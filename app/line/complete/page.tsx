import Link from 'next/link'
import { Header } from '@/components/Header'
import { LineCta } from '@/components/LineCta'

export default function LineCompletePage() {
  return (
    <>
      <Header label="LINE連携" />
      <main className="page grid">
        <section className="card" style={{ textAlign: 'center' }}>
          <h1>LINE相談へ進む</h1>
          <p className="muted">予約内容や希望条件をLINEで相談できます。</p>
          <LineCta label="LINE友だち追加へ" source="line_complete" />
          <Link className="btn btn2" href="/welcome">トップへ戻る</Link>
        </section>
      </main>
    </>
  )
}

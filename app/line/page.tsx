import { Header } from '@/components/Header'
import { LineCta } from '@/components/LineCta'

export default function LinePage() {
  return (
    <>
      <Header label="LINE相談" />
      <main className="page grid">
        <section className="hero">
          <p className="badge">LINE CONSULT</p>
          <h1>LINEで相談する</h1>
          <p className="muted">AIで見つけた候補を、そのままLINE相談へつなげます。</p>
        </section>

        <section className="card grid">
          <h2>できること</h2>
          <p className="muted">・予約前の相談</p>
          <p className="muted">・空き状況の確認</p>
          <p className="muted">・おすすめ候補の共有</p>
          <LineCta source="line_page" />
        </section>
      </main>
    </>
  )
}

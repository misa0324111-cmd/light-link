import { Header } from '@/components/Header'
import { ReportForm } from '@/components/ReportForm'

export default function ReportPage() {
  return (
    <>
      <Header label="通報" />
      <main className="page grid">
        <section className="hero">
          <p className="badge">REPORT</p>
          <h1>通報・修正依頼</h1>
          <p className="muted">不適切な内容や誤った掲載情報を運営へ送信できます。</p>
        </section>
        <ReportForm />
      </main>
    </>
  )
}

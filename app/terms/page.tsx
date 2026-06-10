import { Header } from '@/components/Header'

export default function TermsPage() {
  return (
    <>
      <Header label="利用規約" />
      <main className="page grid">
        <section className="hero">
          <p className="badge">TERMS</p>
          <h1>利用規約</h1>
          <p className="muted">LIGHT LINKの利用条件です。</p>
        </section>
        <section className="card grid">
          <h2>1. サービスの目的</h2>
          <p className="muted">本サービスは、AIによるマッチング・情報検索・予約相談導線を提供します。</p>
          <h2>2. 禁止事項</h2>
          <p className="muted">虚偽情報の登録、不正アクセス、第三者の権利侵害、法令に違反する利用を禁止します。</p>
          <h2>3. 掲載情報</h2>
          <p className="muted">掲載情報は店舗または運営が確認し、必要に応じて修正・非公開にすることがあります。</p>
          <h2>4. 免責</h2>
          <p className="muted">外部サービス連携や通信環境により、一部機能が利用できない場合があります。</p>
        </section>
      </main>
    </>
  )
}

import { Header } from '@/components/Header'

export default function PrivacyPage() {
  return (
    <>
      <Header label="プライバシーポリシー" />
      <main className="page grid">
        <section className="hero">
          <p className="badge">PRIVACY</p>
          <h1>プライバシーポリシー</h1>
          <p className="muted">個人情報と利用データの取り扱いについて。</p>
        </section>
        <section className="card grid">
          <h2>取得する情報</h2>
          <p className="muted">問い合わせ内容、予約相談内容、利用履歴、端末情報、Cookie等を取得する場合があります。</p>
          <h2>利用目的</h2>
          <p className="muted">マッチング精度向上、予約相談、通知、サービス改善、不正利用防止に利用します。</p>
          <h2>外部サービス</h2>
          <p className="muted">Supabase、OpenAI、Stripe、LINE、メール配信サービス等を利用する場合があります。</p>
          <h2>お問い合わせ</h2>
          <p className="muted">削除・訂正・開示の希望は運営窓口までご連絡ください。</p>
        </section>
      </main>
    </>
  )
}

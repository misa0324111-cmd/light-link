import Link from 'next/link'
import { Header } from '@/components/Header'
import { StoreSignupForm } from '@/components/StoreSignupForm'

export default function StoreSignupPage() {
  return (
    <>
      <Header label="店舗登録" />
      <main className="page grid">
        <section className="hero">
          <p className="badge">SAAS SIGNUP</p>
          <h1>LIGHT LINKに店舗を登録</h1>
          <p className="muted">AIマッチングサービスへ掲載する店舗申請を行います。</p>
        </section>
        <StoreSignupForm />
        <Link className="btn btn2" href="/welcome">戻る</Link>
      </main>
    </>
  )
}

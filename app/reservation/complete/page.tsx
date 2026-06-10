import Link from 'next/link'
import { Header } from '@/components/Header'
import { LineCta } from '@/components/LineCta'

export default function Complete(){
  return (
    <>
      <Header label="予約完了"/>
      <main className="page grid">
        <section className="card" style={{textAlign:'center'}}>
          <h1>送信しました</h1>
          <p className="muted">店舗からの連絡をお待ちください。急ぎの場合はLINE相談も利用できます。</p>
          <LineCta source="reservation_complete" />
          <Link className="btn btn2" href="/welcome">トップへ戻る</Link>
        </section>
      </main>
    </>
  )
}

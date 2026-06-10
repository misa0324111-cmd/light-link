import Link from 'next/link'
export default function AgeCheck() {
  return <main className="page" style={{display:'grid',minHeight:'100dvh',placeItems:'center'}}>
    <section className="card" style={{textAlign:'center'}}>
      <div className="brand" style={{fontSize:28}}>LIGHT <span className="pink">LINK</span></div>
      <h1>年齢確認</h1>
      <p className="muted">本サービスは成人向け情報を含む場合があります。条件を満たしている方のみお進みください。</p>
      <div className="grid" style={{marginTop:24}}>
        <Link className="btn" href="/welcome">条件を満たしています</Link>
        <Link className="btn btn2" href="https://www.google.com">退出する</Link>
      </div>
    </section>
  </main>
}

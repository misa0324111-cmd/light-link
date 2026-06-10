import Link from 'next/link'
import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { talents } from '@/lib/data'

export default function StoreMediaPage() {
  return (
    <>
      <Header label="画像管理" />
      <main className="page grid">
        <AuthGate allow={['store_admin','admin']}>
          <section className="hero">
            <p className="badge">MEDIA</p>
            <h1>画像管理</h1>
            <p className="muted">キャストを選んで画像を管理します。</p>
          </section>

          {talents.map((talent) => (
            <Link className="card talent" key={talent.id} href={`/store-admin/media/${talent.id}`}>
              <div className="avatar">{talent.name[0]}</div>
              <div>
                <b>{talent.name}</b>
                <p className="small muted">画像を管理する</p>
              </div>
            </Link>
          ))}

          <Link className="btn" href="/store-admin">戻る</Link>
        </AuthGate>
      </main>
    </>
  )
}

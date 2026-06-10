import Link from 'next/link'
import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { getSafetyChecklist } from '@/lib/safety'

export default function AdminSafetyPage() {
  const list = getSafetyChecklist()

  return (
    <>
      <Header label="安全対策" />
      <main className="page grid">
        <AuthGate allow={['admin']}>
          <section className="hero">
            <p className="badge">SAFETY</p>
            <h1>安全対策チェック</h1>
            <p className="muted">公開前の審査・規約・通報導線を確認します。</p>
          </section>
          <section className="card grid">
            {list.map((item) => <p className="small" key={item}>□ {item}</p>)}
          </section>
          <Link className="btn" href="/admin/reports">通報管理へ</Link>
        </AuthGate>
      </main>
    </>
  )
}

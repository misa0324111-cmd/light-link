import Link from 'next/link'
import { Header } from '@/components/Header'
import { talents } from '@/lib/data'
import { TalentForm } from '@/components/TalentForm'
import { ManagedTalentList } from '@/components/ManagedTalentList'
import { AuthGate } from '@/components/AuthGate'

export default function StoreTalentsPage() {
  return (
    <>
      <Header label="キャスト管理" />
      <main className="page grid">
        <AuthGate allow={['store_admin','admin']}>
          <section className="card">
            <h1>キャスト管理</h1>
            <p className="muted">登録・編集・非表示ができます。</p>
          </section>
          <TalentForm />
          <ManagedTalentList initialTalents={talents} />
          <Link className="btn" href="/store-admin">戻る</Link>
        </AuthGate>
      </main>
    </>
  )
}

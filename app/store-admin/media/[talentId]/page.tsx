import Link from 'next/link'
import { Header } from '@/components/Header'
import { AuthGate } from '@/components/AuthGate'
import { TalentMediaManager } from '@/components/TalentMediaManager'
import { getTalent } from '@/lib/data'

export default async function TalentMediaPage({
  params,
}: {
  params: Promise<{ talentId: string }>
}) {
  const { talentId } = await params
  const talent = getTalent(talentId)

  return (
    <>
      <Header label="画像管理" />

      <main className="page grid">
        <AuthGate allow={['store_admin', 'admin']}>
          <section className="card">
            <h1>{talent?.name ?? 'キャスト'} の画像管理</h1>
            <p className="muted">
              画像URL登録とStorage URL作成ができます。
            </p>
          </section>

          <TalentMediaManager talentId={talentId} />

          <Link className="btn" href="/store-admin/media">
            戻る
          </Link>
        </AuthGate>
      </main>
    </>
  )
}
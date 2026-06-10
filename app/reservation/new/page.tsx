import { Header } from '@/components/Header'
import { getTalent } from '@/lib/data'
import { ReservationForm } from '@/components/ReservationForm'

export default async function Reservation({
  searchParams,
}: {
  searchParams: Promise<{ talent?: string }>
}) {
  const params = await searchParams

  const talent = params.talent
    ? getTalent(params.talent)
    : undefined

  return (
    <>
      <Header label="予約" />

      <main className="page_grid">
        <section className="card">
          <h1>予約リクエスト</h1>

          <p className="muted">
            希望内容を入力してください。
            {talent ? ` 対象: ${talent.name}` : ''}
          </p>

          <ReservationForm
            talentId={talent?.id}
            storeId={talent?.storeId}
          />
        </section>
      </main>
    </>
  )
}
import { Header } from '@/components/Header'
import { getTalent } from '@/lib/data'
import { ReservationForm } from '@/components/ReservationForm'

export default function Reservation({ searchParams }: { searchParams:{talent?:string} }) {
  const talent=searchParams.talent ? getTalent(searchParams.talent) : undefined
  return (
    <>
      <Header label="予約"/>
      <main className="page grid">
        <section className="card">
          <h1>予約リクエスト</h1>
          <p className="muted">希望内容を入力してください。{talent ? `対象: ${talent.name}` : ''}</p>
          <ReservationForm talentId={talent?.id} storeId={talent?.storeId} />
        </section>
      </main>
    </>
  )
}

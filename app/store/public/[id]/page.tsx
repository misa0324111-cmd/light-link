import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { StorePublicLanding } from '@/components/StorePublicLanding'

export default function StorePublicPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Header label="店舗ページ" />
      <main className="page grid">
        <StorePublicLanding storeId={params.id} />
      </main>
      <BottomNav />
    </>
  )
}

import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { StorePublicLanding } from '@/components/StorePublicLanding'

export default async function StorePublicPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <>
      <Header label="店舗ページ" />

      <main className="page grid">
        <StorePublicLanding storeId={id} />
      </main>

      <BottomNav />
    </>
  )
}
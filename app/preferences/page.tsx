import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { PreferenceDashboard } from '@/components/PreferenceDashboard'

export default function PreferencesPage() {
  return (
    <>
      <Header label="好み学習" />
      <main className="page grid">
        <PreferenceDashboard />
      </main>
      <BottomNav />
    </>
  )
}

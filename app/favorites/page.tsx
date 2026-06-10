import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { PreferenceDashboard } from '@/components/PreferenceDashboard'

export default function Favorites(){
  return (
    <>
      <Header label="お気に入り"/>
      <main className="page grid">
        <PreferenceDashboard />
      </main>
      <BottomNav/>
    </>
  )
}

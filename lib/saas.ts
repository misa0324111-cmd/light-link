export type StoreApplicationStatus = 'pending' | 'approved' | 'rejected' | 'hold'

export type StoreApplication = {
  id: string
  storeName: string
  ownerName: string
  email: string
  phone: string
  area: string
  status: StoreApplicationStatus
  createdAt: string
}

const APPLICATION_KEY = 'light_link_store_applications'

function readApplications(): StoreApplication[] {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(APPLICATION_KEY)
  if (!raw) return []
  try { return JSON.parse(raw) as StoreApplication[] } catch { return [] }
}

function writeApplications(rows: StoreApplication[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(APPLICATION_KEY, JSON.stringify(rows))
}

export function createStoreApplication(input: {
  storeName: string
  ownerName: string
  email: string
  phone: string
  area: string
}) {
  const row: StoreApplication = {
    id: `app-${Date.now()}`,
    ...input,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  const rows = [row, ...readApplications()]
  writeApplications(rows)
  return row
}

export function listStoreApplications() {
  return readApplications()
}

export function updateStoreApplicationStatus(id: string, status: StoreApplicationStatus) {
  const rows = readApplications().map((row) => row.id === id ? { ...row, status } : row)
  writeApplications(rows)
  return rows.find((row) => row.id === id)
}

export function getSaasDashboardKpis() {
  return [
    { label: 'AI相談', value: '128', note: '今月' },
    { label: '予約', value: '19', note: '今月' },
    { label: 'LINE相談', value: '42', note: '今月' },
    { label: 'プラン', value: 'Trial', note: '現在' },
  ]
}

export const onboardingSteps = [
  { title: '店舗情報を登録', text: '店舗名、エリア、連絡先を設定します。', href: '/store/signup' },
  { title: 'キャストを登録', text: '掲載する候補情報を登録します。', href: '/store-admin/talents' },
  { title: '画像を登録', text: '候補画像やプロフィール画像を設定します。', href: '/store-admin/media' },
  { title: 'プランを選択', text: '無料/スタンダード/プレミアムを選択します。', href: '/billing' },
  { title: '公開準備を確認', text: '通知、LINE、Stripe、OpenAI設定を確認します。', href: '/admin/production' },
]

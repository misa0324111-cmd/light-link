export type FinalCheckItem = {
  category: string
  label: string
  path: string
  status: 'ready' | 'needs-config'
}

export function getFinalCheckItems(): FinalCheckItem[] {
  return [
    { category: 'User', label: '年齢確認/トップ', path: '/', status: 'ready' },
    { category: 'User', label: 'AIマッチング診断', path: '/matching', status: 'ready' },
    { category: 'User', label: 'AIチャット', path: '/chat', status: 'ready' },
    { category: 'User', label: '好み学習', path: '/preferences', status: 'ready' },
    { category: 'Store', label: '店舗管理', path: '/store-admin', status: 'ready' },
    { category: 'Store', label: 'キャスト管理', path: '/store-admin/talents', status: 'ready' },
    { category: 'Store', label: '予約管理', path: '/store-admin/reservations', status: 'ready' },
    { category: 'Store', label: '通知管理', path: '/store-admin/notifications', status: 'ready' },
    { category: 'Admin', label: '運営管理', path: '/admin', status: 'ready' },
    { category: 'Admin', label: 'KPI分析', path: '/admin/kpi', status: 'ready' },
    { category: 'Admin', label: '本番公開チェック', path: '/admin/production', status: 'needs-config' },
    { category: 'External', label: 'OpenAI', path: '/admin/production', status: 'needs-config' },
    { category: 'External', label: 'LINE', path: '/admin/production', status: 'needs-config' },
    { category: 'External', label: 'Stripe', path: '/billing', status: 'needs-config' },
  ]
}

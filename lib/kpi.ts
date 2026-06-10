export type KpiCard = {
  label: string
  value: string
  change: string
}

export type KpiSeries = {
  label: string
  value: number
}

export function getSampleKpis(): KpiCard[] {
  return [
    { label: 'AI相談数', value: '128', change: '+18%' },
    { label: 'LINEクリック', value: '42', change: '+12%' },
    { label: '予約リクエスト', value: '19', change: '+8%' },
    { label: '有料店舗', value: '3', change: '+1' },
  ]
}

export function getSampleFunnel(): KpiSeries[] {
  return [
    { label: '訪問', value: 320 },
    { label: 'AI相談', value: 128 },
    { label: '詳細閲覧', value: 76 },
    { label: 'LINEクリック', value: 42 },
    { label: '予約', value: 19 },
  ]
}

export function getConversionRate(from: number, to: number) {
  if (!from) return 0
  return Math.round((to / from) * 100)
}

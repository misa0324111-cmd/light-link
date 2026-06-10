export type ReportReason = 'inappropriate' | 'wrong_info' | 'privacy' | 'other'

export const reportReasons: { value: ReportReason; label: string }[] = [
  { value: 'inappropriate', label: '不適切な内容' },
  { value: 'wrong_info', label: '掲載情報が違う' },
  { value: 'privacy', label: 'プライバシーに関する問題' },
  { value: 'other', label: 'その他' },
]

export function getSafetyChecklist() {
  return [
    '年齢確認を表示している',
    '利用規約を公開している',
    'プライバシーポリシーを公開している',
    '通報フォームを用意している',
    '掲載審査フローを用意している',
    '運営通知を確認できる',
    '外部サービスの本番設定を確認している',
  ]
}

export function createReport(input: {
  targetType: string
  targetId?: string
  reason: ReportReason
  detail: string
}) {
  return {
    id: `report-${Date.now()}`,
    ...input,
    status: 'open',
    createdAt: new Date().toISOString(),
  }
}

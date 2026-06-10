export type ReservationTemplateInput = {
  customerName?: string
  talentName?: string
  requestedAt?: string
  phone?: string
  note?: string
}

export function reservationNotificationSubject(input: ReservationTemplateInput) {
  return `【LIGHT LINK】新規予約相談: ${input.talentName || '候補未指定'}`
}

export function reservationNotificationText(input: ReservationTemplateInput) {
  return [
    'LIGHT LINKに新規予約相談が届きました。',
    '',
    `お名前: ${input.customerName || '未入力'}`,
    `希望候補: ${input.talentName || '未指定'}`,
    `希望日時: ${input.requestedAt || '未入力'}`,
    `電話番号: ${input.phone || '未入力'}`,
    '',
    '要望:',
    input.note || 'なし',
    '',
    '店舗管理画面で内容を確認してください。',
  ].join('\n')
}

export function reservationLineText(input: ReservationTemplateInput) {
  return [
    '新規予約相談が届きました',
    `候補: ${input.talentName || '未指定'}`,
    `希望日時: ${input.requestedAt || '未入力'}`,
    `お名前: ${input.customerName || '未入力'}`,
  ].join('\n')
}

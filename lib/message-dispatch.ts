import { sendEmail } from './email'
import { sendLineNotify } from './line'
import { createNotification } from './notifications'
import { reservationLineText, reservationNotificationSubject, reservationNotificationText, type ReservationTemplateInput } from './message-templates'

export async function dispatchReservationNotification(input: ReservationTemplateInput & { storeId?: string; lineTo?: string }) {
  const subject = reservationNotificationSubject(input)
  const text = reservationNotificationText(input)
  const lineText = reservationLineText(input)

  const [notice, email, line] = await Promise.all([
    createNotification({
      type: 'reservation',
      title: '新規予約リクエスト',
      message: `${input.customerName || '新規ユーザー'}様から${input.talentName || '候補未指定'}への予約相談が届きました。`,
      storeId: input.storeId,
    }),
    sendEmail({ subject, text }),
    sendLineNotify({ to: input.lineTo, message: lineText }),
  ])

  return {
    notice,
    email,
    line,
  }
}

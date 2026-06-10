export function getLineAddFriendUrl() {
  return process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_URL || 'https://line.me/R/'
}

export async function sendLineNotify(input: {
  to?: string
  message: string
}) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
  if (!token) {
    return { ok: true, mode: 'demo', message: input.message }
  }

  if (!input.to) {
    return { ok: false, mode: 'line', error: 'LINE user id is required' }
  }

  const res = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      to: input.to,
      messages: [{ type: 'text', text: input.message }],
    }),
  })

  return { ok: res.ok, mode: 'line', status: res.status }
}

export function createReservationLineMessage(input: {
  talentName?: string
  requestedAt?: string
}) {
  return [
    'LIGHT LINK予約相談',
    input.talentName ? `希望キャスト: ${input.talentName}` : null,
    input.requestedAt ? `希望日時: ${input.requestedAt}` : null,
    'この内容で相談を開始します。',
  ].filter(Boolean).join('\n')
}

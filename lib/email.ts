export async function sendEmail(input: {
  to?: string
  subject: string
  text: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.NOTIFICATION_EMAIL_FROM || 'LIGHT LINK <noreply@example.com>'
  const to = input.to || process.env.NOTIFICATION_EMAIL_TO

  if (!apiKey || !to) {
    return {
      ok: true,
      mode: 'demo' as const,
      to: to || 'not-configured',
      subject: input.subject,
      text: input.text,
    }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: input.subject,
      text: input.text,
    }),
  })

  return {
    ok: res.ok,
    mode: 'resend' as const,
    status: res.status,
  }
}

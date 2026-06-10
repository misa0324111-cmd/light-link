export function trackLineClick(source: string) {
  if (typeof window === 'undefined') return
  const key = 'light_link_line_clicks'
  const raw = window.localStorage.getItem(key)
  const rows = raw ? JSON.parse(raw) as Array<{ source: string; at: string }> : []
  rows.push({ source, at: new Date().toISOString() })
  window.localStorage.setItem(key, JSON.stringify(rows))
}

export function getLineClicks() {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem('light_link_line_clicks')
  return raw ? JSON.parse(raw) as Array<{ source: string; at: string }> : []
}

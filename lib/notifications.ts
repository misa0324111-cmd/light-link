import { createSupabaseBrowserClient, hasSupabaseConfig } from './supabase'

export type NotificationType = 'reservation' | 'line' | 'billing' | 'system'

export type NotificationItem = {
  id: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: string
}

const LOCAL_KEY = 'light_link_notifications'

function readLocal(): NotificationItem[] {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(LOCAL_KEY)
  if (!raw) return []
  try { return JSON.parse(raw) as NotificationItem[] } catch { return [] }
}

function writeLocal(rows: NotificationItem[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(rows))
}

export function createLocalNotification(input: {
  type: NotificationType
  title: string
  message: string
}) {
  const item: NotificationItem = {
    id: `notice-${Date.now()}`,
    type: input.type,
    title: input.title,
    message: input.message,
    read: false,
    createdAt: new Date().toISOString(),
  }
  const rows = [item, ...readLocal()].slice(0, 50)
  writeLocal(rows)
  return item
}

export async function listNotifications(): Promise<NotificationItem[]> {
  if (!hasSupabaseConfig()) return readLocal()

  const supabase = createSupabaseBrowserClient()
  if (!supabase) return readLocal()

  const { data, error } = await supabase
    .from('notifications')
    .select('id,type,title,message,read,created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error || !data) return readLocal()

  return data.map((row: any) => ({
    id: row.id,
    type: row.type,
    title: row.title,
    message: row.message,
    read: row.read,
    createdAt: row.created_at,
  }))
}

export async function markNotificationRead(id: string) {
  if (!hasSupabaseConfig()) {
    writeLocal(readLocal().map((row) => row.id === id ? { ...row, read: true } : row))
    return { id }
  }

  const supabase = createSupabaseBrowserClient()
  if (!supabase) return { id }

  await supabase.from('notifications').update({ read: true }).eq('id', id)
  return { id }
}

export async function createNotification(input: {
  type: NotificationType
  title: string
  message: string
  storeId?: string
}) {
  if (!hasSupabaseConfig()) return createLocalNotification(input)

  const supabase = createSupabaseBrowserClient()
  if (!supabase) return createLocalNotification(input)

  const { data, error } = await supabase
    .from('notifications')
    .insert({
      type: input.type,
      title: input.title,
      message: input.message,
      store_id: input.storeId ?? null,
      read: false,
    })
    .select('id')
    .single()

  if (error) return createLocalNotification(input)
  return data
}

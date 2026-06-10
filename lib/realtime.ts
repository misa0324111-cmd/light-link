import { createSupabaseBrowserClient, hasSupabaseConfig } from './supabase'
import type { NotificationItem } from './notifications'

export function subscribeNotifications(callback: (notice: NotificationItem) => void) {
  if (!hasSupabaseConfig()) {
    return { unsubscribe: () => undefined, mode: 'demo' as const }
  }

  const supabase = createSupabaseBrowserClient()
  if (!supabase) return { unsubscribe: () => undefined, mode: 'demo' as const }

  const channel = supabase
    .channel('notifications-realtime')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'notifications' },
      (payload) => {
        const row = payload.new as any
        callback({
          id: row.id,
          type: row.type,
          title: row.title,
          message: row.message,
          read: row.read,
          createdAt: row.created_at,
        })
      },
    )
    .subscribe()

  return {
    mode: 'supabase' as const,
    unsubscribe: () => {
      supabase.removeChannel(channel)
    },
  }
}

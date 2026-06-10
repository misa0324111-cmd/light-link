import { getCurrentSession } from './auth'
import { createSupabaseBrowserClient, hasSupabaseConfig } from './supabase'

export async function getCurrentStoreId() {
  const session = await getCurrentSession()
  if (session?.storeId) return session.storeId

  if (!hasSupabaseConfig()) return '00000000-0000-0000-0000-000000000001'

  const supabase = createSupabaseBrowserClient()
  if (!supabase) return '00000000-0000-0000-0000-000000000001'

  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user?.id
  if (!userId) return '00000000-0000-0000-0000-000000000001'

  const { data } = await supabase
    .from('store_members')
    .select('store_id')
    .eq('user_id', userId)
    .limit(1)
    .maybeSingle()

  return data?.store_id ?? '00000000-0000-0000-0000-000000000001'
}

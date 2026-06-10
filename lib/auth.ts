import { createSupabaseBrowserClient, hasSupabaseConfig } from './supabase'

export type UserRole = 'user' | 'store_admin' | 'admin'
export type DemoSession = { email: string; role: UserRole; storeId?: string | null }
const SESSION_KEY = 'light_link_demo_session'

export function getDemoSession(): DemoSession | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try { return JSON.parse(raw) as DemoSession } catch { return null }
}

export function setDemoSession(session: DemoSession) {
  if (typeof window !== 'undefined') window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearDemoSession() {
  if (typeof window !== 'undefined') window.localStorage.removeItem(SESSION_KEY)
}

export function roleLabel(role: UserRole) {
  if (role === 'admin') return '運営管理者'
  if (role === 'store_admin') return '店舗管理者'
  return '一般ユーザー'
}

export function defaultPathForRole(role: UserRole) {
  if (role === 'admin') return '/admin'
  if (role === 'store_admin') return '/store-admin'
  return '/welcome'
}

export async function getCurrentSession(): Promise<DemoSession | null> {
  if (!hasSupabaseConfig()) return getDemoSession()

  const supabase = createSupabaseBrowserClient()
  if (!supabase) return getDemoSession()

  const { data: authData } = await supabase.auth.getUser()
  const user = authData.user
  if (!user) return getDemoSession()

  const { data: profile } = await supabase
    .from('profiles')
    .select('email,role,store_id')
    .eq('id', user.id)
    .maybeSingle()

  return {
    email: profile?.email ?? user.email ?? '',
    role: (profile?.role ?? 'user') as UserRole,
    storeId: profile?.store_id ?? null,
  }
}

export async function signInWithEmail(email: string, role: UserRole) {
  if (!hasSupabaseConfig()) {
    setDemoSession({ email, role, storeId: role === 'store_admin' ? '00000000-0000-0000-0000-000000000001' : null })
    return { ok: true, mode: 'demo' as const }
  }

  const supabase = createSupabaseBrowserClient()
  if (!supabase) throw new Error('Supabase未設定です')

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${location.origin}/role` },
  })

  if (error) throw error
  return { ok: true, mode: 'supabase' as const }
}

export async function signOut() {
  if (hasSupabaseConfig()) {
    const supabase = createSupabaseBrowserClient()
    await supabase?.auth.signOut()
  }
  clearDemoSession()
}

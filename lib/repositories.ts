import { createSupabaseBrowserClient, hasSupabaseConfig } from './supabase'
import { talents as sampleTalents, stores as sampleStores, type Talent } from './data'
import { getCurrentStoreId } from './store-scope'

function mapTalent(row: any): Talent {
  return {
    id: row.id,
    name: row.name,
    age: row.age ?? 0,
    area: row.area,
    tags: row.tags ?? [],
    price: row.price ?? 0,
    schedule: row.schedule ?? '',
    profile: row.profile ?? '',
    aiScore: row.ai_score ?? 80,
    storeId: row.store_id,
  }
}

export async function listTalents(): Promise<Talent[]> {
  if (!hasSupabaseConfig()) return sampleTalents
  const supabase = createSupabaseBrowserClient()
  if (!supabase) return sampleTalents

  const { data, error } = await supabase
    .from('talents')
    .select('id,name,age,area,tags,price,schedule,profile,ai_score,store_id')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error || !data?.length) return sampleTalents
  return data.map(mapTalent)
}

export async function createTalent(input: {
  storeId: string
  name: string
  age?: number
  area: string
  profile?: string
  tags?: string[]
  price?: number
  schedule?: string
}) {
  if (!hasSupabaseConfig()) return { id: `sample-${Date.now()}`, ...input }
  const supabase = createSupabaseBrowserClient()
  if (!supabase) throw new Error('Supabase未設定です')

  const { data, error } = await supabase
    .from('talents')
    .insert({
      store_id: input.storeId,
      name: input.name,
      age: input.age ?? null,
      area: input.area,
      profile: input.profile ?? '',
      tags: input.tags ?? [],
      price: input.price ?? 0,
      schedule: input.schedule ?? '',
      ai_score: 80,
      status: 'active',
    })
    .select('id')
    .single()

  if (error) throw error
  return data
}

export async function createReservation(input: {
  talentId?: string
  storeId?: string
  customerName: string
  phone: string
  requestedAt: string
  note?: string
}) {
  if (!hasSupabaseConfig()) return { id: `reservation-${Date.now()}`, ...input }
  const supabase = createSupabaseBrowserClient()
  if (!supabase) throw new Error('Supabase未設定です')

  const { data, error } = await supabase
    .from('reservations')
    .insert({
      talent_id: input.talentId || null,
      store_id: input.storeId || null,
      customer_name: input.customerName,
      phone: input.phone,
      requested_at: input.requestedAt,
      note: input.note ?? '',
      status: 'new',
    })
    .select('id')
    .single()

  if (error) throw error
  return data
}

export async function listReservations() {
  if (!hasSupabaseConfig()) {
    return [
      { id: 'sample-r1', customerName: 'サンプル太郎', phone: '09000000000', requestedAt: '本日 20:00', status: 'new', talentName: 'れいな' },
    ]
  }

  const supabase = createSupabaseBrowserClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('reservations')
    .select('id,customer_name,phone,requested_at,status,talents(name)')
    .eq('store_id', await getCurrentStoreId())
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return data.map((row: any) => ({
    id: row.id,
    customerName: row.customer_name,
    phone: row.phone,
    requestedAt: row.requested_at,
    status: row.status,
    talentName: row.talents?.name ?? '未指定',
  }))
}

export async function getDefaultStoreId() {
  if (!hasSupabaseConfig()) return sampleStores[0]?.id ?? 's1'
  const supabase = createSupabaseBrowserClient()
  if (!supabase) return 's1'
  const storeId = await getCurrentStoreId()
  return storeId ?? sampleStores[0]?.id ?? 's1'
}


export async function updateTalent(id: string, input: {
  name: string
  age?: number
  area: string
  profile?: string
  tags?: string[]
  price?: number
  schedule?: string
}) {
  if (!hasSupabaseConfig()) return { id, ...input }
  const supabase = createSupabaseBrowserClient()
  if (!supabase) throw new Error('Supabase未設定です')

  const { data, error } = await supabase
    .from('talents')
    .update({
      name: input.name,
      age: input.age ?? null,
      area: input.area,
      profile: input.profile ?? '',
      tags: input.tags ?? [],
      price: input.price ?? 0,
      schedule: input.schedule ?? '',
    })
    .eq('id', id)
    .select('id')
    .single()

  if (error) throw error
  return data
}

export async function deleteTalent(id: string) {
  if (!hasSupabaseConfig()) return { id }
  const supabase = createSupabaseBrowserClient()
  if (!supabase) throw new Error('Supabase未設定です')

  const { error } = await supabase
    .from('talents')
    .update({ status: 'hidden' })
    .eq('id', id)

  if (error) throw error
  return { id }
}

export async function updateReservationStatus(id: string, status: 'new' | 'confirmed' | 'cancelled' | 'completed') {
  if (!hasSupabaseConfig()) return { id, status }
  const supabase = createSupabaseBrowserClient()
  if (!supabase) throw new Error('Supabase未設定です')

  const { data, error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', id)
    .select('id,status')
    .single()

  if (error) throw error
  return data
}

import { createSupabaseBrowserClient, hasSupabaseConfig } from './supabase'

export type TalentMedia = {
  id: string
  talentId: string
  imageUrl: string
  caption?: string
  sortOrder: number
}

export async function listTalentMedia(talentId: string): Promise<TalentMedia[]> {
  if (!hasSupabaseConfig()) {
    return [
      {
        id: 'sample-media-1',
        talentId,
        imageUrl: 'https://placehold.co/600x800/18181b/f9a8d4?text=LIGHT+LINK',
        caption: 'サンプル画像',
        sortOrder: 1,
      },
    ]
  }

  const supabase = createSupabaseBrowserClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('talent_media')
    .select('id,talent_id,image_url,caption,sort_order')
    .eq('talent_id', talentId)
    .order('sort_order', { ascending: true })

  if (error || !data) return []

  return data.map((row: any) => ({
    id: row.id,
    talentId: row.talent_id,
    imageUrl: row.image_url,
    caption: row.caption ?? '',
    sortOrder: row.sort_order ?? 0,
  }))
}

export async function addTalentMedia(input: {
  talentId: string
  imageUrl: string
  caption?: string
}) {
  if (!hasSupabaseConfig()) {
    return { id: `sample-media-${Date.now()}`, ...input }
  }

  const supabase = createSupabaseBrowserClient()
  if (!supabase) throw new Error('Supabase未設定です')

  const { data, error } = await supabase
    .from('talent_media')
    .insert({
      talent_id: input.talentId,
      image_url: input.imageUrl,
      caption: input.caption ?? '',
      sort_order: 99,
    })
    .select('id')
    .single()

  if (error) throw error
  return data
}

export async function deleteTalentMedia(id: string) {
  if (!hasSupabaseConfig()) return { id }
  const supabase = createSupabaseBrowserClient()
  if (!supabase) throw new Error('Supabase未設定です')

  const { error } = await supabase.from('talent_media').delete().eq('id', id)
  if (error) throw error
  return { id }
}

export async function createStorageUploadUrl(input: {
  path: string
}) {
  if (!hasSupabaseConfig()) {
    return {
      path: input.path,
      signedUrl: '',
      publicUrl: `https://placehold.co/600x800/18181b/f9a8d4?text=${encodeURIComponent(input.path)}`,
      mode: 'demo' as const,
    }
  }

  const supabase = createSupabaseBrowserClient()
  if (!supabase) throw new Error('Supabase未設定です')

  const safePath = input.path.replaceAll('..', '').replace(/^\/+/, '')
  const { data, error } = await supabase.storage.from('talent-media').createSignedUploadUrl(safePath)
  if (error) throw error

  const { data: publicData } = supabase.storage.from('talent-media').getPublicUrl(safePath)

  return {
    path: safePath,
    signedUrl: data.signedUrl,
    token: data.token,
    publicUrl: publicData.publicUrl,
    mode: 'supabase' as const,
  }
}

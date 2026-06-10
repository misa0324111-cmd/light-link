import { createSupabaseBrowserClient, hasSupabaseConfig } from './supabase'

export async function saveChatHistory(input: {
  userText: string
  aiReply: string
  extracted?: string[]
  recommendations?: string[]
}) {
  if (!hasSupabaseConfig()) return { id: `local-chat-${Date.now()}` }

  const supabase = createSupabaseBrowserClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('ai_chat_histories')
    .insert({
      user_text: input.userText,
      ai_reply: input.aiReply,
      extracted: input.extracted ?? [],
      recommendations: input.recommendations ?? [],
    })
    .select('id')
    .single()

  if (error) return null
  return data
}

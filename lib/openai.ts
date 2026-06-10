export type OpenAiPreferenceResult = {
  area?: string
  mood?: string
  budget?: string
  timing?: string
  confidence: number
  extracted: string[]
}

export function hasOpenAiConfig() {
  return Boolean(process.env.OPENAI_API_KEY)
}

export async function extractPreferenceWithOpenAI(text: string): Promise<OpenAiPreferenceResult | null> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content:
            'あなたは日本語の予約相談文から希望条件を抽出するAIです。JSONのみ返してください。keys: area,mood,budget,timing,confidence,extracted。confidenceは0-100、extractedは日本語配列。',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      response_format: { type: 'json_object' },
    }),
  })

  if (!res.ok) {
    return null
  }

  const json = await res.json()
  const content = json.choices?.[0]?.message?.content
  if (!content) return null

  try {
    const parsed = JSON.parse(content)
    return {
      area: parsed.area || undefined,
      mood: parsed.mood || undefined,
      budget: parsed.budget || undefined,
      timing: parsed.timing || undefined,
      confidence: Number(parsed.confidence ?? 70),
      extracted: Array.isArray(parsed.extracted) ? parsed.extracted : [],
    }
  } catch {
    return null
  }
}

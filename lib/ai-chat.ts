import { recommend, type RecommendInput } from './ai'

export type ParsedPreference = RecommendInput & {
  rawText: string
  confidence: number
  extracted: string[]
}

const areaWords = ['新宿', '池袋', '渋谷', '五反田', '横浜']
const moodWords = ['清楚', '癒し', '可愛い', 'お姉さん', '優しい', '会話']
const timingWords = ['今日', '本日', '今すぐ', '明日', '週末']

export function parseUserPreference(text: string): ParsedPreference {
  const extracted: string[] = []

  const area = areaWords.find((word) => text.includes(word))
  if (area) extracted.push(`エリア: ${area}`)

  const mood = moodWords.find((word) => text.includes(word))
  if (mood) extracted.push(`タイプ: ${mood}`)

  const timingRaw = timingWords.find((word) => text.includes(word))
  const timing = timingRaw === '今日' ? '本日' : timingRaw
  if (timing) extracted.push(`タイミング: ${timing}`)

  let budget: string | undefined
  if (text.includes('2万') || text.includes('20000') || text.includes('20,000')) budget = '15,000〜25,000円'
  if (text.includes('3万') || text.includes('30000') || text.includes('30,000')) budget = '25,000円以上'
  if (budget) extracted.push(`予算: ${budget}`)

  const confidence = Math.min(95, 45 + extracted.length * 15)

  return {
    rawText: text,
    area,
    mood,
    timing,
    budget,
    tags: mood ? [mood] : [],
    confidence,
    extracted,
  }
}

export function createAiReply(text: string) {
  const parsed = parseUserPreference(text)
  const recommendations = recommend(parsed)

  const summary = parsed.extracted.length
    ? `希望条件を${parsed.extracted.length}件読み取りました。`
    : 'まだ条件が少ないため、総合評価が高い候補からご案内します。'

  return {
    parsed,
    recommendations,
    reply: `${summary} AIおすすめ順に候補を表示します。`,
  }
}

import { talents, type Talent } from './data'
import { getPreferenceSummary } from './preferences'

export type ConciergeStage = 'intro' | 'mood' | 'area' | 'budget' | 'timing' | 'result'

export type ConciergeState = {
  stage: ConciergeStage
  mood?: string
  area?: string
  budget?: string
  timing?: string
  messages: { role: 'ai' | 'user'; text: string }[]
}

export type ConciergeRecommendation = {
  talent: Talent
  score: number
  reasons: string[]
  comparison: {
    mood: number
    talk: number
    beginner: number
    availability: number
  }
}

export const initialConciergeState: ConciergeState = {
  stage: 'intro',
  messages: [
    {
      role: 'ai',
      text: 'こんばんは。AIコンシェルジュです。今日はどのような方をお探しですか？',
    },
  ],
}

export function nextQuestion(stage: ConciergeStage) {
  if (stage === 'intro') return 'まず、今の気分を教えてください。癒されたい、楽しく話したい、落ち着きたいなどで大丈夫です。'
  if (stage === 'mood') return 'エリアはどちらが希望ですか？ 新宿・池袋・こだわらない から選べます。'
  if (stage === 'area') return 'ご予算はどのくらいですか？ 15,000〜25,000円、25,000円以上、こだわらない から選べます。'
  if (stage === 'budget') return '利用タイミングはいつ頃ですか？ 本日、明日以降、相談して決めたい から選べます。'
  return '条件がそろいました。相性の良い候補をご提案します。'
}

function normalizeMood(text: string) {
  if (text.includes('癒') || text.includes('優') || text.includes('落ち')) return '癒し系'
  if (text.includes('楽') || text.includes('会話') || text.includes('明る')) return '会話上手'
  if (text.includes('可愛')) return '可愛い系'
  if (text.includes('お姉') || text.includes('大人')) return 'お姉さん系'
  return text || '癒し系'
}

function normalizeArea(text: string) {
  if (text.includes('新宿')) return '新宿'
  if (text.includes('池袋')) return '池袋'
  return 'こだわらない'
}

function normalizeBudget(text: string) {
  if (text.includes('3') || text.includes('30000') || text.includes('25,000円以上')) return '25,000円以上'
  if (text.includes('こだわ')) return 'こだわらない'
  return '15,000〜25,000円'
}

function normalizeTiming(text: string) {
  if (text.includes('今日') || text.includes('本日') || text.includes('今')) return '本日'
  if (text.includes('明日')) return '明日以降'
  return '相談して決めたい'
}

export function updateConciergeState(state: ConciergeState, userText: string): ConciergeState {
  const next: ConciergeState = {
    ...state,
    messages: [...state.messages, { role: 'user', text: userText }],
  }

  if (state.stage === 'intro') {
    next.mood = normalizeMood(userText)
    next.stage = 'mood'
  } else if (state.stage === 'mood') {
    next.area = normalizeArea(userText)
    next.stage = 'area'
  } else if (state.stage === 'area') {
    next.budget = normalizeBudget(userText)
    next.stage = 'budget'
  } else if (state.stage === 'budget') {
    next.timing = normalizeTiming(userText)
    next.stage = 'timing'
  } else {
    next.stage = 'result'
  }

  const aiText = next.stage === 'timing'
    ? 'ありがとうございます。条件がそろいました。相性の良い候補を表示します。'
    : nextQuestion(next.stage)

  return {
    ...next,
    messages: [...next.messages, { role: 'ai', text: aiText }],
  }
}

export function conciergeScore(state: ConciergeState, talent: Talent): ConciergeRecommendation {
  let score = talent.aiScore
  const reasons: string[] = []
  const preference = typeof window === 'undefined' ? null : getPreferenceSummary()

  if (state.area && state.area !== 'こだわらない' && talent.area === state.area) {
    score += 10
    reasons.push('希望エリアが一致しています')
  }

  if (state.budget === '15,000〜25,000円' && talent.price <= 25000) {
    score += 8
    reasons.push('予算帯が近いです')
  }

  if (state.timing === '本日' && talent.tags.includes('本日出勤')) {
    score += 10
    reasons.push('本日対応できます')
  }

  if (state.mood && talent.tags.some((tag) => tag.includes(state.mood.replace('系', '')))) {
    score += 12
    reasons.push('希望の雰囲気に合っています')
  }

  if (preference?.topTags?.some((tag) => talent.tags.includes(tag))) {
    score += 6
    reasons.push('過去の好み傾向とも近いです')
  }

  if (!reasons.length) reasons.push('総合評価が高い候補です')

  return {
    talent,
    score: Math.min(99, score),
    reasons,
    comparison: {
      mood: Math.min(5, Math.ceil(score / 20)),
      talk: talent.tags.some((tag) => tag.includes('会話')) ? 5 : 4,
      beginner: talent.profile.includes('初めて') ? 5 : 4,
      availability: talent.tags.includes('本日出勤') ? 5 : 3,
    },
  }
}

export function getConciergeRecommendations(state: ConciergeState) {
  return talents
    .map((talent) => conciergeScore(state, talent))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

export function createConciergeSummary(state: ConciergeState) {
  return [
    state.mood ? `雰囲気: ${state.mood}` : null,
    state.area ? `エリア: ${state.area}` : null,
    state.budget ? `予算: ${state.budget}` : null,
    state.timing ? `タイミング: ${state.timing}` : null,
  ].filter(Boolean).join(' / ')
}

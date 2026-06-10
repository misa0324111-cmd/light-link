import { talents, type Talent } from './data'

export type MatchingAnswer = {
  mood: string
  pace: string
  talk: string
  budget: string
  area: string
  timing: string
}

export type MatchResult = {
  talent: Talent
  score: number
  reasons: string[]
  tags: string[]
}

export const matchingQuestions = [
  { key: 'mood', label: '理想の雰囲気', options: ['癒し系', '清楚系', '可愛い系', 'お姉さん系', '会話上手'] },
  { key: 'pace', label: '過ごし方', options: ['ゆっくり落ち着きたい', '楽しく会話したい', '初めてなので安心感重視', '短時間で相談したい'] },
  { key: 'talk', label: '会話の好み', options: ['聞き上手', '明るい', '落ち着いた', '自然体'] },
  { key: 'budget', label: '予算', options: ['15,000〜25,000円', '25,000円以上', 'こだわらない'] },
  { key: 'area', label: 'エリア', options: ['新宿', '池袋', 'こだわらない'] },
  { key: 'timing', label: '利用タイミング', options: ['本日', '明日以降', '相談して決めたい'] },
] as const

export function calculateMatch(answer: MatchingAnswer, talent: Talent): MatchResult {
  let score = talent.aiScore
  const reasons: string[] = []
  const tags: string[] = []

  if (answer.area === talent.area) {
    score += 10
    reasons.push('希望エリアが一致')
    tags.push('エリア一致')
  }

  if (answer.budget === '15,000〜25,000円' && talent.price <= 25000) {
    score += 8
    reasons.push('予算に近い')
    tags.push('予算一致')
  }

  if (answer.timing === '本日' && talent.tags.includes('本日出勤')) {
    score += 10
    reasons.push('本日出勤')
    tags.push('本日対応')
  }

  const moodHit = talent.tags.some((tag) => tag.includes(answer.mood.replace('系', '')))
  if (moodHit) {
    score += 12
    reasons.push('理想の雰囲気に近い')
    tags.push('タイプ一致')
  }

  if (answer.pace.includes('安心') && talent.profile.includes('初めて')) {
    score += 6
    reasons.push('初めての方に向いている')
    tags.push('安心感')
  }

  if ((answer.pace.includes('会話') || answer.talk.includes('明るい')) && talent.tags.some((tag) => tag.includes('会話'))) {
    score += 6
    reasons.push('会話の相性が良い')
    tags.push('会話相性')
  }

  return {
    talent,
    score: Math.min(99, score),
    reasons: reasons.length ? reasons : ['総合評価が高い候補です'],
    tags,
  }
}

export function runMatching(answer: MatchingAnswer): MatchResult[] {
  return talents.map((talent) => calculateMatch(answer, talent)).sort((a, b) => b.score - a.score).slice(0, 5)
}

export function createDefaultAnswer(): MatchingAnswer {
  return {
    mood: '癒し系',
    pace: '初めてなので安心感重視',
    talk: '落ち着いた',
    budget: '15,000〜25,000円',
    area: '新宿',
    timing: '本日',
  }
}

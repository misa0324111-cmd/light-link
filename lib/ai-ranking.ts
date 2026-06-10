import { talents, type Talent } from './data'

export type RankingType = 'popular' | 'rising' | 'ai' | 'beginner'

export type RankingItem = {
  talent: Talent
  score: number
  rankReason: string
  metrics: {
    ai: number
    views: number
    favorites: number
    reservations: number
    lineClicks: number
  }
}

function seedNumber(text: string) {
  return text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

export function getTalentMetrics(talent: Talent) {
  const seed = seedNumber(talent.id)
  return {
    ai: talent.aiScore,
    views: 40 + (seed % 80),
    favorites: 5 + (seed % 30),
    reservations: 2 + (seed % 18),
    lineClicks: 3 + (seed % 25),
  }
}

export function calculateRankingScore(talent: Talent, type: RankingType): RankingItem {
  const m = getTalentMetrics(talent)

  let score = m.ai
  let rankReason = 'AI相性スコアが高い候補です'

  if (type === 'popular') {
    score = Math.round(m.views * 0.25 + m.favorites * 1.5 + m.reservations * 3 + m.lineClicks * 2 + m.ai * 0.3)
    rankReason = '閲覧・お気に入り・予約の総合評価が高いです'
  }

  if (type === 'rising') {
    score = Math.round(m.lineClicks * 3 + m.reservations * 4 + m.favorites * 1.2 + m.ai * 0.25)
    rankReason = '直近のLINE相談・予約反応が伸びています'
  }

  if (type === 'beginner') {
    score = Math.round(m.ai * 0.5 + (talent.profile.includes('初めて') ? 30 : 8) + (talent.tags.includes('本日出勤') ? 8 : 0))
    rankReason = '初めての方にも相談しやすい候補です'
  }

  return {
    talent,
    score: Math.min(100, score),
    rankReason,
    metrics: m,
  }
}

export function getAiRanking(type: RankingType = 'ai') {
  return talents
    .map((talent) => calculateRankingScore(talent, type))
    .sort((a, b) => b.score - a.score)
}

export function getAllRankingGroups() {
  return {
    popular: getAiRanking('popular').slice(0, 5),
    rising: getAiRanking('rising').slice(0, 5),
    ai: getAiRanking('ai').slice(0, 5),
    beginner: getAiRanking('beginner').slice(0, 5),
  }
}

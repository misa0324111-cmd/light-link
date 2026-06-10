import { talents, stores, type Talent } from './data'

export type RecommendInput = { mood?: string; area?: string; budget?: string; timing?: string; tags?: string[] }

function scoreTalent(t: Talent, input: RecommendInput) {
  let score = t.aiScore
  const reasons: string[] = []
  if (input.area && t.area === input.area) { score += 8; reasons.push('希望エリア一致') }
  if (input.budget?.includes('15,000') && t.price <= 25000) { score += 6; reasons.push('予算に近い') }
  if (input.timing?.includes('本日') && t.tags.includes('本日出勤')) { score += 8; reasons.push('本日出勤') }
  if (input.mood && t.tags.some(tag => input.mood?.includes(tag.replace('系','')))) { score += 5; reasons.push('好みタイプ一致') }
  return { talent: t, store: stores.find(s=>s.id===t.storeId), score: Math.min(score,99), reasons }
}

export function recommend(input: RecommendInput) {
  return talents.map(t=>scoreTalent(t,input)).sort((a,b)=>b.score-a.score).slice(0,3)
}

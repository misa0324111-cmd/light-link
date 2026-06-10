import { stores, talents } from './data'

export type FeatureSlug = 'shinjuku' | 'ikebukuro' | 'healing' | 'beginner'

export const features: Record<FeatureSlug, { title: string; description: string; matcher: (talent: any) => boolean }> = {
  shinjuku: {
    title: '新宿AIおすすめ特集',
    description: '新宿エリアでAI相性スコアが高い候補を紹介します。',
    matcher: (talent) => talent.area === '新宿',
  },
  ikebukuro: {
    title: '池袋AIおすすめ特集',
    description: '池袋エリアで相談しやすい候補を紹介します。',
    matcher: (talent) => talent.area === '池袋',
  },
  healing: {
    title: '癒し系おすすめ特集',
    description: '落ち着きたい方に向いた癒し系候補を紹介します。',
    matcher: (talent) => talent.tags.some((tag: string) => tag.includes('癒') || tag.includes('優')),
  },
  beginner: {
    title: '初めての方向け特集',
    description: '初めてでも相談しやすい候補をAIが整理します。',
    matcher: (talent) => talent.profile.includes('初めて') || talent.tags.some((tag: string) => tag.includes('安心')),
  },
}

export function getStorePublicData(storeId: string) {
  const store = stores.find((item) => item.id === storeId) ?? stores[0]
  const storeTalents = talents.filter((talent) => talent.storeId === store.id)
  return {
    store,
    talents: storeTalents,
    ranking: storeTalents.slice().sort((a, b) => b.aiScore - a.aiScore),
  }
}

export function getFeatureData(slug: string) {
  const feature = features[slug as FeatureSlug] ?? features.shinjuku
  const rows = talents.filter(feature.matcher).sort((a, b) => b.aiScore - a.aiScore)
  return { feature, rows }
}

export function getRankingData() {
  return {
    popular: talents.slice().sort((a, b) => b.aiScore - a.aiScore),
    rising: talents.slice().sort((a, b) => b.price - a.price),
    aiRecommended: talents.slice().sort((a, b) => b.tags.length - a.tags.length),
  }
}

export function createAiPromoText(input: {
  storeName?: string
  area?: string
  mood?: string
  strength?: string
}) {
  const storeName = input.storeName || 'LIGHT LINK掲載店舗'
  const area = input.area || '主要エリア'
  const mood = input.mood || 'AIマッチング'
  const strength = input.strength || '相性の良い候補提案'

  return {
    lp: `${storeName}は${area}で${mood}を重視したAIマッチングサービスを提供しています。${strength}により、初めての方でも自分に合う候補を探しやすくなっています。`,
    sns: `${area}で自分に合う候補を探すなら${storeName}。AIが希望を聞き取り、相性の良い候補を提案します。`,
    seo: `${area}のAIマッチングなら${storeName}。${mood}や予算、タイミングに合わせておすすめ候補を提案します。`,
  }
}

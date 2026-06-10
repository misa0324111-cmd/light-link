import { talents, type Talent } from './data'

export type FavoriteTalent = {
  talentId: string
  addedAt: string
}

export type ViewHistory = {
  talentId: string
  viewedAt: string
}

const FAVORITES_KEY = 'light_link_favorites'
const HISTORY_KEY = 'light_link_view_history'
const MATCHING_HISTORY_KEY = 'light_link_matching_history'

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  const raw = window.localStorage.getItem(key)
  if (!raw) return fallback
  try { return JSON.parse(raw) as T } catch { return fallback }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getFavorites(): FavoriteTalent[] {
  return readJson<FavoriteTalent[]>(FAVORITES_KEY, [])
}

export function isFavorite(talentId: string) {
  return getFavorites().some((item) => item.talentId === talentId)
}

export function toggleFavorite(talentId: string) {
  const current = getFavorites()
  const exists = current.some((item) => item.talentId === talentId)
  const next = exists
    ? current.filter((item) => item.talentId !== talentId)
    : [...current, { talentId, addedAt: new Date().toISOString() }]
  writeJson(FAVORITES_KEY, next)
  return !exists
}

export function addViewHistory(talentId: string) {
  const current = readJson<ViewHistory[]>(HISTORY_KEY, [])
  const next = [{ talentId, viewedAt: new Date().toISOString() }, ...current.filter((item) => item.talentId !== talentId)].slice(0, 20)
  writeJson(HISTORY_KEY, next)
}

export function getViewHistory(): ViewHistory[] {
  return readJson<ViewHistory[]>(HISTORY_KEY, [])
}

export function saveMatchingHistory(answer: unknown, resultTalentIds: string[]) {
  const current = readJson<any[]>(MATCHING_HISTORY_KEY, [])
  const next = [{ answer, resultTalentIds, at: new Date().toISOString() }, ...current].slice(0, 20)
  writeJson(MATCHING_HISTORY_KEY, next)
}

export function getMatchingHistory() {
  return readJson<any[]>(MATCHING_HISTORY_KEY, [])
}

export function getTalentById(id: string): Talent | undefined {
  return talents.find((talent) => talent.id === id)
}

export function getFavoriteTalents(): Talent[] {
  return getFavorites().map((item) => getTalentById(item.talentId)).filter(Boolean) as Talent[]
}

export function getRecentTalents(): Talent[] {
  return getViewHistory().map((item) => getTalentById(item.talentId)).filter(Boolean) as Talent[]
}

export function getPreferenceSummary() {
  const favorites = getFavoriteTalents()
  const recent = getRecentTalents()
  const tags = [...favorites, ...recent].flatMap((talent) => talent.tags)
  const tagCounts = tags.reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = (acc[tag] ?? 0) + 1
    return acc
  }, {})
  const topTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([tag]) => tag)
  return {
    favoritesCount: favorites.length,
    recentCount: recent.length,
    topTags,
  }
}

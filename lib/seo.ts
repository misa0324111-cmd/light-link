import { talents, stores } from './data'

export const siteName = 'LIGHT LINK'
export const siteDescription = 'AIマッチングで理想の候補を見つけるサービス'
export const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export function absoluteUrl(path: string) {
  const base = defaultSiteUrl.replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function getJsonLdOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: absoluteUrl('/'),
    description: siteDescription,
  }
}

export function getJsonLdWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: absoluteUrl('/'),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/search')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function getJsonLdTalent(talentId: string) {
  const talent = talents.find((item) => item.id === talentId)
  if (!talent) return null
  const store = stores.find((item) => item.id === talent.storeId)

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: talent.name,
    description: talent.profile,
    areaServed: talent.area,
    affiliation: store?.name,
    url: absoluteUrl(`/talents/${talent.id}`),
  }
}

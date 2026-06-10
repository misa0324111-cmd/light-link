import type { MetadataRoute } from 'next'
import { talents } from '@/lib/data'
import { absoluteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes = [
    '/',
    '/welcome',
    '/matching',
    '/chat',
    '/search',
    '/line',
    '/login',
  ]

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1 : 0.8,
    })),
    ...talents.map((talent) => ({
      url: absoluteUrl(`/talents/${talent.id}`),
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })),
  ]
}

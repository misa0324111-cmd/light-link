import type { MetadataRoute } from 'next'
import { defaultSiteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/store-admin'],
    },
    sitemap: `${defaultSiteUrl.replace(/\/$/, '')}/sitemap.xml`,
  }
}

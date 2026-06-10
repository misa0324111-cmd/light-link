import type { Metadata, Viewport } from 'next'
import './globals.css'
import { JsonLd } from '@/components/JsonLd'
import { AnalyticsScript } from '@/components/AnalyticsScript'
import { getJsonLdOrganization, getJsonLdWebSite, siteDescription, siteName } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090b',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <JsonLd data={getJsonLdOrganization()} />
        <JsonLd data={getJsonLdWebSite()} />
        <AnalyticsScript />
        {children}
      </body>
    </html>
  )
}

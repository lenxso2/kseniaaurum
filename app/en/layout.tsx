import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import '../globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

const title = 'Ksenia Aurum — body, art, sensuality and consciousness'
const description =
  'Return to yourself through body, creativity and sensuality. Art therapy, dance movement therapy, tantra, sound healing, cacao ceremonies. Bali and online.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  generator: 'v0.app',
  alternates: {
    canonical: '/en',
    languages: {
      'ru': '/',
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title,
    description,
    siteName: 'Ksenia Aurum',
    images: [{ url: '/images/hero.webp', alt: 'Ksenia Aurum' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/hero.webp'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1B1412',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} bg-ink`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

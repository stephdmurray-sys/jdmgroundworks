import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { StructuredData } from '@/components/structured-data'
import { StickyCallButton } from '@/components/sticky-call-button'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://jdmgroundworks.com'),
  title: {
    default: 'JDM Groundworks | Land Clearing, Excavation & Demolition in Kitsap County, WA',
    template: '%s | JDM Groundworks - Kitsap County Excavation & Demolition Experts'
  },
  description: 'Expert land clearing, excavation, building demolition, tree removal, and site preparation services in Kitsap County, WA. House, barn, shed & garage demolition. Licensed & insured contractors serving Bremerton, Silverdale, Poulsbo, and Port Orchard. Free estimates.',
  keywords: [
    'land clearing Kitsap County',
    'excavation contractors Kitsap County WA',
    'building demolition Kitsap County',
    'house demolition Bremerton WA',
    'barn demolition Kitsap County',
    'shed removal Silverdale',
    'garage demolition Poulsbo',
    'structure demolition Port Orchard',
    'demolition contractors Kitsap WA',
    'tree removal Bremerton',
    'driveway construction Kitsap County',
    'RV pad installation Silverdale',
    'gravel driveway Bremerton WA',
    'tree removal service Poulsbo',
    'stump grinding Kitsap County',
    'site preparation Port Orchard',
    'grading and leveling Kitsap WA',
    'parking pad construction Bremerton',
    'residential excavation Kitsap County',
    'commercial land clearing Washington',
    'bulldozer services Kitsap County',
    'lot clearing Silverdale WA',
    'drainage installation Kitsap County',
    'erosion control Poulsbo',
    'foundation excavation Bremerton',
    'utility trenching Kitsap WA',
    'driveway grading Port Orchard',
    'RV parking pad Silverdale',
    'boat parking construction',
    'equipment pad installation'
  ],
  authors: [{ name: 'JDM Groundworks', url: 'https://jdmgroundworks.com' }],
  creator: 'JDM Groundworks',
  publisher: 'JDM Groundworks',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jdmgroundworks.com',
    siteName: 'JDM Groundworks',
    title: 'JDM Groundworks | Land Clearing, Excavation & Demolition in Kitsap County, WA',
    description: 'Expert land clearing, excavation, building demolition, tree removal, and site preparation services in Kitsap County, WA. Licensed & insured contractors serving Bremerton, Silverdale, Poulsbo, and Port Orchard.',
    images: [
      {
        url: '/images/hero-excavator.jpg',
        width: 1200,
        height: 630,
        alt: 'JDM Groundworks - Professional Excavation and Land Clearing Services in Kitsap County',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JDM Groundworks | Land Clearing, Excavation & Demolition in Kitsap County, WA',
    description: 'Expert land clearing, excavation, building demolition, tree removal, and site preparation in Kitsap County, WA.',
    images: ['/images/hero-excavator.jpg'],
  },
  alternates: {
    canonical: 'https://jdmgroundworks.com',
  },
  verification: {
    google: 'your-google-verification-code',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#18181B' },
    { media: '(prefers-color-scheme: dark)', color: '#18181B' }
  ],
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCallButton />
        <Analytics />
      </body>
    </html>
  )
}

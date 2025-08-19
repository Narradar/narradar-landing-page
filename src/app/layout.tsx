import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { OrganizationStructuredData, WebSiteStructuredData } from '@/components/seo/StructuredData'
// import { ThemeProvider } from '@/components/theme/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Narradar - Control Your Narrative in the AI Multiverse',
    template: '%s | Narradar',
  },
  description: 'See how your message shifts across AI models. Detect drift. Measure meaning loss. Stay in control with Agent Perception Optimization (APO).',
  keywords: ['agent perception', 'semantic drift', 'AI brand monitoring', 'AI model interpretation', 'AI misquote', 'APO'],
  authors: [{ name: 'Narradar' }],
  creator: 'Narradar',
  publisher: 'Narradar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Narradar',
    title: 'Narradar - Control Your Narrative in the AI Multiverse',
    description: 'See how your message shifts across AI models. Detect drift. Measure meaning loss. Stay in control with Agent Perception Optimization (APO).',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Narradar - Agent Perception Optimization',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Narradar - Control Your Narrative in the AI Multiverse',
    description: 'See how your message shifts across AI models. Detect drift. Measure meaning loss. Stay in control with Agent Perception Optimization (APO).',
    images: ['/images/og-image.jpg'],
    creator: '@narradar',
  },
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.narradar.com'
  const ga4MeasurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
  
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#ffffff" />
        
        {/* Google Analytics 4 */}
        {ga4MeasurementId && (
          <>
            <script 
              async 
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${ga4MeasurementId}');
                  gtag('config', 'AW-17090066265');
                `,
              }}
            />
          </>
        )}
        
        {/* Global Structured Data */}
        <OrganizationStructuredData
          name="Narradar"
          url={baseUrl}
          logo={`${baseUrl}/images/logo.svg`}
          description="Agent Perception Optimization platform that helps brands control their narrative across AI models like GPT, Claude, and Gemini"
          sameAs={[
            'https://twitter.com/narradar',
            'https://linkedin.com/company/narradar',
            'https://github.com/narradar'
          ]}
        />
        <WebSiteStructuredData
          name="Narradar"
          url={baseUrl}
          searchUrl={`${baseUrl}/search?q={search_term_string}`}
        />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
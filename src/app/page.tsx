import { Metadata } from 'next'
import { headers } from 'next/headers'
import { isAIAgent } from '@/lib/ai-agents'
import { AIAwarePage } from '@/components/AIAwarePage'

export const metadata: Metadata = {
  title: 'Narradar - Control Your Narrative in the AI Multiverse',
  description: 'See how your message shifts across AI models. Detect drift. Measure meaning loss. Stay in control with Agent Perception Optimization (APO).',
  alternates: {
    canonical: '/',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Narradar',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/logo.svg`,
  description: 'Agent Perception Optimization platform that helps brands control their narrative across AI models',
  sameAs: [
    'https://twitter.com/narradar',
    'https://linkedin.com/company/narradar',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Narradar',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default async function HomePage() {
  // Server-side AI agent detection using Next.js headers
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  const isAI = isAIAgent(userAgent)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      
      {/* AI-aware page rendering */}
      <AIAwarePage isAIAgent={isAI} />
    </>
  )
}
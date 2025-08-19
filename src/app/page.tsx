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

// Organization and Website structured data are provided globally in RootLayout

export default async function HomePage() {
  // Server-side AI agent detection using Next.js headers
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  const isAI = isAIAgent(userAgent)

  return (
    <>
      {/* AI-aware page rendering */}
      <AIAwarePage isAIAgent={isAI} />
    </>
  )
}
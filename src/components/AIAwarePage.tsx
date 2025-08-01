'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { SmartLazyLoader, DemoSectionSkeleton, FAQSectionSkeleton, CTASectionSkeleton } from './SmartLazyLoader'

// Always server-render these critical sections for AI agents
import { HeroSection } from '@/components/sections/HeroSection'
import { AnswerBox } from '@/components/sections/AnswerBox'
import { FeatureGrid } from '@/components/sections/FeatureGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'

// Lazy load these sections with AI-aware fallbacks
const DemoSection = dynamic(() => import('@/components/sections/DemoSection').then(mod => ({ default: mod.DemoSection })), {
  loading: () => <DemoSectionSkeleton />,
  ssr: false // These will be server-rendered for AI agents via forceRender
})

const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(mod => ({ default: mod.FAQSection })), {
  loading: () => <FAQSectionSkeleton />,
  ssr: false
})

const CTASection = dynamic(() => import('@/components/sections/CTASection').then(mod => ({ default: mod.CTASection })), {
  loading: () => <CTASectionSkeleton />,
  ssr: false
})

interface AIAwarePageProps {
  isAIAgent?: boolean
}

export function AIAwarePage({ isAIAgent = false }: AIAwarePageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Track page type for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_render_strategy', {
        event_category: 'Performance',
        event_label: isAIAgent ? 'AI_Agent_Full_Render' : 'Human_Lazy_Load',
        is_ai_agent: isAIAgent
      })
    }
  }, [isAIAgent])

  // During hydration, show loading state to prevent flash
  if (!mounted) {
    return (
      <>
        {/* Critical above-the-fold content - always rendered */}
        <HeroSection />
        <AnswerBox />
        <FeatureGrid />
        <ProcessSteps />
        
        {/* Show skeletons during hydration */}
        <DemoSectionSkeleton />
        <FAQSectionSkeleton />
        <CTASectionSkeleton />
      </>
    )
  }

  return (
    <>
      {/* Critical above-the-fold content - always server-rendered */}
      <HeroSection />
      <AnswerBox />
      <FeatureGrid />
      <ProcessSteps />
      
      {/* AI-aware lazy loading for below-the-fold content */}
      <SmartLazyLoader 
        forceRender={isAIAgent} 
        threshold={300}
        fallback={<DemoSectionSkeleton />}
        className="demo-section-wrapper"
        minHeight="400px"
      >
        <DemoSection />
      </SmartLazyLoader>
      
      <SmartLazyLoader 
        forceRender={isAIAgent} 
        threshold={200}
        fallback={<FAQSectionSkeleton />}
        className="faq-section-wrapper"
        minHeight="500px"
      >
        <FAQSection />
      </SmartLazyLoader>
      
      <SmartLazyLoader 
        forceRender={isAIAgent} 
        threshold={100}
        fallback={<CTASectionSkeleton />}
        className="cta-section-wrapper"  
        minHeight="300px"
      >
        <CTASection />
      </SmartLazyLoader>
    </>
  )
}
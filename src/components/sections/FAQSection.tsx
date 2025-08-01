'use client'

import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    id: 'what-is-apo',
    question: 'What is Agent Perception Optimization (APO)?',
    answer: 'APO is the practice of optimizing how AI models interpret and represent your brand message. Unlike SEO which focuses on search visibility, APO ensures your narrative maintains fidelity across different AI systems.',
    link: '/apo/what-is-apo'
  },
  {
    id: 'how-apo-works',
    question: 'How does APO work?',
    answer: 'We analyze your content across multiple AI models, detect semantic drift through our Blip detection system, and provide actionable recommendations to improve your Beacon alignment score.',
    link: '/apo/how-apo-works'
  },
  {
    id: 'apo-vs-seo-vs-geo',
    question: 'How is APO different from SEO or GEO?',
    answer: 'SEO optimizes for search engines, GEO optimizes for AI-generated answers, but APO optimizes for how AI models understand and represent your message across all contexts and use cases.',
    link: '/apo/apo-vs-seo-vs-geo'
  }
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
}

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <section className="py-16" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Frequently asked questions</h2>
            <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
              Learn more about Agent Perception Optimization and how it can help your brand
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className="border rounded-lg"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border-primary)'
                }}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-inset transition-colors"
                  style={{
                    color: 'var(--color-text-primary)'
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                  aria-expanded={openFaq === faq.id}
                >
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      openFaq === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openFaq === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>{faq.answer}</p>
                    <Link
                      href={faq.link}
                      className="font-medium text-sm transition-colors"
                      style={{ color: 'var(--color-primary)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-primary-hover)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-primary)'
                      }}
                    >
                      Learn more →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/how-it-works"
              className="btn-secondary"
            >
              View all FAQs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
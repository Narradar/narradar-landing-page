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
      
      <section className="py-16 bg-gray-50">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-gray-900 mb-4">Frequently asked questions</h2>
            <p className="text-xl text-gray-600">
              Learn more about Agent Perception Optimization and how it can help your brand
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                  aria-expanded={openFaq === faq.id}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openFaq === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed mb-4">{faq.answer}</p>
                    <Link
                      href={faq.link}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
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
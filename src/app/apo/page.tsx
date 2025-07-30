import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Agent Perception Optimization (APO) - What It Is and Why It Matters',
  description: 'Learn about Agent Perception Optimization (APO) and how it helps control your brand narrative across AI models. Understand the difference between APO, SEO, and GEO.',
  alternates: {
    canonical: '/apo',
  },
}

const glossaryTerms = [
  {
    term: 'Beacon',
    definition: 'Your truth - the core message you want AI models to understand and preserve'
  },
  {
    term: 'Reading',
    definition: 'What a model says - how an AI interprets and represents your content'
  },
  {
    term: 'Blip',
    definition: 'A discrete variance against the Beacon at a point in time'
  },
  {
    term: 'Drift',
    definition: 'The pattern of blips over time - systematic changes in how AI models interpret your message'
  },
  {
    term: 'Alignment Score',
    definition: '0 to 100 scale measuring how closely AI interpretations match your Beacon, higher is better'
  },
]

const qTargetPages = [
  {
    title: 'What is APO?',
    description: 'Understanding Agent Perception Optimization fundamentals',
    href: '/apo/what-is-apo'
  },
  {
    title: 'How APO Works',
    description: 'The technical process behind APO analysis',
    href: '/apo/how-apo-works'
  },
  {
    title: 'APO vs SEO vs GEO',
    description: 'Comparing different optimization approaches',
    href: '/apo/apo-vs-seo-vs-geo'
  },
  {
    title: 'How to Measure Drift',
    description: 'Methods and metrics for detecting semantic drift',
    href: '/apo/how-to-measure-drift'
  },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'APO',
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/apo`
    }
  ]
}

export default function APOPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="pt-16 pb-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-narrow">
            <div className="text-center">
              <h1 className="heading-xl text-gray-900 mb-6">
                Agent Perception Optimization
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                What It Is, and Why It Matters
              </p>
            </div>
          </div>
        </section>

        {/* Answer Box */}
        <section className="py-8">
          <div className="container-narrow">
            <div className="answer-box">
              <p className="text-lg leading-relaxed text-gray-800">
                <strong>Agent Perception</strong> is how autonomous AI systems — from LLMs to action-taking agents — 
                interpret, reframe, and act on your brand's message. It's not just about showing up in AI answers (GEO). 
                It's about how you're understood, how you're presented, and eventually, how you're prioritized in decision loops.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container-narrow">
            <div className="prose prose-lg mx-auto">
              <p className="text-xl text-gray-600 mb-8">
                Where traditional optimization focuses on visibility, Agent Perception focuses on fidelity:
              </p>

              <ul className="text-lg text-gray-700 space-y-4 mb-12">
                <li>Did the AI preserve your tone and intent?</li>
                <li>Did it frame you correctly for different audiences?</li>
                <li>Does it recommend, ignore, or misrepresent you?</li>
              </ul>

              <p className="text-lg text-gray-700 mb-8">
                Narradar's approach to Agent Perception Optimization (APO) measures these distortions, 
                scoring how closely your message survives across:
              </p>

              <div className="bg-gray-50 rounded-xl p-8 mb-12">
                <ul className="text-lg text-gray-700 space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-4"></div>
                    Multiple models (GPT, Claude, Gemini, Grok)
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-4"></div>
                    Multiple prompts and use cases
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-4"></div>
                    Multiple personas (e.g. analyst, consumer, regulator)
                  </li>
                </ul>
              </div>

              <p className="text-xl text-gray-700 mb-16 font-medium">
                In a system where AI agents make decisions before humans ever read the content, 
                controlling perception becomes the new communications challenge.
              </p>
            </div>
          </div>
        </section>

        {/* Glossary Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 text-center mb-12">Glossary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {glossaryTerms.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.term}</h3>
                  <p className="text-gray-600">{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Q Target Pages */}
        <section className="py-16">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 text-center mb-12">Learn More</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {qTargetPages.map((page, index) => (
                <Link
                  key={index}
                  href={page.href}
                  className="card-hover p-6 group"
                >
                  <h3 className="heading-sm text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-gray-600">{page.description}</p>
                  <div className="mt-4 text-primary-600 font-medium">
                    Learn more →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Outputs Section */}
        <section className="py-16 bg-primary-50">
          <div className="container-narrow text-center">
            <h2 className="heading-lg text-gray-900 mb-8">What You Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="heading-sm text-gray-900 mb-4">Drift Report</h3>
                <p className="text-gray-600">One-time analysis showing how your message varies across AI models with actionable recommendations.</p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="heading-sm text-gray-900 mb-4">Beacon Monitor</h3>
                <p className="text-gray-600">Ongoing tracking to detect drift patterns and alert you to narrative changes over time.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
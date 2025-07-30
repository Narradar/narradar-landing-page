import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works - Narradar Agent Perception Optimization Platform',
  description: 'Learn how Narradar works: from Beacon submission to drift detection, alignment scoring, and optimization recommendations.',
  alternates: {
    canonical: '/how-it-works',
  },
}

const pipeline = [
  {
    step: 1,
    title: 'Submit Beacon and source content',
    description: 'Upload your core message and supporting materials'
  },
  {
    step: 2,
    title: 'Collect model readings',
    description: 'Analyze across GPT, Claude, Gemini, and Grok'
  },
  {
    step: 3,
    title: 'Detect blips and score alignment',
    description: 'Identify variances and calculate fidelity scores'
  },
  {
    step: 4,
    title: 'Aggregate drift over time',
    description: 'Track patterns and changes across sessions'
  },
  {
    step: 5,
    title: 'Report and recommend fixes',
    description: 'Provide actionable optimization guidance'
  },
  {
    step: 6,
    title: 'Optional Beacon Monitor for continuous tracking',
    description: 'Ongoing monitoring for drift detection'
  }
]

const keyFacts = [
  {
    fact: 'AI models interpret the same content differently based on training data',
    source: 'https://www.narradar.com/research/model-variance-study'
  },
  {
    fact: 'Semantic drift occurs in 67% of marketing messages across AI models',
    source: 'https://www.narradar.com/research/drift-frequency-analysis'
  },
  {
    fact: 'Brand perception shifts significantly with minor content changes',
    source: 'https://www.narradar.com/research/brand-perception-study'
  },
  {
    fact: 'Traditional SEO may increase semantic drift in AI interpretations',
    source: 'https://www.narradar.com/research/seo-drift-correlation'
  },
  {
    fact: 'Regular monitoring reduces drift by up to 78%',
    source: 'https://www.narradar.com/research/monitoring-effectiveness'
  }
]

const faqs = [
  {
    id: 'how-long-analysis',
    question: 'How long does the analysis take?',
    answer: 'Initial analysis typically completes within 5-10 minutes. Comprehensive reports are generated within 24 hours.'
  },
  {
    id: 'which-models',
    question: 'Which AI models do you analyze?',
    answer: 'We analyze GPT-4, GPT-3.5, Claude (all variants), Google Gemini, Grok, and can integrate custom models upon request.'
  },
  {
    id: 'accuracy-rate',
    question: 'How accurate is the drift detection?',
    answer: 'Our blip detection accuracy exceeds 94% with human expert validation, and alignment scores correlate strongly with brand perception studies.'
  },
  {
    id: 'content-types',
    question: 'What types of content can be analyzed?',
    answer: 'We support press releases, product descriptions, marketing copy, thought leadership content, and any text-based brand messaging.'
  },
  {
    id: 'integration-options',
    question: 'Do you offer integrations?',
    answer: 'Yes, we provide API access, webhook notifications, and integrations with popular CMS and marketing platforms.'
  },
  {
    id: 'pricing-model',
    question: 'How does pricing work?',
    answer: 'We offer per-analysis pricing for one-time reports and subscription plans for ongoing monitoring. Contact us for enterprise pricing.'
  },
  {
    id: 'data-security',
    question: 'How do you handle data security?',
    answer: 'We use enterprise-grade encryption, never store sensitive content permanently, and comply with SOC 2 and GDPR requirements.'
  },
  {
    id: 'getting-started',
    question: 'How do I get started?',
    answer: 'Simply run a Beacon Check on our homepage to receive a sample Drift Report. For ongoing monitoring, contact us about Beacon Monitor setup.'
  }
]

const faqJsonLd = {
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
      name: 'How It Works',
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/how-it-works`
    }
  ]
}

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-white">
        {/* Hero */}
        <section className="pt-16 pb-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-narrow">
            <div className="text-center">
              <h1 className="heading-xl text-gray-900 mb-6">How It Works</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive approach to Agent Perception Optimization
              </p>
            </div>
          </div>
        </section>

        {/* Pipeline */}
        <section className="py-16">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 text-center mb-12">The APO Pipeline</h2>
            
            <div className="space-y-8">
              {pipeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-sm text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Facts */}
        <section className="py-16 bg-gray-50">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 text-center mb-12">Key Facts</h2>
            
            <div className="space-y-6">
              {keyFacts.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 mb-2">{item.fact}</p>
                      <a 
                        href={item.source}
                        className="text-sm text-primary-600 hover:text-primary-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source: {item.source}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-600">
          <div className="container-narrow text-center">
            <h2 className="heading-lg text-white mb-6">Ready to get started?</h2>
            <p className="text-xl text-primary-100 mb-8">
              Run a Beacon Check to see how AI models interpret your message
            </p>
            <a
              href="/#beacon-check"
              className="btn-accent text-lg px-8 py-4 bg-white text-primary-600 hover:bg-gray-100"
            >
              Run Beacon Check
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
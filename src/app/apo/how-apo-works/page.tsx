import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How APO Works - The Technical Process Behind Agent Perception Optimization',
  description: 'Learn the technical process behind APO: from Beacon definition to drift detection, alignment scoring, and optimization recommendations.',
  alternates: {
    canonical: '/apo/how-apo-works',
  },
}

const processSteps = [
  {
    number: '01',
    title: 'Beacon Definition',
    description: 'Establish your core message and truth as the reference point for all measurements',
    details: 'Your Beacon serves as the authoritative version of your message, including key claims, tone, and intended positioning.'
  },
  {
    number: '02', 
    title: 'Multi-Model Analysis',
    description: 'Submit your content to GPT, Claude, Gemini, and Grok for interpretation',
    details: 'We use standardized prompts across different personas and use cases to capture how each model interprets your message.'
  },
  {
    number: '03',
    title: 'Blip Detection',
    description: 'Identify discrete variances between your Beacon and model interpretations',
    details: 'Our analysis engine categorizes differences into omissions, substitutions, hedging, attribution changes, and sentiment shifts.'
  },
  {
    number: '04',
    title: 'Alignment Scoring',
    description: 'Calculate a 0-100 score measuring fidelity to your original message',
    details: 'Scores consider severity, frequency, and impact of detected blips to provide an overall alignment metric.'
  },
  {
    number: '05',
    title: 'Drift Pattern Analysis',
    description: 'Analyze patterns across models and time to identify systematic issues',
    details: 'We look for consistent drift patterns that indicate structural content optimization opportunities.'
  },
  {
    number: '06',
    title: 'Optimization Recommendations',
    description: 'Provide specific, actionable recommendations to improve alignment',
    details: 'Recommendations include content adjustments, structural changes, and ongoing monitoring strategies.'
  }
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
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'How APO Works',
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/apo/how-apo-works`
    }
  ]
}

export default function HowAPOWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-white">
        {/* Breadcrumb */}
        <nav className="pt-8 pb-4" aria-label="Breadcrumb">
          <div className="container-narrow">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><a href="/" className="hover:text-gray-700">Home</a></li>
              <li>/</li>
              <li><a href="/apo" className="hover:text-gray-700">APO</a></li>
              <li>/</li>
              <li className="text-gray-900">How APO Works</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="pb-8">
          <div className="container-narrow">
            <h1 className="heading-xl text-gray-900 mb-6">How APO Works</h1>
            <p className="text-xl text-gray-600">
              The technical process behind Agent Perception Optimization
            </p>
          </div>
        </section>

        {/* Answer Box */}
        <section className="py-8">
          <div className="container-narrow">
            <div className="answer-box">
              <p className="text-lg leading-relaxed text-gray-800">
                APO works by establishing your <strong>Beacon</strong> (core message), analyzing how multiple AI models 
                interpret it, detecting <strong>blips</strong> (variances), calculating alignment scores, and providing 
                optimization recommendations. The process combines automated analysis with expert review to ensure 
                your message maintains fidelity across AI systems.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16">
          <div className="container-narrow">
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-600">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-sm text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-lg text-gray-700 mb-4">{step.description}</p>
                    <p className="text-gray-600">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-16 bg-gray-50">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 text-center mb-12">Technical Approach</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="heading-sm text-gray-900 mb-4">Model Coverage</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• GPT-4 and GPT-3.5</li>
                  <li>• Claude 3 (Opus, Sonnet, Haiku)</li>
                  <li>• Google Gemini Pro/Ultra</li>
                  <li>• Grok (when available)</li>
                  <li>• Custom model integrations</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="heading-sm text-gray-900 mb-4">Analysis Dimensions</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Multiple user personas</li>
                  <li>• Different prompt contexts</li>
                  <li>• Varying detail levels</li>
                  <li>• Industry-specific framings</li>
                  <li>• Competitive comparisons</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="heading-sm text-gray-900 mb-4">Blip Categories</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Omissions:</strong> Missing key information</li>
                  <li>• <strong>Substitutions:</strong> Word/phrase changes</li>
                  <li>• <strong>Hedging:</strong> Added uncertainty language</li>
                  <li>• <strong>Attribution:</strong> Claims vs. sources</li>
                  <li>• <strong>Sentiment:</strong> Tone shifts</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="heading-sm text-gray-900 mb-4">Scoring Methodology</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Weighted severity scoring</li>
                  <li>• Frequency impact analysis</li>
                  <li>• Context-aware adjustments</li>
                  <li>• Industry benchmark comparison</li>
                  <li>• Temporal drift tracking</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="heading-sm text-gray-900 mb-6">Sample Analysis Output</h3>
              <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm">
                <div className="text-gray-600 mb-4">// Example Blip Detection</div>
                <div className="space-y-2">
                  <div><span className="text-red-600">- OMISSION:</span> "revolutionary" (severity: medium, confidence: 0.89)</div>
                  <div><span className="text-orange-600">- HEDGING:</span> "increases by 40%" → "may increase up to 40%" (severity: high, confidence: 0.92)</div>
                  <div><span className="text-purple-600">- ATTRIBUTION:</span> Direct claim → "Company claims" (severity: high, confidence: 0.85)</div>
                </div>
                <div className="mt-4 text-gray-600">
                  Overall Alignment Score: <span className="text-primary-600 font-bold">73/100</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="py-16">
          <div className="container-narrow">
            <div className="bg-primary-50 rounded-xl p-8">
              <h2 className="heading-sm text-gray-900 mb-4">Key Facts</h2>
              <ol className="text-gray-700 space-y-3">
                <li><strong>1.</strong> Analysis typically completes within 5-10 minutes for standard content</li>
                <li><strong>2.</strong> Each model is tested with 15-20 different prompt variations</li>
                <li><strong>3.</strong> Blip detection accuracy exceeds 94% with human expert validation</li>
                <li><strong>4.</strong> Alignment scores correlate strongly with brand perception studies</li>
                <li><strong>5.</strong> Optimization recommendations typically improve scores by 15-30 points</li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'APO vs SEO vs GEO - Understanding Different Optimization Approaches',
  description: 'Compare Agent Perception Optimization (APO) with traditional SEO and Generative Engine Optimization (GEO). Learn which approach fits your needs.',
  alternates: {
    canonical: '/apo/apo-vs-seo-vs-geo',
  },
}

const comparisonData = [
  {
    aspect: 'Primary Focus',
    seo: 'Search engine rankings and visibility',
    geo: 'AI-generated answer inclusion',
    apo: 'Message fidelity across AI interpretations'
  },
  {
    aspect: 'Target System',
    seo: 'Google, Bing search algorithms',
    geo: 'ChatGPT, Perplexity, search AI',
    apo: 'All AI models and agents'
  },
  {
    aspect: 'Success Metric',
    seo: 'Rankings, traffic, click-through rates',
    geo: 'Answer visibility, citation frequency',
    apo: 'Alignment scores, narrative accuracy'
  },
  {
    aspect: 'Time Horizon',
    seo: 'Months to see ranking improvements',
    geo: 'Weeks to months for inclusion',
    apo: 'Immediate feedback, ongoing monitoring'
  },
  {
    aspect: 'Content Approach',
    seo: 'Keyword optimization, link building',
    geo: 'Authoritative, citable content',
    apo: 'Precise, unambiguous messaging'
  },
  {
    aspect: 'Measurement',
    seo: 'Search Console, ranking tools',
    geo: 'AI answer monitoring tools',
    apo: 'Semantic drift analysis, blip detection'
  }
]

const useCase = [
  {
    scenario: 'New Product Launch',
    seo: 'Build awareness through search visibility',
    geo: 'Ensure accurate AI answers about product',
    apo: 'Control how AI describes your innovation',
    recommendation: 'Use all three - APO ensures accurate representation while SEO/GEO drive discovery'
  },
  {
    scenario: 'Crisis Management',
    seo: 'Push down negative search results',
    geo: 'Provide authoritative counter-narrative',
    apo: 'Prevent AI amplification of misinformation',
    recommendation: 'APO is critical - AI models can perpetuate and amplify crisis narratives'
  },
  {
    scenario: 'Thought Leadership',
    seo: 'Rank for industry keywords',
    geo: 'Be cited in AI-generated insights',
    apo: 'Maintain expertise positioning across contexts',
    recommendation: 'GEO + APO combination - ensure you\'re cited AND accurately represented'
  },
  {
    scenario: 'B2B Sales Support',
    seo: 'Capture bottom-funnel searches',
    geo: 'Appear in competitive comparisons',
    apo: 'Control how AI presents your solution',
    recommendation: 'APO focus - B2B buyers increasingly use AI for vendor research'
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
      name: 'APO vs SEO vs GEO',
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/apo/apo-vs-seo-vs-geo`
    }
  ]
}

export default function APOvsSEOvsGEOPage() {
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
              <li className="text-gray-900">APO vs SEO vs GEO</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="pb-8">
          <div className="container-narrow">
            <h1 className="heading-xl text-gray-900 mb-6">APO vs SEO vs GEO</h1>
            <p className="text-xl text-gray-600">
              Understanding the three pillars of modern digital optimization
            </p>
          </div>
        </section>

        {/* Answer Box */}
        <section className="py-8">
          <div className="container-narrow">
            <div className="answer-box">
              <p className="text-lg leading-relaxed text-gray-800">
                <strong>SEO</strong> optimizes for search engine rankings, <strong>GEO</strong> optimizes for AI-generated 
                answer inclusion, and <strong>APO</strong> optimizes for message fidelity across AI interpretations. 
                While SEO focuses on visibility and GEO on citation, APO ensures your narrative remains accurate 
                and aligned with your intent when processed by any AI system.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16">
          <div className="container-wide">
            <h2 className="heading-lg text-gray-900 text-center mb-12">Side-by-Side Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Aspect</th>
                    <th className="px-6 py-4 text-center font-semibold text-blue-600">SEO</th>
                    <th className="px-6 py-4 text-center font-semibold text-green-600">GEO</th>
                    <th className="px-6 py-4 text-center font-semibold text-primary-600">APO</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{row.aspect}</td>
                      <td className="px-6 py-4 text-gray-700 text-center">{row.seo}</td>
                      <td className="px-6 py-4 text-gray-700 text-center">{row.geo}</td>
                      <td className="px-6 py-4 text-gray-700 text-center">{row.apo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Evolution Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 text-center mb-12">The Evolution of Digital Optimization</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="heading-sm text-gray-900 mb-2">SEO Era (1990s-2010s)</h3>
                  <p className="text-gray-700">
                    Focus on search engine rankings through keyword optimization, backlinks, and technical SEO. 
                    Success measured by organic traffic and search visibility.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="heading-sm text-gray-900 mb-2">GEO Emergence (2020s)</h3>
                  <p className="text-gray-700">
                    Optimization for AI-generated answers in ChatGPT, Perplexity, and search AI features. 
                    Emphasis on authoritative, citable content that AI systems reference.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="heading-sm text-gray-900 mb-2">APO Necessity (2024+)</h3>
                  <p className="text-gray-700">
                    Focus shifts to message fidelity as AI becomes the primary interface. 
                    Brands must ensure accurate representation across all AI interpretations and contexts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Case Analysis */}
        <section className="py-16">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 text-center mb-12">When to Use Each Approach</h2>
            
            <div className="space-y-8">
              {useCase.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h3 className="heading-sm text-gray-900 mb-6">{item.scenario}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">SEO Approach</h4>
                      <p className="text-blue-800 text-sm">{item.seo}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">GEO Approach</h4>
                      <p className="text-green-800 text-sm">{item.geo}</p>
                    </div>
                    <div className="bg-primary-50 rounded-lg p-4">
                      <h4 className="font-semibold text-primary-900 mb-2">APO Approach</h4>
                      <p className="text-primary-800 text-sm">{item.apo}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Recommendation</h4>
                    <p className="text-gray-700 text-sm">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Insights */}
        <section className="py-16 bg-primary-50">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 text-center mb-8">Key Insights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="heading-sm text-gray-900 mb-4">Complementary Strategies</h3>
                <p className="text-gray-700">
                  SEO, GEO, and APO work best together. SEO drives discovery, GEO ensures inclusion, 
                  and APO maintains accuracy. A comprehensive approach uses all three strategically.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="heading-sm text-gray-900 mb-4">Priority Shift</h3>
                <p className="text-gray-700">
                  As AI adoption accelerates, APO becomes increasingly critical. Brands that optimize 
                  only for visibility risk losing control of their narrative in AI-mediated interactions.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="heading-sm text-gray-900 mb-4">Investment Allocation</h3>
                <p className="text-gray-700">
                  Forward-thinking brands are shifting budget from pure SEO tactics to APO and GEO, 
                  recognizing that message control is more valuable than just visibility.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="heading-sm text-gray-900 mb-4">Measurement Evolution</h3>
                <p className="text-gray-700">
                  Success metrics are evolving from traffic and rankings to narrative accuracy and 
                  AI alignment scores. Quality of representation matters more than quantity of mentions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="py-16">
          <div className="container-narrow">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="heading-sm text-gray-900 mb-4">Summary</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                The digital optimization landscape is expanding beyond traditional SEO. While SEO remains important 
                for discoverability and GEO ensures AI inclusion, APO addresses the critical need for message 
                fidelity in an AI-driven world. Smart brands adopt an integrated approach, but prioritize APO 
                as AI becomes the dominant interface between brands and audiences.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
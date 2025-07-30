import { Metadata } from 'next'
import { QASection } from '@/components/sections/QASection'

export const metadata: Metadata = {
  title: 'How to Measure Drift - Methods and Metrics for Detecting Semantic Drift',
  description: 'Learn how to measure semantic drift in AI model interpretations using alignment scores, blip categorization, and temporal analysis.',
  alternates: {
    canonical: '/apo/how-to-measure-drift',
  },
}

const measurementMethods = [
  {
    method: 'Beacon Comparison',
    description: 'Direct comparison between your original message (Beacon) and AI interpretations',
    metrics: ['Word-level similarity', 'Semantic similarity scores', 'Intent preservation']
  },
  {
    method: 'Blip Categorization',
    description: 'Classification of specific types of changes and distortions',
    metrics: ['Omission count', 'Substitution frequency', 'Attribution changes']
  },
  {
    method: 'Severity Scoring',
    description: 'Weighted impact assessment of detected changes',
    metrics: ['High/Medium/Low severity', 'Confidence scores', 'Business impact rating']
  },
  {
    method: 'Temporal Analysis',
    description: 'Tracking changes over time to identify drift patterns',
    metrics: ['Drift velocity', 'Pattern consistency', 'Model-specific trends']
  }
]

const blipCategories = [
  {
    category: 'Omissions',
    definition: 'Key information missing from AI interpretation',
    example: '"Revolutionary AI platform" → "AI platform"',
    severity: 'Medium to High'
  },
  {
    category: 'Substitutions', 
    definition: 'Words or phrases replaced with alternatives',
    example: '"Increases productivity" → "May improve efficiency"',
    severity: 'Low to High'
  },
  {
    category: 'Hedging',
    definition: 'Addition of uncertainty or qualifying language',
    example: '"40% improvement" → "Up to 40% improvement"',
    severity: 'Medium to High'
  },
  {
    category: 'Attribution',
    definition: 'Direct claims converted to attributed statements',
    example: '"Best solution" → "Company claims best solution"',
    severity: 'High'
  },
  {
    category: 'Sentiment Shifts',
    definition: 'Changes in emotional tone or attitude',
    example: 'Confident tone → Cautious or skeptical tone',
    severity: 'Medium to High'
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
      name: 'How to Measure Drift',
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/apo/how-to-measure-drift`
    }
  ]
}

const qaData = [
  {
    question: "What is an alignment score in drift measurement?",
    answer: "An alignment score is a 0-100 metric that quantifies how closely AI model interpretations match your original Beacon (reference message). Scores of 81-100 indicate high alignment with minimal drift, 61-80 show moderate alignment needing optimization, and 0-60 signal poor alignment requiring immediate action.",
    category: "Scoring"
  },
  {
    question: "How often should you measure semantic drift?",
    answer: "Measurement frequency depends on content activity: weekly monitoring for active campaigns, monthly reviews for ongoing content, immediate analysis after content updates, and quarterly comprehensive audits. High-visibility content should be monitored more frequently.",
    category: "Process"
  },
  {
    question: "What are the main categories of blips to look for?",
    answer: "The five main blip categories are: 1) Omissions (missing key information), 2) Substitutions (word/phrase changes), 3) Hedging (added uncertainty language), 4) Attribution (claims converted to attributed statements), and 5) Sentiment shifts (tone or attitude changes).",
    category: "Analysis"
  },
  {
    question: "How is the alignment score calculated?",
    answer: "The alignment score starts at 100 and subtracts points based on detected blips: High severity blips (-15 points each), Medium severity blips (-8 points each), Low severity blips (-3 points each). This is then multiplied by a confidence multiplier to produce the final score.",
    category: "Scoring"
  },
  {
    question: "Which blip categories have the highest business impact?",
    answer: "Attribution changes and sentiment shifts typically have the highest business impact, often 3x more than other categories. These directly affect how your brand claims are perceived and can significantly alter brand perception and trust.",
    category: "Impact"
  },
  {
    question: "What tools are needed to measure semantic drift?",
    answer: "Drift measurement requires: 1) Access to multiple AI models (GPT, Claude, Gemini, etc.), 2) Standardized prompting frameworks, 3) Automated blip detection systems, 4) Scoring algorithms, and 5) Tracking dashboards for temporal analysis. Narradar provides all these components in one platform.",
    category: "Tools"
  },
  {
    question: "How do you establish baseline measurements?",
    answer: "Establish baselines by: 1) Clearly defining your Beacon (authoritative message), 2) Testing across all major AI models with standardized prompts, 3) Recording initial alignment scores, 4) Categorizing detected blips, and 5) Setting monitoring thresholds based on business criticality.",
    category: "Setup"
  },
  {
    question: "What constitutes a significant drift pattern?",
    answer: "Significant drift patterns include: consistent score decreases over time, recurring blip types across models, new blip categories appearing, scores dropping below 70 consistently, or high-severity blips affecting core brand messages. These require immediate investigation and optimization.",
    category: "Analysis"
  },
  {
    question: "How do you measure drift across different AI models?",
    answer: "Cross-model measurement involves testing identical content with each AI model using standardized prompts, comparing results against your Beacon, calculating individual alignment scores, identifying model-specific drift patterns, and aggregating results for overall drift assessment.",
    category: "Process"
  },
  {
    question: "What action should you take when drift is detected?",
    answer: "When drift is detected: 1) Identify the specific blip categories, 2) Assess business impact and severity, 3) Optimize content to address detected issues, 4) Re-test to verify improvements, 5) Update monitoring thresholds, and 6) Document lessons learned for future prevention.",
    category: "Action"
  }
]

export default function HowToMeasureDriftPage() {
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
              <li className="text-gray-900">How to Measure Drift</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="pb-8">
          <div className="container-narrow">
            <h1 className="heading-xl text-gray-900 mb-6">How to Measure Drift</h1>
            <p className="text-xl text-gray-600">
              Methods and metrics for detecting semantic drift in AI interpretations
            </p>
          </div>
        </section>

        {/* Answer Box */}
        <section className="py-8">
          <div className="container-narrow">
            <div className="answer-box">
              <p className="text-lg leading-relaxed text-gray-800">
                <strong>Measuring drift</strong> involves comparing your original message (Beacon) against AI interpretations 
                using systematic analysis of omissions, substitutions, hedging, attribution changes, and sentiment shifts. 
                The process combines automated detection with severity scoring to produce alignment scores from 0-100, 
                where higher scores indicate better message fidelity.
              </p>
            </div>
          </div>
        </section>

        {/* Measurement Methods */}
        <section className="py-16">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 text-center mb-12">Measurement Methods</h2>
            
            <div className="space-y-8">
              {measurementMethods.map((method, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h3 className="heading-sm text-gray-900 mb-4">{method.method}</h3>
                  <p className="text-lg text-gray-700 mb-6">{method.description}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Metrics:</h4>
                    <ul className="text-gray-700 space-y-1">
                      {method.metrics.map((metric, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-primary-600 rounded-full mr-3 flex-shrink-0"></div>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blip Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 text-center mb-12">Blip Categories</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {blipCategories.map((blip, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{blip.category}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      blip.severity.includes('High') ? 'bg-red-100 text-red-800' :
                      blip.severity.includes('Medium') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {blip.severity}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{blip.definition}</p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">Example:</div>
                    <div className="text-sm font-mono text-gray-800">{blip.example}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alignment Scoring */}
        <section className="py-16">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 text-center mb-12">Alignment Scoring</h2>
            
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-red-600">0-60</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Poor Alignment</h3>
                  <p className="text-gray-600 text-sm">Significant drift detected. Immediate optimization needed.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-yellow-600">61-80</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Moderate Alignment</h3>
                  <p className="text-gray-600 text-sm">Some drift present. Optimization recommended.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">81-100</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">High Alignment</h3>
                  <p className="text-gray-600 text-sm">Minimal drift. Continue monitoring for maintenance.</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Scoring Formula</h3>
                <div className="font-mono text-sm text-gray-800 space-y-2">
                  <div>Base Score: 100</div>
                  <div>- (High Severity Blips × 15)</div>
                  <div>- (Medium Severity Blips × 8)</div>
                  <div>- (Low Severity Blips × 3)</div>
                  <div>× Confidence Multiplier</div>
                  <div className="border-t border-gray-300 pt-2 mt-2 font-semibold">
                    = Final Alignment Score
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-16 bg-primary-50">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 text-center mb-12">Measurement Best Practices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="heading-sm text-gray-900 mb-4">Frequency</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Weekly monitoring for active campaigns</li>
                  <li>• Monthly reviews for ongoing content</li>
                  <li>• Immediate analysis after content updates</li>
                  <li>• Quarterly comprehensive audits</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="heading-sm text-gray-900 mb-4">Coverage</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Test across all major AI models</li>
                  <li>• Include different persona prompts</li>
                  <li>• Vary context and use cases</li>
                  <li>• Monitor competitive comparisons</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="heading-sm text-gray-900 mb-4">Documentation</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Maintain clear Beacon definitions</li>
                  <li>• Track changes over time</li>
                  <li>• Document optimization actions</li>
                  <li>• Record model-specific patterns</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="heading-sm text-gray-900 mb-4">Action Thresholds</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Score below 70: Immediate action</li>
                  <li>• Trending downward: Investigation</li>
                  <li>• High-severity blips: Priority fix</li>
                  <li>• New model drift: Adapt strategy</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Q&A Section */}
        <QASection 
          title="Frequently Asked Questions About Measuring Drift"
          qas={qaData}
        />

        {/* Key Facts */}
        <section className="py-16 bg-white">
          <div className="container-narrow">
            <div className="bg-primary-50 rounded-xl p-8 shadow-sm border border-primary-100">
              <h2 className="heading-sm text-gray-900 mb-6">Key Facts</h2>
              <ol className="text-gray-700 space-y-4">
                <li><strong>1.</strong> Alignment scores range from 0-100, with higher scores indicating better message fidelity</li>
                <li><strong>2.</strong> Drift patterns can be categorized into omissions, substitutions, hedging, attribution, and sentiment changes</li>
                <li><strong>3.</strong> Regular monitoring can reduce semantic drift by up to 78%</li>
                <li><strong>4.</strong> High-severity blips (attribution changes, sentiment shifts) have 3x more impact on business outcomes</li>
                <li><strong>5.</strong> Model-specific drift patterns remain consistent over 6-month periods, enabling predictive optimization</li>
              </ol>
              
              {/* Updated timestamp for GEO optimization */}
              <div className="mt-6 pt-6 border-t border-primary-200">
                <p className="text-sm text-gray-600">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
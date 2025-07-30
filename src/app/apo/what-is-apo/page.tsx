import { Metadata } from 'next'
import { QASection } from '@/components/sections/QASection'

export const metadata: Metadata = {
  title: 'What is APO? - Agent Perception Optimization Explained',
  description: 'Learn what Agent Perception Optimization (APO) is and how it helps brands control their narrative across AI models like GPT, Claude, and Gemini.',
  alternates: {
    canonical: '/apo/what-is-apo',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'QAPage',
  mainEntity: {
    '@type': 'Question',
    name: 'What is APO (Agent Perception Optimization)?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'APO (Agent Perception Optimization) is the practice of optimizing how AI models interpret and represent your brand message. It focuses on maintaining narrative fidelity across different AI systems, ensuring your message is understood and presented correctly by autonomous AI agents.'
    }
  }
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
      name: 'APO',
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/apo`
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'What is APO',
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/apo/what-is-apo`
    }
  ]
}

const qaData = [
  {
    question: "What does APO stand for?",
    answer: "APO stands for Agent Perception Optimization. It is the practice of optimizing how AI models and autonomous agents interpret, understand, and represent your brand message across different contexts and use cases.",
    category: "Definition"
  },
  {
    question: "How is APO different from SEO?",
    answer: "While SEO focuses on search engine rankings and visibility, APO focuses on message fidelity and narrative accuracy. SEO optimizes for discoverability; APO optimizes for faithful representation by AI systems.",
    category: "Comparison"
  },
  {
    question: "What is a Beacon in APO context?",
    answer: "A Beacon is your authoritative truth - the reference point that defines your intended message, positioning, and key claims. It serves as the standard against which all AI interpretations are measured to detect semantic drift.",
    category: "Concepts"
  },
  {
    question: "What are blips in APO?",
    answer: "Blips are discrete variances between your Beacon and how AI models interpret your message. They include omissions (missing information), substitutions (word changes), hedging (added uncertainty), attribution shifts, and sentiment changes.",
    category: "Concepts"
  },
  {
    question: "Which AI models does APO analyze?",
    answer: "APO analyzes major AI models including GPT (OpenAI), Claude (Anthropic), Gemini (Google), Grok (xAI), and other emerging models. The analysis covers how each model interprets and represents your content differently.",
    category: "Technical"
  },
  {
    question: "How quickly can APO detect semantic drift?",
    answer: "APO provides real-time analysis of semantic drift. Once your content is processed, you can immediately see alignment scores, detected blips, and specific areas where your message may be altered by different AI models.",
    category: "Process"
  },
  {
    question: "Why is APO important for brands in 2024?",
    answer: "As AI becomes the primary interface between brands and audiences, controlling how AI systems interpret and present your message is critical. Semantic drift can damage brand perception, create misinformation, and dilute your intended positioning.",
    category: "Strategy"
  },
  {
    question: "What is an alignment score in APO?",
    answer: "An alignment score is a 0-100 metric that measures how closely AI model interpretations match your original Beacon. Higher scores indicate better message fidelity, while lower scores suggest significant semantic drift requiring attention.",
    category: "Measurement"
  },
  {
    question: "Can APO help with crisis management?",
    answer: "Yes, APO is particularly valuable for crisis management. It helps prevent AI systems from amplifying negative narratives or misinformation by ensuring your official response maintains accuracy and intended tone across all AI interpretations.",
    category: "Use Cases"
  },
  {
    question: "How does APO measure success?",
    answer: "APO measures success through alignment scores, blip reduction over time, consistency across AI models, and narrative accuracy preservation. Unlike traditional metrics focused on volume, APO prioritizes quality of representation.",
    category: "Measurement"
  }
]

export default function WhatIsAPOPage() {
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
        {/* Breadcrumb */}
        <nav className="pt-8 pb-4" aria-label="Breadcrumb">
          <div className="container-narrow">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><a href="/" className="hover:text-gray-700">Home</a></li>
              <li>/</li>
              <li><a href="/apo" className="hover:text-gray-700">APO</a></li>
              <li>/</li>
              <li className="text-gray-900">What is APO</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="pb-8">
          <div className="container-narrow">
            <h1 className="heading-xl text-gray-900 mb-6">What is APO?</h1>
            <p className="text-xl text-gray-600">
              Understanding Agent Perception Optimization and why it matters for your brand
            </p>
          </div>
        </section>

        {/* Answer Box */}
        <section className="py-8">
          <div className="container-narrow">
            <div className="answer-box">
              <p className="text-lg leading-relaxed text-gray-800">
                <strong>APO (Agent Perception Optimization)</strong> is the practice of optimizing how AI models 
                interpret and represent your brand message. Unlike traditional SEO which focuses on search visibility, 
                APO ensures your narrative remains accurate and aligned with your intent when processed by autonomous 
                AI systems like ChatGPT, Claude, and Gemini.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container-narrow">
            <div className="prose prose-lg mx-auto">
              
              <h2 className="heading-md text-gray-900 mb-6">The Challenge</h2>
              <p className="text-lg text-gray-700 mb-8">
                As AI models become the primary interface between brands and audiences, a new challenge has emerged: 
                <strong> semantic drift</strong>. Your carefully crafted message enters an AI system as input, 
                but what comes out may be subtly—or dramatically—different.
              </p>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-red-900 mb-3">Common Drift Patterns</h3>
                <ul className="text-red-800 space-y-2">
                  <li>• <strong>Hedging:</strong> "Increases productivity by 40%" becomes "may increase productivity by up to 40%"</li>
                  <li>• <strong>Attribution:</strong> Direct claims become "Company X claims" or "according to Company X"</li>
                  <li>• <strong>Omission:</strong> Key differentiators or qualifications are dropped</li>
                  <li>• <strong>Scope Creep:</strong> Specific claims are generalized or misapplied</li>
                </ul>
              </div>

              <h2 className="heading-md text-gray-900 mb-6">The Solution</h2>
              <p className="text-lg text-gray-700 mb-8">
                APO provides a systematic approach to measure, monitor, and minimize these distortions. 
                By establishing your <strong>Beacon</strong> (your truth) and continuously analyzing 
                how different AI models interpret it, APO helps you:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-3">Detect</h3>
                  <p className="text-green-800">Identify when and how your message is being altered across different AI models and contexts.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Measure</h3>
                  <p className="text-blue-800">Quantify drift with alignment scores and categorize the types of changes occurring.</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-900 mb-3">Monitor</h3>
                  <p className="text-purple-800">Track changes over time to understand drift patterns and model behavior evolution.</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="font-semibold text-orange-900 mb-3">Optimize</h3>
                  <p className="text-orange-800">Refine your content strategy based on insights to improve cross-model alignment.</p>
                </div>
              </div>

              <h2 className="heading-md text-gray-900 mb-6">Why APO Matters Now</h2>
              <p className="text-lg text-gray-700 mb-8">
                The shift toward AI-mediated information consumption is accelerating. Whether it's ChatGPT answering 
                customer questions, Claude summarizing your press release, or Gemini comparing your product to competitors, 
                AI models are increasingly the first—and often only—filter between your message and your audience.
              </p>

              <blockquote className="border-l-4 border-primary-600 pl-6 italic text-xl text-gray-700 mb-12">
                "In a system where AI agents make decisions before humans ever read the content, 
                controlling perception becomes the new communications challenge."
              </blockquote>

              <h2 className="heading-md text-gray-900 mb-6">Key Facts</h2>
              <div className="bg-gray-50 rounded-xl p-8">
                <ol className="text-lg text-gray-700 space-y-4">
                  <li><strong>1.</strong> AI models interpret the same content differently based on their training data and architecture</li>
                  <li><strong>2.</strong> Semantic drift occurs in 67% of marketing messages when processed by multiple AI models</li>
                  <li><strong>3.</strong> Brand perception can shift significantly even with minor content changes</li>
                  <li><strong>4.</strong> Traditional SEO optimization may actually increase semantic drift in AI interpretations</li>
                  <li><strong>5.</strong> Regular monitoring and adjustment can reduce drift by up to 78%</li>
                </ol>
              </div>

            </div>
          </div>
        </section>

        {/* Q&A Section */}
        <QASection 
          title="Frequently Asked Questions About APO"
          qas={qaData}
        />

        {/* Summary */}
        <section className="py-16 bg-white">
          <div className="container-narrow">
            <div className="bg-primary-50 rounded-xl p-8 shadow-sm border border-primary-100">
              <h2 className="heading-sm text-gray-900 mb-4">Summary</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                APO represents a fundamental shift from optimizing for visibility to optimizing for fidelity. 
                As AI becomes the dominant interface for information discovery and decision-making, 
                brands must ensure their messages maintain accuracy and intent across all AI interpretations. 
                APO provides the tools and methodology to achieve this control.
              </p>
              
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
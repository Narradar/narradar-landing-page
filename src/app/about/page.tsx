import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Narradar - Leading Agent Perception Optimization Platform',
  description: 'Learn about Narradar\'s mission to help brands control their narrative in the AI multiverse through Agent Perception Optimization.',
  alternates: {
    canonical: '/about',
  },
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
      name: 'About',
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`
    }
  ]
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-white">
        {/* Hero */}
        <section className="pt-16 pb-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-narrow">
            <div className="text-center">
              <h1 className="heading-xl text-gray-900 mb-6">About Narradar</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We help brands control their narrative in the AI multiverse
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="container-narrow">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-gray-900 mb-8">Our Mission</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  As AI becomes the dominant interface between brands and audiences, maintaining control over 
                  your narrative has never been more critical. We built Narradar because we believe every 
                  brand deserves to be represented accurately across all AI systems.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our Agent Perception Optimization (APO) platform ensures your message maintains fidelity 
                  as it travels through the AI multiverse, from ChatGPT to Claude to the next generation 
                  of autonomous agents.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="heading-sm text-gray-900 mb-4">Precision</h3>
                <p className="text-gray-600">
                  We detect subtle changes in how AI models interpret your message, 
                  from word-level substitutions to sentiment shifts.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="heading-sm text-gray-900 mb-4">Speed</h3>
                <p className="text-gray-600">
                  Get immediate feedback on how your message performs across 
                  multiple AI models and contexts.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="heading-sm text-gray-900 mb-4">Actionability</h3>
                <p className="text-gray-600">
                  Every analysis comes with specific recommendations to improve 
                  your message alignment across AI systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Note */}
        <section className="py-16 bg-gray-50">
          <div className="container-narrow">
            <div className="text-center">
              <h2 className="heading-lg text-gray-900 mb-8">Built by Communications Experts</h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Our team combines deep expertise in brand communications, natural language processing, 
                  and AI systems. We've worked with Fortune 500 companies, startups, and agencies to 
                  understand the challenges of maintaining brand narrative integrity.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We're not just technologists—we're communications professionals who understand 
                  that every word matters when it comes to your brand's reputation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Now */}
        <section className="py-16">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <h2 className="heading-lg text-gray-900 mb-8">Why This Matters Now</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="heading-sm text-gray-900 mb-4">The AI Revolution is Here</h3>
                <p className="text-gray-700 mb-6">
                  By 2025, the majority of information consumption will be AI-mediated. Your customers 
                  aren't just googling your company—they're asking ChatGPT, Claude, and other AI systems 
                  about your products, services, and brand positioning.
                </p>
                <p className="text-gray-700">
                  In this new landscape, controlling your narrative isn't just about marketing—it's about 
                  business survival. One misinterpreted press release or product description can ripple 
                  across thousands of AI-generated responses.
                </p>
              </div>

              <div className="bg-primary-50 rounded-2xl p-8">
                <h4 className="font-semibold text-gray-900 mb-4">The Stats</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    67% of marketing messages experience semantic drift across AI models
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    AI-generated content influences 84% of B2B purchase decisions
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    Brand perception can shift 40% based on AI interpretation alone
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    Only 23% of companies actively monitor their AI representation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-gray-50">
          <div className="container-narrow text-center">
            <h2 className="heading-lg text-gray-900 mb-8">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Have questions about APO or want to discuss your specific use case? 
              We'd love to hear from you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
                <a href="mailto:hello@narradar.com" className="text-primary-600 hover:text-primary-700">
                  hello@narradar.com
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Enterprise Sales</h3>
                <a href="mailto:sales@narradar.com" className="text-primary-600 hover:text-primary-700">
                  sales@narradar.com
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
                <a href="mailto:support@narradar.com" className="text-primary-600 hover:text-primary-700">
                  support@narradar.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-600">
          <div className="container-narrow text-center">
            <h2 className="heading-lg text-white mb-6">Ready to Control Your Narrative?</h2>
            <p className="text-xl text-primary-100 mb-8">
              Start with a free Beacon Check to see how AI models interpret your message
            </p>
            <a
              href="/#beacon-check"
              className="btn-accent text-lg px-8 py-4 bg-white text-primary-600 hover:bg-gray-100"
            >
              Run Your First Beacon Check
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Careers - Join Narradar as Technical Co-Founder',
  description: 'Help us build the system that measures how AI reads the web. Seeking technical co-founder to architect scalable backend and shape the AI-native web.',
  alternates: {
    canonical: '/careers',
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
      name: 'Careers',
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/careers`
    }
  ]
}

export default function CareersPage() {
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
              <h1 className="heading-xl text-gray-900 mb-6">
                Help Us Build the System That Measures How AI Reads the Web
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Narradar is redefining how brands understand their online presence—not through human eyes, but through the eyes of AI.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="container-narrow">
            <div className="max-w-4xl mx-auto">
              <div className="bg-primary-50 rounded-2xl p-8 mb-12">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  As models like GPT-4 become the new front door for content discovery, traditional SEO breaks down. 
                  We're building the platform that helps companies monitor, understand, and optimize how AI systems 
                  interpret their brand.
                </p>
              </div>

              {/* Co-Founder Position */}
              <div className="mb-16">
                <h2 className="heading-lg text-gray-900 mb-8">Technical Co-Founder Opportunity</h2>
                
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  <h3 className="heading-sm text-gray-900 mb-6">We're looking for a technical co-founder who:</h3>
                  
                  <ul className="space-y-4 text-gray-700 mb-8">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span>Can architect and build a scalable backend (Python, Supabase, Vercel preferred)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span>Understands (and maybe obsesses over) how search engines and LLMs process content</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span>Has SEO chops—especially technical SEO and content structuring</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <span>Is excited to shape strategy, product, and the founding story from day one</span>
                    </li>
                  </ul>

                  <div className="bg-accent-50 border border-accent-200 rounded-lg p-6 mb-8">
                    <p className="text-gray-700 leading-relaxed">
                      You'd join at the inception stage, with <strong>full technical leadership</strong>, 
                      shared vision-setting, and <strong>meaningful equity</strong>. We're not just chasing AI trends—we're 
                      building the visibility layer for the AI-native web.
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-lg text-gray-900 font-medium mb-6">
                      Sound like your kind of problem? Let's talk.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/contact"
                        className="btn-primary px-8 py-3 text-lg font-semibold"
                      >
                        Get in Touch
                      </Link>
                      <a
                        href="mailto:hello@narradar.com?subject=Technical Co-Founder Interest"
                        className="btn-secondary px-8 py-3 text-lg font-semibold"
                      >
                        Email Directly
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Culture */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="heading-sm text-gray-900 mb-4">Move Fast</h3>
                  <p className="text-gray-600">
                    We're building at the speed of AI innovation. Every week brings new models and new opportunities.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="heading-sm text-gray-900 mb-4">Think Different</h3>
                  <p className="text-gray-600">
                    We're solving a problem that didn't exist 18 months ago. Fresh thinking required.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="heading-sm text-gray-900 mb-4">Own the Future</h3>
                  <p className="text-gray-600">
                    Join as a co-founder, not an employee. Build something that will matter for the next decade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Documentation - Narradar APO Platform',
  description: 'Learn how to use Narradar\'s Agent Perception Optimization platform with our comprehensive documentation and guides.',
  alternates: {
    canonical: '/docs',
  },
}

export default function DocsPage() {
  return (
    <div className="bg-white">
      <section className="pt-16 pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-narrow">
          <div className="text-center">
            <h1 className="heading-xl text-gray-900 mb-6">Documentation</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Learn how to use Narradar's Agent Perception Optimization platform
            </p>
            
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Documentation Coming Soon</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We're creating comprehensive documentation including getting started guides, 
                APO concepts, integration instructions, and best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/apo"
                  className="btn-primary px-6 py-3"
                >
                  Learn About APO
                </Link>
                <Link
                  href="/how-it-works"
                  className="btn-secondary px-6 py-3"
                >
                  How It Works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
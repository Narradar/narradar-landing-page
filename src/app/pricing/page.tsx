import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing Plans - Narradar APO Platform',
  description: 'Explore Narradar pricing plans for Agent Perception Optimization. Free tier available, with Pro and Enterprise options.',
  alternates: {
    canonical: '/pricing',
  },
}

export default function PricingPage() {
  return (
    <div className="bg-white">
      <section className="pt-16 pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-narrow">
          <div className="text-center">
            <h1 className="heading-xl text-gray-900 mb-6">Pricing Plans</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose the plan that fits your Agent Perception Optimization needs
            </p>
            
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We're finalizing our pricing structure to ensure it provides maximum value for businesses 
                of all sizes. Our plans will include free tier access, professional features, and 
                enterprise-grade capabilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#beacon-check"
                  className="btn-primary px-6 py-3"
                >
                  Try Free Beacon Check
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary px-6 py-3"
                >
                  Contact for Enterprise
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
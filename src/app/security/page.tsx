import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security Practices - Narradar Data Protection',
  description: 'Learn about Narradar\'s security practices, data protection measures, and privacy safeguards for Agent Perception Optimization.',
  alternates: {
    canonical: '/security',
  },
}

export default function SecurityPage() {
  return (
    <div className="bg-white">
      <section className="pt-16 pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-narrow">
          <div className="text-center">
            <h1 className="heading-xl text-gray-900 mb-6">Security Practices</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              How we protect your data and maintain security
            </p>
            
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Security Documentation Coming Soon</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We're preparing detailed security documentation covering our data protection measures, 
                encryption standards, access controls, and security certifications.
              </p>
              <div className="text-gray-700">
                <strong>Security Questions:</strong> 
                <a href="mailto:security@narradar.com" className="text-primary-600 hover:text-primary-700 ml-2">
                  security@narradar.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
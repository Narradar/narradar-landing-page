import { Metadata } from 'next'
import { ContactForm } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Contact Narradar - Get APO Support and Information',
  description: 'Contact Narradar for Agent Perception Optimization questions, enterprise sales, or technical support. We\'re here to help.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="pt-16 pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-narrow">
          <div className="text-center">
            <h1 className="heading-xl text-gray-900 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get in touch with our team for questions about Agent Perception Optimization
            </p>
            
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Form</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We're building out our comprehensive contact page with multiple ways to reach us. 
                In the meantime, you can reach us directly:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-gray-700">
                    <strong>General Inquiries:</strong> 
                    <a href="mailto:hello@narradar.com" className="text-primary-600 hover:text-primary-700 ml-2">
                      hello@narradar.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-gray-700">
                    <strong>Enterprise Sales:</strong> 
                    <a href="mailto:sales@narradar.com" className="text-primary-600 hover:text-primary-700 ml-2">
                      sales@narradar.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
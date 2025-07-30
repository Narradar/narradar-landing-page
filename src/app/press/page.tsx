import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press Kit - Narradar Media Resources',
  description: 'Download Narradar press kit materials including logos, product information, and media contacts for journalists and press coverage.',
  alternates: {
    canonical: '/press',
  },
}

export default function PressPage() {
  return (
    <div className="bg-white">
      <section className="pt-16 pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-narrow">
          <div className="text-center">
            <h1 className="heading-xl text-gray-900 mb-6">Press Kit</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Media resources and information about Narradar
            </p>
            
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Press Kit Coming Soon</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We're preparing comprehensive press materials including company information, 
                high-resolution assets, executive bios, and press releases.
              </p>
              <div className="text-gray-700">
                <strong>Media Inquiries:</strong> 
                <a href="mailto:press@narradar.com" className="text-primary-600 hover:text-primary-700 ml-2">
                  press@narradar.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
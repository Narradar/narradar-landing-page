interface QA {
  question: string
  answer: string
  category?: string
}

interface QASectionProps {
  title: string
  qas: QA[]
  className?: string
}

export function QASection({ title, qas, className = '' }: QASectionProps) {
  // Generate FAQ-specific JSON-LD structured data
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qas.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer
      }
    }))
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`} aria-labelledby="qa-section-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="container-narrow">
        <h2 id="qa-section-heading" className="heading-lg text-gray-900 text-center mb-12">
          {title}
        </h2>
        
        <div className="space-y-8">
          {qas.map((qa, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h3 className="heading-sm text-gray-900 mb-4 flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                  Q
                </span>
                {qa.question}
              </h3>
              
              <div className="ml-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {qa.answer}
                  </p>
                </div>
                
                {qa.category && (
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      {qa.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* AI-optimized structured data summary */}
        <div className="mt-12 bg-white rounded-xl p-8 border-2 border-primary-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
            </svg>
            Key Takeaways
          </h3>
          <ul className="text-gray-700 space-y-2">
            {qas.slice(0, 3).map((qa, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3" />
                <span className="text-sm">{qa.question}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// Export types for external use
export type { QA, QASectionProps }
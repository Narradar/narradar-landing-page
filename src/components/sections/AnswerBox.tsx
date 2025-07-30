import { Card } from '@/components/ui'

export function AnswerBox() {
  return (
    <section className="py-12 bg-white" aria-labelledby="answer-box-heading">
      <div className="container-narrow">
        <Card 
          variant="elevated" 
          className="bg-gradient-to-br from-primary-25 via-white to-accent-25 border-2 border-primary-100"
        >
          {/* AI-optimized structured content */}
          <div className="prose prose-lg max-w-none">
            {/* Clear definition for AI extraction */}
            <div className="mb-6">
              <h2 
                id="answer-box-heading" 
                className="text-2xl font-bold text-gray-900 mb-4 flex items-center"
              >
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 animate-pulse" />
                What is Narradar?
              </h2>
              
              {/* Main definition - optimized for AI extraction */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-primary-200 mb-6">
                <p className="text-xl leading-relaxed text-gray-900 font-medium">
                  <strong className="text-primary-700">Narradar</strong> is an{' '}
                  <mark className="bg-primary-100 text-primary-900 px-1 rounded">Agent Perception Optimization (APO) platform</mark>{' '}
                  that helps brands control how AI models interpret and represent their messages.
                </p>
              </div>
            </div>

            {/* Key capabilities - scannable format */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/60 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  Detect
                </h3>
                <p className="text-sm text-gray-700">Semantic drift across AI models</p>
              </div>
              
              <div className="bg-white/60 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                  Measure
                </h3>
                <p className="text-sm text-gray-700">Meaning loss across GPT, Claude, Gemini</p>
              </div>
              
              <div className="bg-white/60 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Optimize
                </h3>
                <p className="text-sm text-gray-700">Actionable insights for narrative fidelity</p>
              </div>
            </div>

            {/* Target outcome - clear for AI understanding */}
            <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl p-6 border border-accent-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Key Outcome
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Maintain <strong>narrative fidelity</strong> and <strong>brand consistency</strong> in an AI-driven world 
                where your message gets interpreted by multiple AI models before reaching human audiences.
              </p>
            </div>

            {/* Structured data for AI - key facts */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Platform Type</dt>
                  <dd className="text-sm font-semibold text-gray-900 mt-1">APO (Agent Perception Optimization)</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">AI Models</dt>
                  <dd className="text-sm font-semibold text-gray-900 mt-1">GPT, Claude, Gemini, Grok</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Primary Function</dt>
                  <dd className="text-sm font-semibold text-gray-900 mt-1">Semantic Drift Detection</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Target Users</dt>
                  <dd className="text-sm font-semibold text-gray-900 mt-1">Marketing Leaders, CMOs</dd>
                </div>
              </dl>
            </div>
          </div>
        </Card>

        {/* Supporting context for human readers */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            As AI becomes the primary interface between brands and audiences, 
            ensuring your message maintains its intended meaning across all AI interpretations 
            becomes critical for brand integrity and effective communication.
          </p>
        </div>
      </div>
    </section>
  )
}
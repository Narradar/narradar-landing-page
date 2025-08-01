import { Card } from '@/components/ui'

export function AnswerBox() {
  return (
    <section 
      className="py-12" 
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
      aria-labelledby="answer-box-heading"
    >
      <div className="container-narrow">
        <Card 
          variant="elevated" 
          style={{
            background: `linear-gradient(135deg, 
              rgba(var(--color-primary-rgb), 0.05) 0%, 
              var(--color-bg-secondary) 50%, 
              rgba(var(--color-accent-rgb, 0, 255, 75), 0.05) 100%)`,
            borderWidth: '2px',
            borderColor: 'rgba(var(--color-primary-rgb), 0.2)'
          }}
        >
          {/* AI-optimized structured content */}
          <div className="prose prose-lg max-w-none">
            {/* Clear definition for AI extraction */}
            <div className="mb-6">
              <h2 
                id="answer-box-heading" 
                className="text-2xl font-bold mb-4 flex items-center"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 animate-pulse" />
                What is Narradar?
              </h2>
              
              {/* Main definition - optimized for AI extraction */}
              <div 
                className="backdrop-blur-sm rounded-xl p-6 border mb-6"
                style={{
                  backgroundColor: 'rgba(var(--color-bg-primary-rgb), 0.8)',
                  borderColor: 'rgba(var(--color-primary-rgb), 0.3)'
                }}
              >
                <p 
                  className="text-xl leading-relaxed font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <strong style={{ color: 'var(--color-primary)' }}>Narradar</strong> is an{' '}
                  <mark 
                    className="px-1 rounded"
                    style={{
                      backgroundColor: 'rgba(var(--color-primary-rgb), 0.15)',
                      color: 'var(--color-primary)'
                    }}
                  >Agent Perception Optimization (APO) platform</mark>{' '}
                  that helps brands control how AI models interpret and represent their messages.
                </p>
              </div>
            </div>

            {/* Key capabilities - scannable format */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div 
                className="rounded-lg p-4 border"
                style={{
                  backgroundColor: 'rgba(var(--color-bg-secondary-rgb), 0.6)',
                  borderColor: 'var(--color-border-primary)'
                }}
              >
                <h3 
                  className="font-semibold mb-2 flex items-center"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  Detect
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >Semantic drift across AI models</p>
              </div>
              
              <div 
                className="rounded-lg p-4 border"
                style={{
                  backgroundColor: 'rgba(var(--color-bg-secondary-rgb), 0.6)',
                  borderColor: 'var(--color-border-primary)'
                }}
              >
                <h3 
                  className="font-semibold mb-2 flex items-center"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                  Measure
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >Meaning loss across GPT, Claude, Gemini</p>
              </div>
              
              <div 
                className="rounded-lg p-4 border"
                style={{
                  backgroundColor: 'rgba(var(--color-bg-secondary-rgb), 0.6)',
                  borderColor: 'var(--color-border-primary)'
                }}
              >
                <h3 
                  className="font-semibold mb-2 flex items-center"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Optimize
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >Actionable insights for narrative fidelity</p>
              </div>
            </div>

            {/* Target outcome - clear for AI understanding */}
            <div 
              className="rounded-xl p-6 border"
              style={{
                background: `linear-gradient(90deg, 
                  rgba(var(--color-accent-rgb, 0, 255, 75), 0.1) 0%, 
                  rgba(var(--color-primary-rgb), 0.1) 100%)`,
                borderColor: 'rgba(var(--color-accent-rgb, 0, 255, 75), 0.3)'
              }}
            >
              <h3 
                className="font-semibold mb-3 flex items-center"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  style={{ color: 'var(--color-accent)' }}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Key Outcome
              </h3>
              <p 
                className="leading-relaxed"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Maintain <strong>narrative fidelity</strong> and <strong>brand consistency</strong> in an AI-driven world 
                where your message gets interpreted by multiple AI models before reaching human audiences.
              </p>
            </div>

            {/* Structured data for AI - key facts */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <dt 
                    className="text-xs font-medium uppercase tracking-wide"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >Platform Type</dt>
                  <dd 
                    className="text-sm font-semibold mt-1"
                    style={{ color: 'var(--color-text-primary)' }}
                  >APO (Agent Perception Optimization)</dd>
                </div>
                <div>
                  <dt 
                    className="text-xs font-medium uppercase tracking-wide"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >AI Models</dt>
                  <dd 
                    className="text-sm font-semibold mt-1"
                    style={{ color: 'var(--color-text-primary)' }}
                  >GPT, Claude, Gemini, Grok</dd>
                </div>
                <div>
                  <dt 
                    className="text-xs font-medium uppercase tracking-wide"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >Primary Function</dt>
                  <dd 
                    className="text-sm font-semibold mt-1"
                    style={{ color: 'var(--color-text-primary)' }}
                  >Semantic Drift Detection</dd>
                </div>
                <div>
                  <dt 
                    className="text-xs font-medium uppercase tracking-wide"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >Target Users</dt>
                  <dd 
                    className="text-sm font-semibold mt-1"
                    style={{ color: 'var(--color-text-primary)' }}
                  >Marketing Leaders, CMOs</dd>
                </div>
              </dl>
            </div>
          </div>
        </Card>

        {/* Supporting context for human readers */}
        <div className="mt-8 text-center">
          <p 
            className="text-sm max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            As AI becomes the primary interface between brands and audiences, 
            ensuring your message maintains its intended meaning across all AI interpretations 
            becomes critical for brand integrity and effective communication.
          </p>
        </div>
      </div>
    </section>
  )
}
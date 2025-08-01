import { Button } from '@/components/ui'

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32" style={{ background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 50%, var(--color-bg-secondary) 100%)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-32 w-80 h-80 rounded-full filter blur-3xl opacity-20"
          style={{ backgroundColor: 'var(--color-primary-light)' }}
        />
        <div 
          className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full filter blur-3xl opacity-20"
          style={{ backgroundColor: 'var(--color-accent-light)' }}
        />
      </div>

      <div className="container-wide relative">
        <div className="text-center max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium mb-8"
            style={{ 
              backgroundColor: 'var(--color-primary-light)',
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)'
            }}
          >
            <span 
              className="w-2 h-2 rounded-full mr-2 animate-pulse"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
            Agent Perception Optimization (APO) Platform
          </div>

          {/* Headline */}
          <h1 className="heading-xl mb-8 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
            Marketing to people is easy.{' '}
            <span className="gradient-text block sm:inline">
              Marketing to AI is where we come in.
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl sm:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            See how your message shifts across models. Detect drift. Measure meaning loss. Stay in control.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              href="#beacon-check" 
              variant="primary"
              size="xl"
              className="min-w-[200px] shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Run a Beacon Check
            </Button>
          </div>

          {/* Enhanced Hero Visual */}
          <div className="max-w-6xl mx-auto">
            <div 
              className="backdrop-blur-sm rounded-3xl shadow-2xl border p-8 sm:p-12"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)'
              }}
            >
              {/* Mobile-first responsive layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                
                {/* Original Message */}
                <div className="text-center lg:text-left">
                  <div 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      color: 'var(--color-text-secondary)'
                    }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: 'var(--color-text-tertiary)' }}
                    />
                    Original Message
                  </div>
                  <div 
                    className="rounded-xl p-6 text-sm sm:text-base leading-relaxed border"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%)',
                      color: 'var(--color-text-primary)',
                      borderColor: 'var(--color-border-primary)'
                    }}
                  >
                    "Our revolutionary AI platform increases productivity by 40%"
                  </div>
                </div>
                
                {/* Flow Visualization */}
                <div className="relative flex flex-col items-center">
                  {/* Mobile: Vertical flow */}
                  <div className="lg:hidden space-y-6">
                    <div 
                      className="w-px h-8"
                      style={{ background: 'linear-gradient(to bottom, var(--color-primary), var(--color-primary-hover))' }}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      {['GPT', 'Claude', 'Gemini', 'Grok'].map((model, idx) => (
                        <div key={model} className="flex flex-col items-center">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                            style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)' }}
                          >
                            <span className="text-white text-xs font-bold">{model.slice(0, 2)}</span>
                          </div>
                          <span 
                            className="text-xs mt-2 font-medium"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >{model}</span>
                        </div>
                      ))}
                    </div>
                    <div 
                      className="w-px h-8"
                      style={{ background: 'linear-gradient(to bottom, var(--color-primary-hover), var(--color-primary))' }}
                    />
                  </div>

                  {/* Desktop: Horizontal flow */}
                  <div className="hidden lg:block w-full">
                    <svg className="w-full h-24" viewBox="0 0 400 80" fill="none">
                      {/* Flow line */}
                      <defs>
                        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                          <stop offset="50%" stopColor="#0ea5e9" stopOpacity="1" />
                          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M20 40 L380 40" 
                        stroke="url(#flowGradient)" 
                        strokeWidth="3"
                        strokeDasharray="8,4"
                        className="animate-pulse"
                      />
                      
                      {/* Model nodes */}
                      {[
                        { x: 80, label: 'GPT', color: '#0ea5e9' },
                        { x: 160, label: 'Claude', color: '#0ea5e9' },
                        { x: 240, label: 'Gemini', color: '#0ea5e9' },
                        { x: 320, label: 'Grok', color: '#0ea5e9' }
                      ].map((node, idx) => (
                        <g key={node.label}>
                          <circle 
                            cx={node.x} 
                            cy="40" 
                            r="12" 
                            fill={node.color} 
                            className="drop-shadow-sm"
                          />
                          <circle 
                            cx={node.x} 
                            cy="40" 
                            r="12" 
                            fill="none" 
                            stroke="white" 
                            strokeWidth="2"
                          />
                          <text 
                            x={node.x} 
                            y="65" 
                            textAnchor="middle" 
                            className="text-xs font-medium"
                            style={{ fill: 'var(--color-text-secondary)' }}
                          >
                            {node.label}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Model Interpretations */}
                <div className="text-center lg:text-right">
                  <div 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      color: 'var(--color-text-secondary)'
                    }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: '#f87171' }}
                    />
                    Model Interpretations
                  </div>
                  <div className="space-y-3">
                    <div 
                      className="border rounded-lg px-4 py-3"
                      style={{ 
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderColor: 'rgba(239, 68, 68, 0.3)',
                        color: '#dc2626'
                      }}
                    >
                      <div className="text-xs font-medium opacity-75 mb-1">GPT Interpretation</div>
                      <div className="text-sm">Productivity gains "up to 40%"</div>
                    </div>
                    <div 
                      className="border rounded-lg px-4 py-3"
                      style={{ 
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderColor: 'rgba(245, 158, 11, 0.3)',
                        color: '#d97706'
                      }}
                    >
                      <div className="text-xs font-medium opacity-75 mb-1">Claude Interpretation</div>
                      <div className="text-sm">AI tool boosts efficiency</div>
                    </div>
                    <div 
                      className="border rounded-lg px-4 py-3"
                      style={{ 
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderColor: 'rgba(239, 68, 68, 0.3)',
                        color: '#dc2626'
                      }}
                    >
                      <div className="text-xs font-medium opacity-75 mb-1">Gemini Interpretation</div>
                      <div className="text-sm">Platform claims 40% improvement</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom stats */}
              <div 
                className="mt-8 pt-6 border-t grid grid-cols-3 gap-4 text-center"
                style={{ borderTopColor: 'var(--color-border-primary)' }}
              >
                <div>
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >4</div>
                  <div 
                    className="text-xs"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >AI Models</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">67</div>
                  <div 
                    className="text-xs"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >Avg. Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">5</div>
                  <div 
                    className="text-xs"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >Blips Found</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
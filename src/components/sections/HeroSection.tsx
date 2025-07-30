import { Button } from '@/components/ui'

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      <div className="container-wide relative">
        <div className="text-center max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse" />
            Agent Perception Optimization (APO) Platform
          </div>

          {/* Headline */}
          <h1 className="heading-xl text-gray-900 mb-8 leading-tight">
            Marketing to people is easy.{' '}
            <span className="gradient-text block sm:inline">
              Marketing to AI is where we come in.
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
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
            <Button
              href="#early-beta"
              variant="outline"
              size="xl"
              className="min-w-[200px]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Join Early Beta
            </Button>
          </div>

          {/* Enhanced Hero Visual */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8 sm:p-12">
              {/* Mobile-first responsive layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                
                {/* Original Message */}
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-4">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
                    Original Message
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-sm sm:text-base text-gray-800 leading-relaxed border border-gray-200">
                    "Our revolutionary AI platform increases productivity by 40%"
                  </div>
                </div>
                
                {/* Flow Visualization */}
                <div className="relative flex flex-col items-center">
                  {/* Mobile: Vertical flow */}
                  <div className="lg:hidden space-y-6">
                    <div className="w-px h-8 bg-gradient-to-b from-primary-300 to-primary-500" />
                    <div className="grid grid-cols-2 gap-4">
                      {['GPT', 'Claude', 'Gemini', 'Grok'].map((model, idx) => (
                        <div key={model} className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-xs font-bold">{model.slice(0, 2)}</span>
                          </div>
                          <span className="text-xs text-gray-600 mt-2 font-medium">{model}</span>
                        </div>
                      ))}
                    </div>
                    <div className="w-px h-8 bg-gradient-to-b from-primary-500 to-primary-300" />
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
                            className="text-xs fill-gray-600 font-medium"
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
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-4">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2" />
                    Model Interpretations
                  </div>
                  <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-800">
                      <div className="text-xs font-medium opacity-75 mb-1">GPT Interpretation</div>
                      <div className="text-sm">Productivity gains "up to 40%"</div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-yellow-800">
                      <div className="text-xs font-medium opacity-75 mb-1">Claude Interpretation</div>
                      <div className="text-sm">AI tool boosts efficiency</div>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-800">
                      <div className="text-xs font-medium opacity-75 mb-1">Gemini Interpretation</div>
                      <div className="text-sm">Platform claims 40% improvement</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom stats */}
              <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-600">4</div>
                  <div className="text-xs text-gray-600">AI Models</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">67</div>
                  <div className="text-xs text-gray-600">Avg. Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">5</div>
                  <div className="text-xs text-gray-600">Blips Found</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
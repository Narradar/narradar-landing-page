const steps = [
  {
    number: '01',
    title: 'Submit Content',
    description: 'Upload your Beacon content and source materials',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    number: '02', 
    title: 'Collect Model Readings',
    description: 'We analyze your content across GPT, Claude, Gemini, and Grok',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Detect Blips & Score Alignment', 
    description: 'Identify drift patterns and calculate your Beacon alignment score',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Report & Recommend Fixes',
    description: 'Get actionable insights and recommendations to improve alignment',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
]

export function ProcessSteps() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(var(--color-primary-rgb, 0, 102, 255), 0.03) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(var(--color-accent-rgb, 0, 255, 75), 0.02) 0%, transparent 50%)`
        }}
      />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(90deg, var(--color-border-primary) 1px, transparent 1px), linear-gradient(var(--color-border-primary) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="container-wide relative z-10">
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full border text-xs font-semibold mb-6 tracking-wide uppercase"
            style={{ 
              backgroundColor: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border-primary)',
              color: 'var(--color-text-tertiary)'
            }}
          >
            Process
          </div>
          <h2 
            className="heading-lg mb-6 font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            How it works
          </h2>
          <p 
            className="text-xl max-w-3xl mx-auto font-medium"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Four simple steps to understand and optimize your message across AI models
          </p>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-[4.5rem] left-0 right-0 h-px z-0">
            <div 
              className="h-full mx-auto opacity-30"
              style={{ 
                width: 'calc(100% - 10rem)',
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  var(--color-primary) 25%, 
                  var(--color-primary) 75%, 
                  transparent 100%)`
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group cursor-default relative z-10">
                <div className="relative mb-8">
                  {/* Enhanced icon container */}
                  <div 
                    className="w-24 h-24 rounded-3xl shadow-xl flex items-center justify-center mx-auto border-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl relative overflow-hidden"
                    style={{
                      backgroundColor: 'var(--color-bg-primary)',
                      borderColor: 'var(--color-primary)',
                      boxShadow: '0 10px 25px rgba(var(--color-primary-rgb, 0, 102, 255), 0.15)'
                    }}
                  >
                    {/* Inner glow */}
                    <div 
                      className="absolute inset-0 rounded-3xl opacity-20"
                      style={{
                        background: `radial-gradient(circle at center, var(--color-primary) 0%, transparent 70%)`
                      }}
                    />
                    
                    <div 
                      className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Enhanced step number */}
                  <div 
                    className="absolute -top-3 -right-3 w-10 h-10 text-white rounded-2xl flex items-center justify-center text-sm font-black shadow-lg transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      backgroundColor: 'var(--color-primary)',
                      boxShadow: '0 4px 12px rgba(var(--color-primary-rgb, 0, 102, 255), 0.4)'
                    }}
                  >
                    {step.number}
                  </div>
                </div>
                
                <div className="px-2">
                  <h3 
                    className="heading-sm mb-4 font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="leading-relaxed text-base font-medium"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {step.description}
                  </p>
                </div>
                
                {/* Step connection indicator */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-8 flex justify-center z-20">
                    <div 
                      className="w-3 h-3 rounded-full border-2 animate-pulse"
                      style={{ 
                        backgroundColor: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-primary)'
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
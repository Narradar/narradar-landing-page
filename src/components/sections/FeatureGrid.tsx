const features = [
  {
    title: 'AI Model Perception',
    description: 'See how GPT, Claude, and Gemini interpret your content',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Semantic Drift Detection',
    description: 'Track changes and distortions in real time',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Brand Risk Prevention', 
    description: 'Catch narrative problems before they spread',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const deliverables = [
  'Beacon alignment score',
  'Blip map by model and category', 
  'Top risks and recommended fixes',
  'Option to enable ongoing Beacon Monitor',
]

export function FeatureGrid() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(90deg, var(--color-border-primary) 1px, transparent 1px), linear-gradient(var(--color-border-primary) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, rgba(var(--color-primary-rgb, 0, 102, 255), 0.02) 0%, transparent 70%)`
        }}
      />
      
      <div className="container-wide relative z-10">
        {/* What You Get - Enhanced */}
        <div className="text-center mb-20">
          <div className="mb-12">
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full border text-xs font-semibold mb-4 tracking-wide uppercase"
              style={{ 
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-tertiary)'
              }}
            >
              Deliverables
            </div>
            <h2 
              className="heading-lg mb-6 font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              What you get
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Comprehensive analysis and actionable insights delivered in minutes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {deliverables.map((item, index) => (
              <div key={index} className="group cursor-default">
                <div className="relative">
                  {/* Enhanced number badge */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl relative overflow-hidden"
                    style={{ 
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderColor: 'var(--color-primary)',
                      boxShadow: '0 8px 25px rgba(var(--color-primary-rgb, 0, 102, 255), 0.15)'
                    }}
                  >
                    {/* Inner glow */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-20"
                      style={{
                        background: `radial-gradient(circle at center, var(--color-primary) 0%, transparent 70%)`
                      }}
                    />
                    <span 
                      className="font-black text-xl relative z-10"
                      style={{ color: 'var(--color-primary)' }}
                    >{index + 1}</span>
                  </div>
                  
                  {/* Connection line for desktop */}
                  {index < deliverables.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px transform -translate-y-1/2 z-0">
                      <div 
                        className="w-3/4 h-px mx-auto opacity-30"
                        style={{ 
                          background: `linear-gradient(90deg, var(--color-primary) 0%, transparent 100%)`
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="px-4">
                  <p 
                    className="text-sm font-medium leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Three Core Capabilities - Premium Cards */}
        <div className="text-center mb-12">
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full border text-xs font-semibold mb-4 tracking-wide uppercase"
            style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)',
              color: 'var(--color-text-tertiary)'
            }}
          >
            Core Features
          </div>
          <h2 
            className="heading-lg mb-6 font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Three core capabilities
          </h2>
          <p 
            className="text-lg max-w-3xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Advanced AI perception analysis to protect and optimize your brand messaging
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group cursor-default transform transition-all duration-300 hover:-translate-y-2"
            >
              {/* Premium feature card */}
              <div 
                className="h-full p-8 rounded-3xl border-2 shadow-lg backdrop-blur-sm relative overflow-hidden transition-all duration-300 group-hover:shadow-2xl"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Subtle gradient overlay */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, transparent 0%, rgba(var(--color-primary-rgb, 0, 102, 255), 0.02) 100%)`
                  }}
                />
                
                {/* Highlight border */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`,
                    padding: '2px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'subtract'
                  }}
                />
                
                <div className="relative z-10 text-center">
                  {/* Enhanced icon container */}
                  <div 
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg relative overflow-hidden"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderColor: 'var(--color-border-secondary)',
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    {/* Inner gradient */}
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
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 
                    className="heading-sm mb-4 font-bold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {feature.title}
                  </h3>
                  
                  <p 
                    className="leading-relaxed text-base font-medium"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
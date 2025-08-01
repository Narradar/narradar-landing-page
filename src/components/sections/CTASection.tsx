import { BeaconCheckForm } from '@/components/forms'

export function CTASection() {
  return (
    <section 
      id="beacon-check" 
      className="py-20 relative overflow-hidden"
    >
      {/* Enhanced gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, 
            var(--color-primary) 0%, 
            var(--color-primary-hover) 50%, 
            var(--color-primary) 100%)`
        }}
      />
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full filter blur-3xl opacity-20"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        />
        <div 
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full filter blur-3xl opacity-15"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        />
      </div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      <div className="container-narrow relative z-10">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border-2 border-white/20 text-xs font-semibold mb-6 tracking-wide uppercase backdrop-blur-sm">
            <span className="w-2.5 h-2.5 rounded-full mr-3 bg-white animate-pulse" />
            <span className="text-white/90">Free Analysis</span>
          </div>
          
          <h2 className="heading-lg text-white mb-6 font-bold drop-shadow-sm">
            Run a Beacon Check and get your Drift Report in minutes
          </h2>
          <p 
            className="text-xl font-medium leading-relaxed drop-shadow-sm"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            See how AI models interpret your message and get actionable insights to improve alignment
          </p>
        </div>

        {/* Enhanced form container */}
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <BeaconCheckForm className="" />
          </div>
        </div>
      </div>
    </section>
  )
}
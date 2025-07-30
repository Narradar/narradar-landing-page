import Link from 'next/link'

interface CallToActionProps {
  variant?: 'default' | 'beacon' | 'newsletter'
  className?: string
}

export function CallToAction({ variant = 'default', className = '' }: CallToActionProps) {
  const ctaVariants = {
    default: {
      title: "Ready to optimize your brand's AI perception?",
      description: "Join forward-thinking marketing leaders who are taking control of their brand narrative in the age of AI.",
      primaryButton: {
        text: "Get Started with APO",
        href: "/apo"
      },
      secondaryButton: {
        text: "Run a Beacon Check",
        href: "/#beacon-check"
      }
    },
    beacon: {
      title: "See how AI models interpret your brand",
      description: "Run a free Beacon Check to discover how GPT, Claude, and other AI models currently represent your company.",
      primaryButton: {
        text: "Run Free Beacon Check",
        href: "/#beacon-check"
      },
      secondaryButton: {
        text: "Learn About APO",
        href: "/apo/what-is-apo"
      }
    },
    newsletter: {
      title: "Stay ahead of AI perception trends",
      description: "Get weekly insights on Agent Perception Optimization and semantic drift straight to your inbox.",
      primaryButton: {
        text: "Subscribe to Newsletter",
        href: "/#beta-signup"
      },
      secondaryButton: {
        text: "Explore APO Solutions",
        href: "/apo"
      }
    }
  }

  const cta = ctaVariants[variant]

  return (
    <section className={`py-16 bg-gradient-to-br from-primary-600 to-primary-700 ${className}`}>
      <div className="container-narrow text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-lg text-white mb-6">
            {cta.title}
          </h2>
          
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            {cta.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={cta.primaryButton.href}
              className="btn-primary bg-white text-primary-600 hover:bg-gray-50 border-white"
            >
              {cta.primaryButton.text}
            </Link>
            
            <Link
              href={cta.secondaryButton.href}
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600"
            >
              {cta.secondaryButton.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
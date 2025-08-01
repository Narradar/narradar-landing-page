import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'bordered' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  className?: string
  style?: React.CSSProperties
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

interface CardBodyProps {
  children: ReactNode
  className?: string
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

const Card = ({ 
  children, 
  variant = 'default', 
  padding = 'md', 
  hover = false,
  className = '',
  style = {}
}: CardProps) => {
  const baseClasses = 'rounded-xl transition-all duration-200'
  
  // Theme-aware variant classes using CSS variables
  const variantClasses = {
    default: 'border shadow-sm',
    elevated: 'shadow-lg border-2',
    bordered: 'border-2 shadow-sm',
    glass: 'backdrop-blur-md border shadow-xl'
  }

  // Enhanced dynamic styles with better dark mode support
  const getVariantStyles = (variant: string) => {
    const baseStyle = {
      backgroundColor: 'var(--color-bg-secondary)',
      borderColor: 'var(--color-border-primary)',
      color: 'var(--color-text-primary)',
      position: 'relative' as const,
      overflow: 'hidden' as const
    }

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          borderColor: 'var(--color-primary)',
          borderWidth: '2px',
          boxShadow: `
            0 10px 25px -5px rgba(0, 0, 0, 0.1),
            0 8px 10px -6px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(var(--color-border-primary-rgb, 226, 232, 240), 0.05)
          `
        }
      case 'bordered':
        return {
          ...baseStyle,
          borderWidth: '2px',
          borderColor: 'var(--color-border-secondary)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 1px 3px rgba(0, 0, 0, 0.1)
          `
        }
      case 'glass':
        return {
          backgroundColor: 'rgba(var(--color-bg-tertiary-rgb, 241, 245, 249), 0.8)',
          borderColor: 'rgba(var(--color-border-secondary-rgb, 203, 213, 225), 0.8)',
          color: 'var(--color-text-primary)',
          backdropFilter: 'blur(12px)',
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `
        }
      default:
        return {
          ...baseStyle,
          boxShadow: `
            0 1px 3px rgba(0, 0, 0, 0.1),
            0 1px 2px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `
        }
    }
  }

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }

  const hoverClasses = hover 
    ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer transition-all duration-300 hover:scale-[1.02] group' 
    : 'transition-all duration-200'

  return (
    <div 
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${paddingClasses[padding]} 
        ${hoverClasses} 
        ${className}
      `}
      style={{...getVariantStyles(variant), ...style}}
    >
      {/* Subtle inner glow for premium feel */}
      <div 
        className="absolute inset-0 rounded-xl opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(var(--color-primary-rgb, 0, 102, 255), 0.05) 0%, transparent 50%)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

const CardHeader = ({ children, className = '' }: CardHeaderProps) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
)

const CardBody = ({ children, className = '' }: CardBodyProps) => (
  <div className={className}>
    {children}
  </div>
)

const CardFooter = ({ children, className = '' }: CardFooterProps) => (
  <div 
    className={`mt-6 pt-4 border-t ${className}`}
    style={{ borderTopColor: 'var(--color-border-primary)' }}
  >
    {children}
  </div>
)

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export { Card }
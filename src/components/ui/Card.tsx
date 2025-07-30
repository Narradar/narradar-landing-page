import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'bordered' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  className?: string
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
  className = '' 
}: CardProps) => {
  const baseClasses = 'rounded-xl transition-all duration-200'
  
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-sm border border-gray-100',
    bordered: 'bg-white border-2 border-gray-200',
    glass: 'bg-white/80 backdrop-blur-sm border border-gray-200/50'
  }

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }

  const hoverClasses = hover 
    ? 'hover:shadow-md hover:shadow-gray-100 hover:-translate-y-0.5 cursor-pointer' 
    : ''

  return (
    <div 
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${paddingClasses[padding]} 
        ${hoverClasses} 
        ${className}
      `}
    >
      {children}
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
  <div className={`mt-6 pt-4 border-t border-gray-100 ${className}`}>
    {children}
  </div>
)

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export { Card }
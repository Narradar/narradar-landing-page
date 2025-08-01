import { ReactNode, ButtonHTMLAttributes } from 'react'
import Link from 'next/link'

interface BaseButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

interface ButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  href?: never
}

interface LinkButtonProps extends BaseButtonProps {
  href: string
  external?: boolean
  onClick?: never
  type?: never
}

type ButtonComponentProps = ButtonProps | LinkButtonProps

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props 
}: ButtonComponentProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'border-transparent shadow-sm hover:shadow-md focus:ring-2',
    secondary: 'shadow-sm hover:shadow-md focus:ring-2',
    accent: 'border-transparent shadow-sm hover:shadow-md focus:ring-2',
    ghost: 'bg-transparent border-transparent focus:ring-2',
    outline: 'bg-transparent border focus:ring-2'
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base',
    xl: 'px-8 py-3 text-lg'
  }

  const widthClasses = fullWidth ? 'w-full' : ''

  // Dynamic styles using CSS variables for theme support
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-text-primary)',
          borderColor: 'transparent',
          '--tw-ring-color': 'var(--color-primary)'
        }
      case 'secondary':
        return {
          backgroundColor: 'var(--color-bg-secondary)',
          color: 'var(--color-text-primary)',
          borderColor: 'var(--color-border-primary)',
          '--tw-ring-color': 'var(--color-primary)'
        }
      case 'accent':
        return {
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-text-primary)',
          borderColor: 'transparent',
          '--tw-ring-color': 'var(--color-accent)'
        }
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-text-secondary)',
          borderColor: 'transparent',
          '--tw-ring-color': 'var(--color-primary)'
        }
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-primary)',
          borderColor: 'var(--color-primary)',
          '--tw-ring-color': 'var(--color-primary)'
        }
      default:
        return {}
    }
  }

  const classes = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${widthClasses} 
    ${className}
  `.trim()

  const content = (
    <>
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </>
  )

  if ('href' in props && props.href) {
    const { href, external, ...linkProps } = props
    
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          style={getVariantStyles(variant)}
          target="_blank"
          rel="noopener noreferrer"
          {...(linkProps as any)}
        >
          {content}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} style={getVariantStyles(variant)} {...(linkProps as any)}>
        {content}
      </Link>
    )
  }

  return (
    <button 
      className={classes} 
      style={getVariantStyles(variant)}
      disabled={disabled || loading}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}

export { Button }
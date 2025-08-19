'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { ThemeToggle } from '@/components/theme/ThemeToggle'

const navigation = [
  { name: 'APO', href: '/apo' },
  { name: 'How it Works', href: '/how-it-works' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

const externalLinks = [
  { name: 'Portal', href: 'https://portal.narradar.com', target: '_blank' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll behavior for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('header')) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [mobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <header 
      className={`sticky top-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isScrolled 
          ? 'border-b shadow-sm' 
          : 'border-b border-transparent'
      }`}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderBottomColor: isScrolled ? 'var(--color-border-primary)' : 'transparent'
      }}
    >
      <nav className="container-wide" aria-label="Global navigation">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg p-1 -m-1"
              aria-label="Narradar home"
            >
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))'
                }}
              >
                <span className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>N</span>
              </div>
              <span 
                className="text-xl font-bold transition-colors group-hover:opacity-80"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Narradar
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative ${
                  pathname === item.href
                    ? 'opacity-100'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  color: 'var(--color-text-primary)',
                  backgroundColor: pathname === item.href ? 'var(--color-bg-secondary)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (pathname !== item.href) {
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== item.href) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
                {pathname === item.href && (
                  <span 
                    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full" 
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                )}
              </Link>
            ))}
            
            {/* External links */}
            {externalLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.target}
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-1 opacity-70 hover:opacity-100"
                style={{ color: 'var(--color-text-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <span>{item.name}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* <ThemeToggle /> */}
            <Link
              href="#beacon-check"
              className="btn-primary px-6 py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-shadow"
            >
              Run Beacon Check
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* <ThemeToggle /> */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset transition-colors opacity-70 hover:opacity-100"
              style={{ 
                color: 'var(--color-text-primary)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          id="mobile-menu"
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen 
              ? 'max-h-screen opacity-100' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div 
            className="px-2 pt-4 pb-6 space-y-2 border-t shadow-lg"
            style={{ 
              backgroundColor: 'var(--color-bg-primary)',
              borderTopColor: 'var(--color-border-primary)'
            }}
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? 'border-l-4 opacity-100'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  color: 'var(--color-text-primary)',
                  backgroundColor: pathname === item.href ? 'var(--color-bg-secondary)' : 'transparent',
                  borderLeftColor: pathname === item.href ? 'var(--color-primary)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (pathname !== item.href) {
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== item.href) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            
            {/* External links in mobile */}
            {externalLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.target}
                rel="noopener noreferrer"
                className="block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 opacity-70 hover:opacity-100"
                style={{ color: 'var(--color-text-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <span>{item.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
            
            <div 
              className="pt-4 border-t"
              style={{ borderTopColor: 'var(--color-border-primary)' }}
            >
              <Link
                href="#beacon-check"
                className="btn-primary w-full justify-center py-3 text-base font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Run Beacon Check
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
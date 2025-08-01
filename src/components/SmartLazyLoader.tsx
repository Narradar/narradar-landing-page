'use client'

import { useState, useEffect, ReactNode, useRef } from 'react'

interface SmartLazyLoaderProps {
  children: ReactNode
  fallback?: ReactNode
  threshold?: number
  forceRender?: boolean // For AI agents
  className?: string
  minHeight?: string
}

export function SmartLazyLoader({ 
  children, 
  fallback, 
  threshold = 200,
  forceRender = false,
  className = '',
  minHeight = '200px'
}: SmartLazyLoaderProps) {
  const [shouldRender, setShouldRender] = useState(forceRender)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // If forced to render or already should render, skip intersection logic
    if (forceRender || shouldRender) {
      setIsIntersecting(true)
      return
    }

    // Check if IntersectionObserver is supported
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setIsIntersecting(true)
          setShouldRender(true)
          // Cleanup observer once triggered
          if (observerRef.current) {
            observerRef.current.disconnect()
          }
        }
      },
      {
        rootMargin: `${threshold}px`,
        threshold: 0.1
      }
    )

    observerRef.current = observer

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [forceRender, shouldRender, threshold])

  // Track lazy loading for analytics
  useEffect(() => {
    if (shouldRender && !forceRender && typeof window !== 'undefined') {
      // Track lazy loading event
      if ((window as any).gtag) {
        (window as any).gtag('event', 'lazy_load_trigger', {
          event_category: 'Performance',
          event_label: 'Component Lazy Loaded'
        })
      }
    }
  }, [shouldRender, forceRender])

  if (shouldRender || forceRender) {
    return <div className={className}>{children}</div>
  }

  return (
    <div 
      ref={placeholderRef}
      className={`${className} flex items-center justify-center`}
      style={{ minHeight }}
      aria-label="Loading content..."
    >
      {fallback || (
        <div className="w-full animate-pulse">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-48 w-full" />
        </div>
      )}
    </div>
  )
}

// Theme-aware skeleton components using your existing color system
export function DemoSectionSkeleton() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-wide">
        <div className="animate-pulse space-y-8">
          <div className="text-center space-y-4">
            <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded w-1/3 mx-auto" />
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-2/3 mx-auto" />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl h-96 w-full" />
        </div>
      </div>
    </section>
  )
}

export function FAQSectionSkeleton() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-wide">
        <div className="animate-pulse space-y-8">
          <div className="text-center space-y-4">
            <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded w-1/4 mx-auto" />
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2 mx-auto" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="border-gray-200 dark:border-gray-700 rounded-lg p-6 card">
                <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded w-3/4 mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full" />
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function CTASectionSkeleton() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-wide">
        <div className="animate-pulse">
          <div className="card rounded-xl p-12 text-center space-y-6">
            <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded w-1/2 mx-auto" />
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4 mx-auto" />
            <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded w-48 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
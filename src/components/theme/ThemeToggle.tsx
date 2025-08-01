'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div
        className={`
          btn-ghost relative inline-flex items-center justify-center
          w-10 h-10 rounded-lg
          ${className}
        `}
      >
        {/* Placeholder moon icon for dark default */}
        <svg
          className="w-5 h-5 opacity-70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        btn-ghost relative inline-flex items-center justify-center
        w-10 h-10 rounded-lg transition-all duration-200
        hover:bg-gray-800/10 dark:hover:bg-white/10
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${className}
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon for light mode */}
      <svg
        className={`
          absolute inset-0 w-5 h-5 m-auto transition-all duration-300
          ${theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
        `}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      {/* Moon icon for dark mode */}
      <svg
        className={`
          absolute inset-0 w-5 h-5 m-auto transition-all duration-300
          ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
        `}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  )
}

export default ThemeToggle
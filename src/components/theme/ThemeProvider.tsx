'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark') // Default to dark
  const [mounted, setMounted] = useState(false)

  // Set mounted to true after component mounts to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setThemeState(savedTheme)
    } else {
      // Check system preference but still default to dark for cybersecurity aesthetic
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const defaultTheme = systemPrefersDark ? 'dark' : 'dark' // Always default to dark
      setThemeState(defaultTheme)
      localStorage.setItem('theme', defaultTheme)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  // Apply theme to document
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement
      
      // Remove previous theme classes
      root.classList.remove('dark', 'light')
      
      // Add current theme class
      root.classList.add(theme)
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content', 
          theme === 'dark' ? '#0a0f1c' : '#fefefe'
        )
      }
    }
  }, [theme, mounted])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
'use client'

import React from 'react'
import { useTheme } from './ThemeProvider'

export function ThemeDemo() {
  const { theme } = useTheme()

  return (
    <div className="p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          Theme System Demo
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Current theme: <strong>{theme}</strong>
        </p>
      </div>

      {/* Color swatches */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <div 
            className="h-16 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border-primary)'
            }}
          />
          <p className="text-xs text-center" style={{ color: 'var(--color-text-tertiary)' }}>
            Primary BG
          </p>
        </div>

        <div className="space-y-2">
          <div 
            className="h-16 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)'
            }}
          />
          <p className="text-xs text-center" style={{ color: 'var(--color-text-tertiary)' }}>
            Secondary BG
          </p>
        </div>

        <div className="space-y-2">
          <div 
            className="h-16 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              borderColor: 'var(--color-border-primary)'
            }}
          />
          <p className="text-xs text-center" style={{ color: 'var(--color-text-tertiary)' }}>
            Primary Brand
          </p>
        </div>

        <div className="space-y-2">
          <div 
            className="h-16 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--color-accent)',
              borderColor: 'var(--color-border-primary)'
            }}
          />
          <p className="text-xs text-center" style={{ color: 'var(--color-text-tertiary)' }}>
            Accent Green
          </p>
        </div>
      </div>

      {/* Typography hierarchy */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Typography Hierarchy
        </h3>
        <div className="space-y-2">
          <p className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Primary text - High contrast (AA+ compliant)
          </p>
          <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
            Secondary text - Medium contrast (AA+ compliant)
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
            Tertiary text - Muted content (AA compliant)
          </p>
        </div>
      </div>

      {/* Button variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Button Variants
        </h3>
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary">Primary Button</button>
          <button className="btn-secondary">Secondary Button</button>
          <button className="btn-accent">Accent Button</button>
          <button className="btn-ghost">Ghost Button</button>
        </div>
      </div>

      {/* Form elements */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Form Elements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Text Input</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter some text..."
            />
          </div>
          <div>
            <label className="form-label">Select</label>
            <select className="form-select">
              <option>Choose an option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Card Components
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-4">
            <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Standard Card
            </h4>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              This is a standard card with proper contrast ratios.
            </p>
          </div>
          <div className="card-hover p-4">
            <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Hover Card
            </h4>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              This card has hover effects with theme-aware styling.
            </p>
          </div>
        </div>
      </div>

      {/* Semantic colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Semantic Colors (Cybersecurity Focus)
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="alignment-score-high">Secure Status</span>
          <span className="alignment-score-medium">Warning Alert</span>
          <span className="alignment-score-low">Threat Detected</span>
        </div>
      </div>
    </div>
  )
}

export default ThemeDemo
'use client'

import { useState, useEffect, useRef } from 'react'
import { Button, Card } from '@/components/ui'

interface BeaconCheckFormProps {
  className?: string
}

export function BeaconCheckForm({ className = '' }: BeaconCheckFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    beacon: '',
    consent: false,
    // Honeypot fields
    website: '',
    phone: '',
    address: '',
    url: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [leadScore, setLeadScore] = useState<{ total: number; grade: string } | null>(null)
  const formStartTimeRef = useRef<number>(Date.now())
  const formRef = useRef<HTMLFormElement>(null)

  // Track form start for analytics
  useEffect(() => {
    formStartTimeRef.current = Date.now()
    
    // Track form view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'beacon_check_start', {
        event_category: 'Form',
        event_label: 'Beacon Check Form'
      })
    }
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }

    if (!formData.beacon.trim()) {
      newErrors.beacon = 'Please enter your beacon to analyze'
    } else if (formData.beacon.trim().length < 10) {
      newErrors.beacon = 'Beacon should be at least 10 characters long'
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to allow us to process your request'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const submissionData = {
        ...formData,
        message: formData.beacon, // Map beacon to message for API compatibility
        type: 'beacon-check',
        timestamp: Date.now(),
        formStartTime: formStartTimeRef.current,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      }

      const response = await fetch('/api/hubspot/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setIsSubmitted(true)
        if (result.leadScore) {
          setLeadScore(result.leadScore)
        }

        // Track successful submission
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'beacon_check_submit', {
            event_category: 'Form',
            event_label: `${formData.company} - ${formData.role}`,
            value: result.leadScore?.total || 0
          })
        }
      } else {
        throw new Error(result.error || 'Submission failed')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      setErrors({ submit: errorMessage })
      
      // Track error
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'beacon_check_error', {
          event_category: 'Form',
          event_label: 'Submission Error'
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (isSubmitted) {
    return (
      <Card variant="elevated" className={`max-w-2xl mx-auto text-center ${className}`}>
        <div className="py-12">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
          >
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Your Beacon Check is Processing
          </h3>
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            We're analyzing your message across multiple AI models. You'll receive 
            detailed results via email within the next few minutes.
          </p>
          <div 
            className="rounded-lg p-4 border"
            style={{
              backgroundColor: 'var(--color-primary-light)',
              borderColor: 'var(--color-primary)'
            }}
          >
            <p className="text-sm" style={{ color: 'var(--color-primary)' }}>
              <strong>Next steps:</strong> Check your email for the complete analysis including 
              alignment scores, blip detection, and optimization recommendations.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card variant="elevated" className={`max-w-2xl mx-auto ${className}`}>
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 flex items-center" style={{ color: 'var(--color-text-primary)' }}>
          <span 
            className="w-3 h-3 rounded-full mr-3 animate-pulse"
            style={{ backgroundColor: 'var(--color-primary)' }}
          />
          Run Your Free Beacon Check
        </h3>
        <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          We'd love to hear from you! Please fill out the form and we'll get back to you as soon as possible.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot fields - hidden from users */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', visibility: 'hidden' }} aria-hidden="true">
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
          />
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="firstName" 
              className="block text-sm font-semibold mb-2"
              style={{ color: 'var(--color-text-primary)' }}
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              className={`form-input ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            />
            {errors.firstName && (
              <p id="firstName-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label 
              htmlFor="lastName" 
              className="block text-sm font-semibold mb-2"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="form-input"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-semibold mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            className={`form-input ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="your.email@company.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            aria-describedby={errors.email ? 'email-error' : 'email-help'}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
          {!errors.email && (
            <p className="mt-2 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
              We'll send your analysis results here
            </p>
          )}
        </div>

        {/* Company and Job Title */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="company" 
              className="block text-sm font-semibold mb-2"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Company *
            </label>
            <input
              type="text"
              id="company"
              className={`form-input ${errors.company ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Your Company"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              aria-describedby={errors.company ? 'company-error' : undefined}
            />
            {errors.company && (
              <p id="company-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.company}
              </p>
            )}
          </div>

          <div>
            <label 
              htmlFor="role" 
              className="block text-sm font-semibold mb-2"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Job Title
            </label>
            <input
              type="text"
              id="role"
              className="form-input"
              placeholder="Your Job Title"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
            />
          </div>
        </div>

        {/* Your Beacon */}
        <div>
          <label 
            htmlFor="beacon" 
            className="block text-sm font-semibold mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Your Beacon *
          </label>
          <textarea
            id="beacon"
            rows={4}
            className={`form-textarea ${errors.beacon ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Enter the marketing message, press release, or content you'd like to analyze..."
            value={formData.beacon}
            onChange={(e) => handleChange('beacon', e.target.value)}
            maxLength={1000}
            aria-describedby={errors.beacon ? 'beacon-error' : 'beacon-help'}
          />
          {errors.beacon && (
            <p id="beacon-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.beacon}
            </p>
          )}
          {!errors.beacon && (
            <p className="mt-2 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
              {formData.beacon.length}/1000 characters
            </p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div>
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => handleChange('consent', e.target.checked)}
              className={`mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 ${
                errors.consent ? 'border-red-500' : ''
              }`}
              aria-describedby={errors.consent ? 'consent-error' : 'consent-help'}
            />
            <div>
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                I agree to allow Narradar to store and process my personal data to provide the analysis results and occasional updates about APO insights. 
                <span className="text-red-500 ml-1">*</span>
              </span>
              {errors.consent && (
                <p id="consent-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.consent}
                </p>
              )}
              {!errors.consent && (
                <p className="mt-1 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  We respect your privacy. No spam, unsubscribe anytime.
                </p>
              )}
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          {errors.submit && (
            <p className="mb-4 text-sm text-red-600 text-center" role="alert">
              {errors.submit}
            </p>
          )}
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting || !formData.consent}
            className="font-semibold"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          
          {leadScore && (
            <div 
              className="mt-4 p-3 rounded-lg border"
              style={{
                backgroundColor: 'var(--color-primary-light)',
                borderColor: 'var(--color-primary)'
              }}
            >
              <p className="text-sm" style={{ color: 'var(--color-primary)' }}>
                <strong>Lead Quality Score:</strong> {leadScore.total}/100 (Grade {leadScore.grade})
              </p>
            </div>
          )}
        </div>
      </form>
    </Card>
  )
}
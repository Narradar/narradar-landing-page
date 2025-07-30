'use client'

import { useState, useEffect, useRef } from 'react'
import { Button, Card } from '@/components/ui'

interface BetaSignupFormProps {
  className?: string
  variant?: 'inline' | 'modal' | 'section'
}

export function BetaSignupForm({ className = '', variant = 'section' }: BetaSignupFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    role: '',
    companySize: '',
    interests: [] as string[],
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

  const interestOptions = [
    { id: 'semantic-drift', label: 'Semantic Drift Detection' },
    { id: 'ai-alignment', label: 'AI Model Alignment' },
    { id: 'brand-consistency', label: 'Brand Consistency' },
    { id: 'content-optimization', label: 'Content Optimization' },
    { id: 'api-integration', label: 'API Integration' },
    { id: 'enterprise-features', label: 'Enterprise Features' }
  ]

  // Track form start for analytics
  useEffect(() => {
    formStartTimeRef.current = Date.now()
    
    // Track form view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'beta_signup_start', {
        event_category: 'Form',
        event_label: 'Beta Signup Form'
      })
    }
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
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
        type: 'beta-signup',
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
          (window as any).gtag('event', 'beta_signup_complete', {
            event_category: 'Form',
            event_label: `${formData.company} - ${formData.companySize}`,
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
        (window as any).gtag('event', 'beta_signup_error', {
          event_category: 'Form',
          event_label: 'Submission Error'
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleInterestToggle = (interestId: string) => {
    const newInterests = formData.interests.includes(interestId)
      ? formData.interests.filter(id => id !== interestId)
      : [...formData.interests, interestId]
    
    handleChange('interests', newInterests)
  }

  if (isSubmitted) {
    const cardClasses = variant === 'inline' ? '' : 'max-w-lg mx-auto'
    
    return (
      <Card variant="elevated" className={`${cardClasses} text-center ${className}`}>
        <div className="py-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Welcome to the Beta!
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thanks for joining our early access program. We'll keep you updated 
            on our progress and notify you as soon as the beta is ready.
          </p>
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <p className="text-sm text-primary-800">
              <strong>What's next:</strong> Look out for early access invitations 
              and exclusive APO insights in your inbox.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  const cardClasses = variant === 'inline' ? '' : 'max-w-lg mx-auto'
  const headerSize = variant === 'section' ? 'text-2xl' : 'text-xl'

  return (
    <Card variant="elevated" className={`${cardClasses} ${className}`}>
      <div className="mb-6">
        <h3 className={`${headerSize} font-bold text-gray-900 mb-3 flex items-center`}>
          <span className="w-3 h-3 bg-accent-500 rounded-full mr-3 animate-pulse" />
          Join the Beta
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Get early access to Narradar's APO platform and help shape the future 
          of AI-optimized marketing.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="firstName" 
              className="block text-sm font-semibold text-gray-900 mb-2"
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
              <p id="firstName-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label 
              htmlFor="lastName" 
              className="block text-sm font-semibold text-gray-900 mb-2"
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

        {/* Email */}
        <div>
          <label 
            htmlFor="beta-email" 
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Work Email *
          </label>
          <input
            type="email"
            id="beta-email"
            className={`form-input ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="john.doe@company.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            aria-describedby={errors.email ? 'beta-email-error' : undefined}
          />
          {errors.email && (
            <p id="beta-email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Company and Role */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="beta-company" 
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Company *
            </label>
            <input
              type="text"
              id="beta-company"
              className={`form-input ${errors.company ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Company Name"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              aria-describedby={errors.company ? 'beta-company-error' : undefined}
            />
            {errors.company && (
              <p id="beta-company-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.company}
              </p>
            )}
          </div>

          <div>
            <label 
              htmlFor="beta-role" 
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Role
            </label>
            <select
              id="beta-role"
              className="form-select"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
            >
              <option value="">Select role</option>
              <option value="CMO">CMO</option>
              <option value="VP Marketing">VP Marketing</option>
              <option value="Marketing Director">Marketing Director</option>
              <option value="Marketing Manager">Marketing Manager</option>
              <option value="Content Manager">Content Manager</option>
              <option value="PR Manager">PR Manager</option>
              <option value="Brand Manager">Brand Manager</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Company Size */}
        <div>
          <label 
            htmlFor="companySize" 
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Company Size
          </label>
          <select
            id="companySize"
            className="form-select"
            value={formData.companySize}
            onChange={(e) => handleChange('companySize', e.target.value)}
          >
            <option value="">Select size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-1000">201-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            What interests you most? (Optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {interestOptions.map((option) => (
              <label key={option.id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={formData.interests.includes(option.id)}
                  onChange={() => handleInterestToggle(option.id)}
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
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
              <span className="text-sm text-gray-700">
                I agree to allow Narradar to store and process my personal data for beta access and occasional updates about our platform. 
                <span className="text-red-500 ml-1">*</span>
              </span>
              {errors.consent && (
                <p id="consent-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.consent}
                </p>
              )}
              {!errors.consent && (
                <p id="consent-help" className="mt-1 text-xs text-gray-500">
                  We respect your privacy. Beta updates only, unsubscribe anytime.
                </p>
              )}
            </div>
          </label>
        </div>

        {/* Submit */}
        <div className="pt-2">
          {errors.submit && (
            <p className="mb-4 text-sm text-red-600 text-center" role="alert">
              {errors.submit}
            </p>
          )}
          
          <Button
            type="submit"
            variant="accent"
            size={variant === 'inline' ? 'md' : 'lg'}
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting || !formData.consent}
            className="font-semibold"
          >
            {isSubmitting ? 'Joining Beta...' : 'Join Early Access'}
          </Button>
          
          {leadScore && (
            <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
              <p className="text-sm text-primary-800">
                <strong>Lead Quality Score:</strong> {leadScore.total}/100 (Grade {leadScore.grade})
              </p>
            </div>
          )}
        </div>
      </form>
    </Card>
  )
}
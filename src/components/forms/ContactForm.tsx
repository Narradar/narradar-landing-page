'use client'

import { useState, useEffect, useRef } from 'react'
import { Button, Card } from '@/components/ui'

interface ContactFormProps {
  className?: string
  variant?: 'inline' | 'modal' | 'section'
  title?: string
  description?: string
}

export function ContactForm({ 
  className = '', 
  variant = 'section',
  title = 'Get in Touch',
  description = 'Have questions about APO or want to learn more? We\'d love to hear from you.'
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    subject: '',
    message: '',
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
      (window as any).gtag('event', 'contact_form_start', {
        event_category: 'Form',
        event_label: 'Contact Form'
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

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long'
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
        type: 'contact',
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
          (window as any).gtag('event', 'contact_form_submit', {
            event_category: 'Form',
            event_label: `${formData.company} - ${formData.subject}`,
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
        (window as any).gtag('event', 'contact_form_error', {
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
    const cardClasses = variant === 'inline' ? '' : 'max-w-2xl mx-auto'
    
    return (
      <Card variant="elevated" className={`${cardClasses} text-center ${className}`}>
        <div className="py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Message Sent Successfully
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for reaching out! We've received your message and will get back 
            to you within 24 hours.
          </p>
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <p className="text-sm text-primary-800">
              <strong>What's next:</strong> A member of our team will review your inquiry 
              and respond with relevant information about APO.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  const cardClasses = variant === 'inline' ? '' : 'max-w-2xl mx-auto'
  const headerSize = variant === 'section' ? 'text-2xl' : 'text-xl'

  return (
    <Card variant="elevated" className={`${cardClasses} ${className}`}>
      <div className="mb-8">
        <h3 className={`${headerSize} font-bold text-gray-900 mb-4 flex items-center`}>
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-3" />
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
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
              htmlFor="contact-firstName" 
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              First Name *
            </label>
            <input
              type="text"
              id="contact-firstName"
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
              htmlFor="contact-lastName" 
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="contact-lastName"
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
            htmlFor="contact-email" 
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="contact-email"
            className={`form-input ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="john.doe@company.com"
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
            <p id="email-help" className="mt-2 text-sm text-gray-500">
              We'll use this to respond to your inquiry
            </p>
          )}
        </div>

        {/* Company and Role */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="contact-company" 
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Company *
            </label>
            <input
              type="text"
              id="contact-company"
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
              htmlFor="contact-role" 
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Role
            </label>
            <select
              id="contact-role"
              className="form-select"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
            >
              <option value="">Select your role</option>
              <option value="CMO">CMO</option>
              <option value="VP Marketing">VP Marketing</option>
              <option value="Marketing Director">Marketing Director</option>
              <option value="Marketing Manager">Marketing Manager</option>
              <option value="Content Manager">Content Manager</option>
              <option value="PR Manager">PR Manager</option>
              <option value="Brand Manager">Brand Manager</option>
              <option value="Consultant">Consultant</option>
              <option value="Agency Owner">Agency Owner</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label 
            htmlFor="contact-subject" 
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Subject *
          </label>
          <select
            id="contact-subject"
            className={`form-select ${errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          >
            <option value="">Select a topic</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Product Demo">Product Demo Request</option>
            <option value="Enterprise Sales">Enterprise Sales</option>
            <option value="Partnership">Partnership Opportunity</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Media Inquiry">Media Inquiry</option>
            <option value="Other">Other</option>
          </select>
          {errors.subject && (
            <p id="subject-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label 
            htmlFor="contact-message" 
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Message *
          </label>
          <textarea
            id="contact-message"
            rows={4}
            className={`form-textarea ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Tell us about your inquiry, specific questions, or how we can help..."
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            maxLength={2000}
            aria-describedby={errors.message ? 'message-error' : 'message-help'}
          />
          {errors.message && (
            <p id="message-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.message}
            </p>
          )}
          {!errors.message && (
            <p id="message-help" className="mt-2 text-sm text-gray-500">
              {formData.message.length}/2000 characters
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
              <span className="text-sm text-gray-700">
                I agree to allow Narradar to store and process my personal data to respond to my inquiry and provide relevant information about APO solutions. 
                <span className="text-red-500 ml-1">*</span>
              </span>
              {errors.consent && (
                <p id="consent-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.consent}
                </p>
              )}
              {!errors.consent && (
                <p id="consent-help" className="mt-1 text-xs text-gray-500">
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
            size={variant === 'inline' ? 'md' : 'lg'}
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting || !formData.consent}
            className="font-semibold"
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
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
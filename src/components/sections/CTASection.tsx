'use client'

import { useState } from 'react'

export function CTASection() {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    role: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ email: '', company: '', role: '', consent: false })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (isSubmitted) {
    return (
      <section id="beacon-check" className="py-16 bg-primary-600">
        <div className="container-narrow text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="heading-md text-gray-900 mb-4">Thank you!</h3>
            <p className="text-gray-600 mb-6">
              We've received your request. Your Drift Report will be delivered to your inbox within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="beacon-check" className="py-16 bg-primary-600">
      <div className="container-narrow">
        <div className="text-center mb-8">
          <h2 className="heading-lg text-white mb-4">
            Run a Beacon Check and get your Drift Report in minutes
          </h2>
          <p className="text-xl text-primary-100">
            See how AI models interpret your message and get actionable insights to improve alignment
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field for spam protection */}
            <input
              type="text"
              name="website"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your Company"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select your role</option>
                <option value="cmo">CMO</option>
                <option value="marketing-director">Marketing Director</option>
                <option value="brand-manager">Brand Manager</option>
                <option value="communications">Communications</option>
                <option value="pr">PR/Public Relations</option>
                <option value="content-marketing">Content Marketing</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                required
                checked={formData.consent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
                I consent to receive the Drift Report and occasional updates about APO insights. 
                You can unsubscribe at any time.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full text-lg py-4"
            >
              {isSubmitting ? 'Submitting...' : 'Get My Drift Report'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our{' '}
              <a href="/legal/privacy" className="text-primary-600 hover:text-primary-700">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/legal/terms" className="text-primary-600 hover:text-primary-700">
                Terms of Service
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
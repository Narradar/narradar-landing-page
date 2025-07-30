import { NextRequest, NextResponse } from 'next/server'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Simple rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 5 // 5 requests per minute

  const record = rateLimitStore.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

// HubSpot form submission function
async function submitToHubSpot(formData: any) {
  const portalId = process.env.HUBSPOT_PORTAL_ID
  const formId = process.env.HUBSPOT_FORM_ID
  
  if (!portalId || !formId) {
    console.warn('HubSpot configuration missing')
    return { success: false, error: 'Configuration error' }
  }

  try {
    const hubspotData = {
      fields: [
        { name: 'email', value: formData.email },
        { name: 'company', value: formData.company },
        { name: 'jobtitle', value: formData.role },
        { name: 'hs_lead_status', value: 'NEW' },
        { name: 'lead_source', value: 'Website - Beacon Check' }
      ],
      context: {
        pageUri: formData.pageUri || 'https://www.narradar.com',
        pageName: 'Beacon Check Form'
      }
    }

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotData),
      }
    )

    if (response.ok) {
      return { success: true }
    } else {
      const errorText = await response.text()
      console.error('HubSpot submission failed:', errorText)
      return { success: false, error: 'Submission failed' }
    }
  } catch (error) {
    console.error('HubSpot submission error:', error)
    return { success: false, error: 'Network error' }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'

    // Check rate limit
    if (!checkRateLimit(ip || 'unknown')) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { email, company, role, consent, website } = body

    // Honeypot check - if 'website' field is filled, it's likely spam
    if (website && website.trim() !== '') {
      console.log('Honeypot triggered:', { ip, website })
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!email || !company || !role || !consent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate consent
    if (!consent) {
      return NextResponse.json(
        { error: 'Consent is required' },
        { status: 400 }
      )
    }

    // Submit to HubSpot
    const hubspotResult = await submitToHubSpot({
      email,
      company,
      role,
      pageUri: request.headers.get('referer') || 'https://www.narradar.com'
    })

    if (hubspotResult.success) {
      // Log successful submission (in production, use proper logging)
      console.log('Lead captured:', { email, company, role, ip, timestamp: new Date().toISOString() })

      return NextResponse.json(
        { 
          success: true, 
          message: 'Thank you! Your Drift Report will be delivered within 24 hours.' 
        },
        { status: 200 }
      )
    } else {
      // Even if HubSpot fails, we might want to store the lead elsewhere
      console.error('HubSpot submission failed but lead captured:', { email, company, role })
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Thank you! Your request has been received.' 
        },
        { status: 200 }
      )
    }

  } catch (error) {
    console.error('Lead capture error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
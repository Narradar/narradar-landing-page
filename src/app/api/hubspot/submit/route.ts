/**
 * Comprehensive HubSpot Form Submission API
 * Features: Rate limiting, spam protection, analytics tracking, GDPR compliance
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHubSpotClient, getFormId, HubSpotContact } from '@/lib/hubspot';
import { 
  createSpamProtection, 
  validateAndSanitizeSubmission,
  FormSubmission 
} from '@/lib/spam-protection';
import { createAnalytics, LeadData, trackServerSideEvent } from '@/lib/analytics';

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5,
};

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://www.narradar.com',
  'https://narradar.com',
  'https://narradar-landing-page.vercel.app',
  process.env.NEXT_PUBLIC_SITE_URL,
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
].filter(Boolean);

/**
 * Get client IP address
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  return (
    cfConnectingIP ||
    realIP ||
    (forwarded ? forwarded.split(',')[0]?.trim() : '') ||
    'unknown'
  );
}

/**
 * Validate CORS
 */
function validateCORS(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  if (!origin && !referer) {
    // Allow requests without origin/referer in development
    return process.env.NODE_ENV === 'development';
  }
  
  const sourceUrl = origin || referer;
  if (!sourceUrl) return false;
  
  try {
    const url = new URL(sourceUrl);
    return ALLOWED_ORIGINS.some(allowed => {
      if (!allowed) return false;
      const allowedUrl = new URL(allowed);
      return url.hostname === allowedUrl.hostname;
    });
  } catch {
    return false;
  }
}

/**
 * Extract UTM parameters from request
 */
function extractUTMFromRequest(request: NextRequest): Record<string, string> {
  const utmParams: Record<string, string> = {};
  const referer = request.headers.get('referer');
  
  if (referer) {
    try {
      const url = new URL(referer);
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
      
      utmKeys.forEach(key => {
        const value = url.searchParams.get(key);
        if (value) {
          utmParams[key] = value;
        }
      });
    } catch {
      // Invalid referer URL
    }
  }
  
  // Also check custom headers
  request.headers.forEach((value, key) => {
    if (key.toLowerCase().startsWith('x-utm-')) {
      const utmKey = key.replace('x-', '').toLowerCase();
      utmParams[utmKey] = value;
    }
  });
  
  return utmParams;
}

/**
 * Main POST handler
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  
  try {
    // Validate CORS
    if (!validateCORS(request)) {
      trackServerSideEvent('form_submit_blocked', 'Security', {
        reason: 'CORS validation failed',
        ip: clientIP,
        origin: request.headers.get('origin'),
        referer,
      });
      
      return NextResponse.json(
        { error: 'Invalid origin' },
        { 
          status: 403,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

    // Initialize services
    const spamProtection = createSpamProtection();
    const analytics = createAnalytics();

    // Basic rate limiting check
    const rateLimitResult = spamProtection.checkRateLimit(clientIP, RATE_LIMIT_CONFIG);
    if (!rateLimitResult.allowed) {
      trackServerSideEvent('form_submit_blocked', 'Security', {
        reason: 'Rate limit exceeded',
        ip: clientIP,
        resetTime: rateLimitResult.resetTime,
      });
      
      return NextResponse.json(
        { 
          error: 'Too many requests. Please wait before submitting again.',
          retryAfter: rateLimitResult.resetTime 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(((rateLimitResult.resetTime || Date.now()) - Date.now()) / 1000).toString(),
          }
        }
      );
    }

    // Advanced rate limiting check
    const advancedRateLimit = spamProtection.checkAdvancedRateLimit(clientIP);
    if (!advancedRateLimit.allowed) {
      trackServerSideEvent('form_submit_blocked', 'Security', {
        reason: 'Advanced rate limit',
        details: advancedRateLimit.reason,
        ip: clientIP,
      });
      
      return NextResponse.json(
        { error: 'Suspicious activity detected. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Extract form type
    const formType = body.type as 'beacon-check' | 'beta-signup' | 'contact';
    if (!formType || !['beacon-check', 'beta-signup', 'contact'].includes(formType)) {
      return NextResponse.json(
        { error: 'Invalid form type' },
        { status: 400 }
      );
    }

    // Sanitize and validate submission
    const sanitizedSubmission: FormSubmission = validateAndSanitizeSubmission({
      ...body,
      timestamp: Date.now(),
      userAgent,
      ip: clientIP,
      referer,
    });

    // Comprehensive spam check
    const spamResult = spamProtection.checkSpam(sanitizedSubmission);
    if (spamResult.isSpam) {
      trackServerSideEvent('form_submit_blocked', 'Security', {
        reason: 'Spam detected',
        spamReason: spamResult.reason,
        confidence: spamResult.confidence,
        ip: clientIP,
        userAgent,
      });
      
      // Return success to avoid revealing spam detection
      return NextResponse.json(
        { success: true, message: 'Thank you for your submission!' },
        { status: 200 }
      );
    }

    // Validate required fields based on form type
    const validationErrors = validateRequiredFields(sanitizedSubmission, formType);
    if (validationErrors.length > 0) {
      trackServerSideEvent('form_submit_error', 'Validation', {
        errors: validationErrors,
        formType,
        ip: clientIP,
      });
      
      return NextResponse.json(
        { error: validationErrors.join(', ') },
        { status: 400 }
      );
    }

    // Extract UTM parameters
    const utmParams = extractUTMFromRequest(request);

    // Prepare lead data for analytics
    const leadData: LeadData = {
      email: sanitizedSubmission.email,
      firstName: sanitizedSubmission.firstName,
      lastName: sanitizedSubmission.lastName,
      company: sanitizedSubmission.company,
      role: sanitizedSubmission.role,
      message: sanitizedSubmission.message,
      utmSource: utmParams.utm_source,
      utmMedium: utmParams.utm_medium,
      utmCampaign: utmParams.utm_campaign,
      utmContent: utmParams.utm_content,
      utmTerm: utmParams.utm_term,
      pageUrl: referer,
      referrer: referer,
    };

    // Add form-specific data
    if (formType === 'beta-signup') {
      const interests = Array.isArray(body.interests) 
        ? body.interests.filter((i: any) => typeof i === 'string')
        : [];
      
      leadData.companySize = sanitizedSubmission.company ? body.companySize : undefined;
      leadData.interests = interests;
    } else if (formType === 'contact') {
      leadData.subject = sanitizedSubmission.subject;
    }

    // Calculate lead score
    const leadScore = analytics.calculateLeadScore(leadData);

    // Prepare HubSpot contact data
    const hubspotContact: HubSpotContact = {
      email: sanitizedSubmission.email,
      firstName: sanitizedSubmission.firstName,
      lastName: sanitizedSubmission.lastName,
      company: sanitizedSubmission.company,
      role: sanitizedSubmission.role,
      message: sanitizedSubmission.message,
      source: `Website - ${formType === 'beacon-check' ? 'Beacon Check' : formType === 'beta-signup' ? 'Beta Signup' : 'Contact Form'}`,
      utmSource: utmParams.utm_source,
      utmMedium: utmParams.utm_medium,
      utmCampaign: utmParams.utm_campaign,
      utmContent: utmParams.utm_content,
      utmTerm: utmParams.utm_term,
      pageUri: referer,
      consent: sanitizedSubmission.consent,
      leadScore: leadScore.total,
    };

    // Add form-specific data to HubSpot contact
    if (formType === 'beta-signup' && leadData.interests) {
      hubspotContact.interests = leadData.interests;
      hubspotContact.companySize = leadData.companySize;
    } else if (formType === 'contact') {
      hubspotContact.subject = leadData.subject;
    }

    // Submit to HubSpot
    let hubspotSuccess = false;
    let hubspotError = '';

    try {
      const hubspotClient = createHubSpotClient();
      const formId = getFormId(formType);
      const hubspotResult = await hubspotClient.submitForm(formId, hubspotContact, formType);
      
      hubspotSuccess = hubspotResult.success;
      if (!hubspotSuccess) {
        hubspotError = hubspotResult.error || 'Unknown HubSpot error';
        console.error('HubSpot submission failed:', hubspotResult);
      }
    } catch (error) {
      hubspotError = error instanceof Error ? error.message : 'HubSpot configuration error';
      console.error('HubSpot error:', error);
    }

    // Track analytics (regardless of HubSpot success)
    analytics.trackFormSubmission(formType, leadData, hubspotSuccess);

    // Track additional events
    trackServerSideEvent('lead_captured', 'Conversion', {
      formType,
      leadScore: leadScore.total,
      leadGrade: leadScore.grade,
      hubspotSuccess,
      processingTime: Date.now() - startTime,
      ip: clientIP,
      company: sanitizedSubmission.company,
      role: sanitizedSubmission.role,
      utmSource: utmParams.utm_source,
    });

    // Prepare success response
    const responseData = {
      success: true,
      message: getSuccessMessage(formType),
      leadScore: {
        total: leadScore.total,
        grade: leadScore.grade,
      },
    };

    // Add debug info in development
    if (process.env.NODE_ENV === 'development') {
      (responseData as any).debug = {
        hubspotSuccess,
        hubspotError: hubspotError || null,
        spamCheck: spamResult,
        leadScoreBreakdown: leadScore.breakdown,
        utmParams,
        processingTime: Date.now() - startTime,
      };
    }

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error('Form submission error:', error);
    
    trackServerSideEvent('form_submit_error', 'System', {
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: clientIP,
      processingTime: Date.now() - startTime,
    });

    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * Validate required fields based on form type
 */
function validateRequiredFields(submission: FormSubmission, formType: 'beacon-check' | 'beta-signup' | 'contact'): string[] {
  const errors: string[] = [];

  // Common validations
  if (!submission.email || !submission.email.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    errors.push('Valid email address is required');
  }

  if (!submission.company || !submission.company.trim()) {
    errors.push('Company name is required');
  }

  // Form-specific validations
  if (formType === 'beacon-check') {
    if (!submission.message || submission.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }
  } else if (formType === 'beta-signup') {
    if (!submission.firstName || !submission.firstName.trim()) {
      errors.push('First name is required');
    }
  } else if (formType === 'contact') {
    if (!submission.firstName || !submission.firstName.trim()) {
      errors.push('First name is required');
    }
    if (!submission.subject || !submission.subject.trim()) {
      errors.push('Subject is required');
    }
    if (!submission.message || submission.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }
  }

  // GDPR consent check
  if (!submission.consent) {
    errors.push('Consent is required to process your request');
  }

  return errors;
}

/**
 * Get success message based on form type
 */
function getSuccessMessage(formType: 'beacon-check' | 'beta-signup' | 'contact'): string {
  if (formType === 'beacon-check') {
    return 'Thank you! Your Beacon Check is being processed. You\'ll receive detailed results via email within the next few minutes.';
  } else if (formType === 'beta-signup') {
    return 'Welcome to the beta! We\'ll keep you updated on our progress and notify you as soon as early access is available.';
  } else {
    return 'Thank you for your message! We\'ll get back to you within 24 hours with relevant information about APO.';
  }
}

/**
 * Handle OPTIONS request for CORS
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

/**
 * Handle other HTTP methods
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
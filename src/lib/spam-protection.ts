/**
 * Comprehensive Spam Protection System
 * Includes honeypots, rate limiting, bot detection, and time-based validation
 */

export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
  confidence: number;
  details?: Record<string, any>;
}

export interface FormSubmission {
  // Visible fields
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  role?: string;
  message?: string;
  subject?: string;
  
  // Honeypot fields (should be empty)
  website?: string;
  phone?: string;
  address?: string;
  url?: string;
  
  // Meta fields
  timestamp?: number;
  userAgent?: string;
  ip?: string;
  referer?: string;
  formStartTime?: number;
  
  // GDPR consent
  consent?: boolean;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

// In-memory rate limiting store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number; violations: number }>();
const submissionTimes = new Map<string, number[]>();

export class SpamProtection {
  private honeypotFields = ['website', 'phone', 'address', 'url'];
  private minFormTime = 3000; // 3 seconds minimum
  private maxFormTime = 3600000; // 1 hour maximum
  private suspiciousUserAgents = [
    'curl/',
    'wget/',
    'python-requests/',
    'postman',
    'insomnia',
    'httpie',
    'bot',
    'crawler',
    'spider',
    'scraper',
  ];

  /**
   * Comprehensive spam check
   */
  checkSpam(submission: FormSubmission): SpamCheckResult {
    const checks = [
      this.checkHoneypots(submission),
      this.checkTimingAttack(submission),
      this.checkUserAgent(submission),
      this.checkEmailFormat(submission),
      this.checkContentQuality(submission),
      this.checkFormCompletionPattern(submission),
    ];

    const spamChecks = checks.filter(check => check.isSpam);
    const totalConfidence = checks.reduce((sum, check) => sum + check.confidence, 0) / checks.length;

    return {
      isSpam: spamChecks.length > 0,
      reason: spamChecks.map(check => check.reason).join('; '),
      confidence: totalConfidence,
      details: {
        checks: checks.map(check => ({
          name: check.reason,
          isSpam: check.isSpam,
          confidence: check.confidence,
        })),
      },
    };
  }

  /**
   * Rate limiting check with sliding window
   */
  checkRateLimit(
    identifier: string,
    config: RateLimitConfig = {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 5,
    }
  ): { allowed: boolean; resetTime?: number; remainingRequests?: number } {
    const now = Date.now();
    const record = rateLimitStore.get(identifier);

    // Clean up expired records
    if (record && now > record.resetTime) {
      rateLimitStore.delete(identifier);
    }

    const currentRecord = rateLimitStore.get(identifier);

    if (!currentRecord) {
      rateLimitStore.set(identifier, {
        count: 1,
        resetTime: now + config.windowMs,
        violations: 0,
      });
      return { allowed: true, remainingRequests: config.maxRequests - 1 };
    }

    if (currentRecord.count >= config.maxRequests) {
      currentRecord.violations++;
      return {
        allowed: false,
        resetTime: currentRecord.resetTime,
        remainingRequests: 0,
      };
    }

    currentRecord.count++;
    return {
      allowed: true,
      remainingRequests: config.maxRequests - currentRecord.count,
    };
  }

  /**
   * Advanced rate limiting with pattern detection
   */
  checkAdvancedRateLimit(ip: string): { allowed: boolean; reason?: string } {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const times = submissionTimes.get(ip) || [];
    
    // Remove old entries
    const recentTimes = times.filter(time => now - time < windowMs);
    
    // Check for rapid-fire submissions (more than 5 in 1 minute)
    if (recentTimes.length >= 5) {
      return { allowed: false, reason: 'Too many submissions in short period' };
    }
    
    // Check for consistent timing pattern (bot behavior)
    if (recentTimes.length >= 3) {
      const intervals = [];
      for (let i = 1; i < recentTimes.length; i++) {
        const current = recentTimes[i];
        const previous = recentTimes[i - 1];
        if (current && previous) {
          intervals.push(current - previous);
        }
      }
      
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length;
      
      // If submissions are too regular (low variance), likely a bot
      if (variance < 1000 && avgInterval < 10000) { // Less than 1 second variance and less than 10 seconds apart
        return { allowed: false, reason: 'Suspicious submission pattern detected' };
      }
    }
    
    // Update submission times
    recentTimes.push(now);
    submissionTimes.set(ip, recentTimes);
    
    return { allowed: true };
  }

  /**
   * Check honeypot fields
   */
  private checkHoneypots(submission: FormSubmission): SpamCheckResult {
    for (const field of this.honeypotFields) {
      const value = (submission as any)[field];
      if (value && value.trim() !== '') {
        return {
          isSpam: true,
          reason: `Honeypot field '${field}' filled`,
          confidence: 0.95,
        };
      }
    }

    return { isSpam: false, reason: 'Honeypot check passed', confidence: 0.1 };
  }

  /**
   * Check for timing attacks
   */
  private checkTimingAttack(submission: FormSubmission): SpamCheckResult {
    if (!submission.timestamp || !submission.formStartTime) {
      return { isSpam: false, reason: 'No timing data', confidence: 0.3 };
    }

    const formCompletionTime = submission.timestamp - submission.formStartTime;

    // Too fast (likely automated)
    if (formCompletionTime < this.minFormTime) {
      return {
        isSpam: true,
        reason: `Form completed too quickly (${formCompletionTime}ms)`,
        confidence: 0.9,
      };
    }

    // Too slow (suspicious)
    if (formCompletionTime > this.maxFormTime) {
      return {
        isSpam: true,
        reason: `Form took too long to complete (${formCompletionTime}ms)`,
        confidence: 0.7,
      };
    }

    return { isSpam: false, reason: 'Timing check passed', confidence: 0.1 };
  }

  /**
   * Check user agent for suspicious patterns
   */
  private checkUserAgent(submission: FormSubmission): SpamCheckResult {
    if (!submission.userAgent) {
      return {
        isSpam: true,
        reason: 'Missing user agent',
        confidence: 0.8,
      };
    }

    const userAgent = submission.userAgent.toLowerCase();

    for (const suspicious of this.suspiciousUserAgents) {
      if (userAgent.includes(suspicious.toLowerCase())) {
        return {
          isSpam: true,
          reason: `Suspicious user agent: ${suspicious}`,
          confidence: 0.9,
        };
      }
    }

    // Check for overly generic user agent
    if (userAgent.length < 20 || !userAgent.includes('mozilla')) {
      return {
        isSpam: true,
        reason: 'Suspicious user agent format',
        confidence: 0.6,
      };
    }

    return { isSpam: false, reason: 'User agent check passed', confidence: 0.1 };
  }

  /**
   * Validate email format and quality
   */
  private checkEmailFormat(submission: FormSubmission): SpamCheckResult {
    const email = submission.email;
    
    // Basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isSpam: true,
        reason: 'Invalid email format',
        confidence: 0.95,
      };
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /^[a-z]{1,3}@[a-z]{1,5}\.(com|net|org)$/i, // Very short names
      /\d{5,}/, // Too many numbers
      /(.)\1{4,}/, // Repeated characters
      /@(10minutemail|guerrillamail|tempmail|throwaway)/i, // Disposable email
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(email)) {
        return {
          isSpam: true,
          reason: 'Suspicious email pattern',
          confidence: 0.8,
        };
      }
    }

    return { isSpam: false, reason: 'Email format check passed', confidence: 0.1 };
  }

  /**
   * Check content quality
   */
  private checkContentQuality(submission: FormSubmission): SpamCheckResult {
    let suspiciousScore = 0;
    const reasons: string[] = [];

    // Check for repeated characters in company name
    if (submission.company) {
      const company = submission.company.toLowerCase();
      if (/(.)\1{3,}/.test(company)) {
        suspiciousScore += 0.3;
        reasons.push('Repeated characters in company name');
      }
      
      // Check for test/dummy data
      const testWords = ['test', 'asdf', 'qwerty', 'example', 'dummy', 'fake'];
      if (testWords.some(word => company.includes(word))) {
        suspiciousScore += 0.4;
        reasons.push('Test data detected in company name');
      }
    }

    // Check message content if available
    if (submission.message) {
      const message = submission.message.toLowerCase();
      
      // Check for spam keywords
      const spamKeywords = ['buy now', 'click here', 'free money', 'guaranteed', 'make money fast'];
      const spamCount = spamKeywords.filter(keyword => message.includes(keyword)).length;
      if (spamCount > 0) {
        suspiciousScore += spamCount * 0.3;
        reasons.push(`Spam keywords detected: ${spamCount}`);
      }
      
      // Check for excessive capitalization
      const caps = (message.match(/[A-Z]/g) || []).length;
      const total = message.length;
      if (total > 20 && caps / total > 0.3) {
        suspiciousScore += 0.2;
        reasons.push('Excessive capitalization');
      }
    }

    if (suspiciousScore > 0.5) {
      return {
        isSpam: true,
        reason: reasons.join('; '),
        confidence: Math.min(suspiciousScore, 0.9),
      };
    }

    return { isSpam: false, reason: 'Content quality check passed', confidence: 0.1 };
  }

  /**
   * Check form completion patterns
   */
  private checkFormCompletionPattern(submission: FormSubmission): SpamCheckResult {
    let suspiciousScore = 0;
    const reasons: string[] = [];

    // Check if required fields are filled with minimal effort
    if (submission.firstName && submission.firstName.length < 2) {
      suspiciousScore += 0.2;
      reasons.push('Suspiciously short first name');
    }

    if (submission.company && submission.company.length < 2) {
      suspiciousScore += 0.3;
      reasons.push('Suspiciously short company name');
    }

    // Check for keyboard walking patterns
    const walkingPatterns = ['qwerty', 'asdf', '1234', 'abcd', 'zxcv'];
    const allText = `${submission.firstName || ''} ${submission.lastName || ''} ${submission.company || ''}`.toLowerCase();
    
    for (const pattern of walkingPatterns) {
      if (allText.includes(pattern)) {
        suspiciousScore += 0.4;
        reasons.push(`Keyboard walking pattern detected: ${pattern}`);
      }
    }

    if (suspiciousScore > 0.4) {
      return {
        isSpam: true,
        reason: reasons.join('; '),
        confidence: Math.min(suspiciousScore, 0.8),
      };
    }

    return { isSpam: false, reason: 'Form completion pattern check passed', confidence: 0.1 };
  }

  /**
   * Clean up old rate limit records
   */
  static cleanup(): void {
    const now = Date.now();
    
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
    
    for (const [ip, times] of submissionTimes.entries()) {
      const recentTimes = times.filter(time => now - time < 60 * 1000);
      if (recentTimes.length === 0) {
        submissionTimes.delete(ip);
      } else {
        submissionTimes.set(ip, recentTimes);
      }
    }
  }
}

/**
 * Sanitize input data to prevent XSS and injection attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data URLs
    .trim()
    .slice(0, 1000); // Limit length
}

/**
 * Validate and sanitize form submission
 */
export function validateAndSanitizeSubmission(submission: any): FormSubmission {
  return {
    email: sanitizeInput(submission.email || ''),
    firstName: sanitizeInput(submission.firstName || ''),
    lastName: sanitizeInput(submission.lastName || ''),
    company: sanitizeInput(submission.company || ''),
    role: sanitizeInput(submission.role || ''),
    message: sanitizeInput(submission.message || ''),
    subject: sanitizeInput(submission.subject || ''),
    
    // Honeypot fields
    website: sanitizeInput(submission.website || ''),
    phone: sanitizeInput(submission.phone || ''),
    address: sanitizeInput(submission.address || ''),
    url: sanitizeInput(submission.url || ''),
    
    // Meta fields
    timestamp: typeof submission.timestamp === 'number' ? submission.timestamp : Date.now(),
    userAgent: sanitizeInput(submission.userAgent || ''),
    ip: sanitizeInput(submission.ip || ''),
    referer: sanitizeInput(submission.referer || ''),
    formStartTime: typeof submission.formStartTime === 'number' ? submission.formStartTime : undefined,
    
    consent: Boolean(submission.consent),
  };
}

/**
 * Generate honeypot HTML fields
 */
export function generateHoneypotFields(): string {
  return `
    <div style="position: absolute; left: -9999px; top: -9999px; visibility: hidden;" aria-hidden="true">
      <input type="text" name="website" value="" tabindex="-1" autocomplete="off" />
      <input type="tel" name="phone" value="" tabindex="-1" autocomplete="off" />
      <input type="text" name="address" value="" tabindex="-1" autocomplete="off" />
      <input type="url" name="url" value="" tabindex="-1" autocomplete="off" />
    </div>
  `;
}

/**
 * Factory function to create spam protection instance
 */
export function createSpamProtection(): SpamProtection {
  return new SpamProtection();
}

// Cleanup old records every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(SpamProtection.cleanup, 5 * 60 * 1000);
}
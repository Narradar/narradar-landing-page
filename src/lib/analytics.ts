/**
 * Analytics and Event Tracking System
 * Supports lead qualification scoring, UTM tracking, and comprehensive event analytics
 */

export interface AnalyticsEvent {
  eventName: string;
  eventCategory: string;
  eventLabel?: string;
  eventValue?: number;
  customParameters?: Record<string, any>;
  timestamp?: number;
  userId?: string;
  sessionId?: string;
}

export interface LeadData {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  role?: string;
  companySize?: string;
  interests?: string[];
  message?: string;
  subject?: string;
  
  // UTM tracking
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  
  // Page context
  pageUrl?: string;
  referrer?: string;
  landingPage?: string;
  
  // Engagement data
  timeOnPage?: number;
  pagesViewed?: number;
  previousVisits?: number;
}

export interface LeadScore {
  total: number;
  breakdown: {
    role: number;
    company: number;
    engagement: number;
    source: number;
    completeness: number;
  };
  grade: 'A' | 'B' | 'C' | 'D';
  reasoning: string[];
}

export class Analytics {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  
  constructor() {
    this.sessionId = this.generateSessionId();
  }

  /**
   * Track form submission events
   */
  trackFormSubmission(
    formType: 'beacon-check' | 'beta-signup' | 'contact',
    lead: LeadData,
    success: boolean = true
  ): void {
    const baseEvent = {
      eventCategory: 'Form',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      customParameters: {
        formType,
        success,
        email: lead.email,
        company: lead.company,
        role: lead.role,
        utmSource: lead.utmSource,
        utmMedium: lead.utmMedium,
        utmCampaign: lead.utmCampaign,
      },
    };

    if (formType === 'beacon-check') {
      this.trackEvent({
        ...baseEvent,
        eventName: success ? 'beacon_check_submit' : 'beacon_check_error',
        eventLabel: `${lead.company} - ${lead.role}`,
        eventValue: this.calculateLeadScore(lead).total,
      });
      
      // Track message analysis request
      if (success && lead.message) {
        this.trackEvent({
          ...baseEvent,
          eventName: 'message_analysis_requested',
          eventCategory: 'Product',
          eventLabel: 'Beacon Check',
          customParameters: {
            ...baseEvent.customParameters,
            messageLength: lead.message.length,
            hasCompanyInfo: Boolean(lead.company),
          },
        });
      }
    } else {
      this.trackEvent({
        ...baseEvent,
        eventName: success ? 'beta_signup_complete' : 'beta_signup_error',
        eventLabel: `${lead.company} - ${lead.companySize}`,
        eventValue: this.calculateLeadScore(lead).total,
        customParameters: {
          ...baseEvent.customParameters,
          companySize: lead.companySize,
          interests: lead.interests?.join(','),
          interestCount: lead.interests?.length || 0,
        },
      });
    }
    
    if (formType === 'contact') {
      this.trackEvent({
        ...baseEvent,
        eventName: success ? 'contact_form_submit' : 'contact_form_error',
        eventLabel: `${lead.company} - ${lead.subject}`,
        eventValue: this.calculateLeadScore(lead).total,
        customParameters: {
          ...baseEvent.customParameters,
          subject: lead.subject,
          hasMessage: Boolean(lead.message),
          messageLength: lead.message?.length || 0,
        },
      });
    }
  }

  /**
   * Track form start events
   */
  trackFormStart(formType: 'beacon-check' | 'beta-signup' | 'contact', utmData?: Record<string, string>): void {
    this.trackEvent({
      eventName: `${formType.replace('-', '_')}_start`,
      eventCategory: 'Form',
      eventLabel: formType,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      customParameters: {
        formType,
        ...utmData,
      },
    });
  }

  /**
   * Track page view events
   */
  trackPageView(page: string, utmData?: Record<string, string>): void {
    this.trackEvent({
      eventName: 'page_view',
      eventCategory: 'Navigation',
      eventLabel: page,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      customParameters: {
        page,
        ...utmData,
      },
    });
  }

  /**
   * Track user engagement
   */
  trackEngagement(action: string, element: string, value?: number): void {
    this.trackEvent({
      eventName: 'user_engagement',
      eventCategory: 'Engagement',
      eventLabel: `${action} - ${element}`,
      eventValue: value,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      customParameters: {
        action,
        element,
      },
    });
  }

  /**
   * Track conversion funnel steps
   */
  trackFunnelStep(
    step: 'landing' | 'form_view' | 'form_start' | 'form_submit' | 'success',
    formType: 'beacon-check' | 'beta-signup' | 'contact'
  ): void {
    this.trackEvent({
      eventName: 'funnel_step',
      eventCategory: 'Conversion',
      eventLabel: `${formType} - ${step}`,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      customParameters: {
        step,
        formType,
      },
    });
  }

  /**
   * Calculate lead qualification score
   */
  calculateLeadScore(lead: LeadData): LeadScore {
    let score = 0;
    const breakdown = {
      role: 0,
      company: 0,
      engagement: 0,
      source: 0,
      completeness: 0,
    };
    const reasoning: string[] = [];

    // Role scoring (0-30 points)
    if (lead.role) {
      const roleScores: Record<string, number> = {
        'CMO': 30,
        'VP Marketing': 25,
        'Marketing Director': 20,
        'Marketing Manager': 15,
        'Brand Manager': 15,
        'Content Manager': 12,
        'PR Manager': 12,
        'Other': 5,
      };
      
      breakdown.role = roleScores[lead.role] || 0;
      score += breakdown.role;
      
      if (breakdown.role >= 20) {
        reasoning.push(`Senior marketing role (${lead.role})`);
      }
    }

    // Company scoring (0-25 points)
    if (lead.company) {
      breakdown.company = 15; // Base score for having company
      score += breakdown.company;
      reasoning.push('Company information provided');

      // Company size bonus
      if (lead.companySize) {
        const sizeScores: Record<string, number> = {
          '1000+': 10,
          '201-1000': 8,
          '51-200': 6,
          '11-50': 4,
          '1-10': 2,
        };
        
        const sizeBonus = sizeScores[lead.companySize] || 0;
        breakdown.company += sizeBonus;
        score += sizeBonus;
        
        if (sizeBonus >= 6) {
          reasoning.push(`Medium to large company (${lead.companySize} employees)`);
        }
      }
    }

    // Engagement scoring (0-20 points)
    if (lead.message && lead.message.length > 50) {
      breakdown.engagement += 10;
      score += 10;
      reasoning.push('Detailed message provided');
    }
    
    if (lead.interests && lead.interests.length > 0) {
      breakdown.engagement += Math.min(lead.interests.length * 2, 10);
      score += Math.min(lead.interests.length * 2, 10);
      reasoning.push(`${lead.interests.length} interests selected`);
    }

    // Source quality scoring (0-15 points)
    if (lead.utmSource) {
      const sourceScores: Record<string, number> = {
        'organic': 15,
        'linkedin': 12,
        'google': 10,
        'twitter': 8,
        'facebook': 6,
        'email': 10,
        'direct': 12,
      };
      
      breakdown.source = sourceScores[lead.utmSource.toLowerCase()] || 5;
      score += breakdown.source;
      
      if (breakdown.source >= 10) {
        reasoning.push(`High-quality traffic source (${lead.utmSource})`);
      }
    }

    // Data completeness scoring (0-10 points)
    const fields = [lead.firstName, lead.lastName, lead.company, lead.role, lead.email];
    const completedFields = fields.filter(field => field && field.trim().length > 0).length;
    breakdown.completeness = (completedFields / fields.length) * 10;
    score += breakdown.completeness;
    
    if (breakdown.completeness >= 8) {
      reasoning.push('Complete profile information');
    }

    // Determine grade
    let grade: 'A' | 'B' | 'C' | 'D';
    if (score >= 70) grade = 'A';
    else if (score >= 50) grade = 'B';
    else if (score >= 30) grade = 'C';
    else grade = 'D';

    return {
      total: Math.round(score),
      breakdown,
      grade,
      reasoning,
    };
  }

  /**
   * Extract UTM parameters from URL or headers
   */
  extractUtmParameters(url?: string, headers?: Record<string, string>): Record<string, string> {
    const utmParams: Record<string, string> = {};
    
    if (url) {
      const urlObj = new URL(url);
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
      
      utmKeys.forEach(key => {
        const value = urlObj.searchParams.get(key);
        if (value) {
          utmParams[key] = value;
        }
      });
    }
    
    // Also check for UTM data in headers (for server-side tracking)
    if (headers) {
      Object.keys(headers).forEach(key => {
        if (key.toLowerCase().startsWith('x-utm-')) {
          const utmKey = key.replace('x-', '').toLowerCase();
          const headerValue = headers[key];
          if (headerValue) {
            utmParams[utmKey] = headerValue;
          }
        }
      });
    }
    
    return utmParams;
  }

  /**
   * Track custom event
   */
  trackEvent(event: AnalyticsEvent): void {
    const enrichedEvent = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      sessionId: event.sessionId || this.sessionId,
    };
    
    this.events.push(enrichedEvent);
    
    // Send to external analytics service (Google Analytics, Mixpanel, etc.)
    this.sendToAnalyticsService(enrichedEvent);
    
    // Log for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', enrichedEvent);
    }
  }

  /**
   * Get analytics summary
   */
  getAnalyticsSummary(): {
    totalEvents: number;
    eventsByCategory: Record<string, number>;
    sessionDuration: number;
    recentEvents: AnalyticsEvent[];
  } {
    const eventsByCategory = this.events.reduce((acc, event) => {
      acc[event.eventCategory] = (acc[event.eventCategory] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sessionStart = Math.min(...this.events.map(e => e.timestamp || 0));
    const sessionEnd = Math.max(...this.events.map(e => e.timestamp || 0));

    return {
      totalEvents: this.events.length,
      eventsByCategory,
      sessionDuration: sessionEnd - sessionStart,
      recentEvents: this.events.slice(-10),
    };
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Send event to external analytics service
   */
  private sendToAnalyticsService(event: AnalyticsEvent): void {
    // Implementation would depend on your analytics provider
    // Examples: Google Analytics 4, Mixpanel, Amplitude, etc.
    
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // Google Analytics 4
      (window as any).gtag('event', event.eventName, {
        event_category: event.eventCategory,
        event_label: event.eventLabel,
        value: event.eventValue,
        custom_parameters: event.customParameters,
      });
    }
    
    // For server-side tracking, you might send to an endpoint
    if (typeof window === 'undefined') {
      // Server-side analytics
      this.sendServerSideEvent(event);
    }
  }

  /**
   * Send server-side analytics event
   */
  private async sendServerSideEvent(event: AnalyticsEvent): Promise<void> {
    try {
      // Example: Send to your analytics endpoint
      if (process.env.ANALYTICS_ENDPOINT) {
        await fetch(process.env.ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.ANALYTICS_API_KEY}`,
          },
          body: JSON.stringify(event),
        });
      }
      
      // Example: Send to Google Analytics Measurement Protocol
      if (process.env.GA4_MEASUREMENT_ID && process.env.GA4_API_SECRET) {
        await this.sendToGA4(event);
      }
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  /**
   * Send event to Google Analytics 4 via Measurement Protocol
   */
  private async sendToGA4(event: AnalyticsEvent): Promise<void> {
    const measurementId = process.env.GA4_MEASUREMENT_ID;
    const apiSecret = process.env.GA4_API_SECRET;
    
    if (!measurementId || !apiSecret) return;

    const clientId = event.userId || event.sessionId || 'anonymous';
    
    const payload = {
      client_id: clientId,
      events: [{
        name: event.eventName,
        params: {
          event_category: event.eventCategory,
          event_label: event.eventLabel,
          value: event.eventValue,
          ...event.customParameters,
        },
      }],
    };

    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
  }
}

/**
 * Factory function to create analytics instance
 */
export function createAnalytics(): Analytics {
  return new Analytics();
}

/**
 * Server-side analytics helper
 */
export function trackServerSideEvent(
  eventName: string,
  eventCategory: string,
  customParameters?: Record<string, any>
): void {
  const analytics = createAnalytics();
  analytics.trackEvent({
    eventName,
    eventCategory,
    customParameters,
    timestamp: Date.now(),
  });
}

/**
 * Lead scoring utility function
 */
export function scoreLead(lead: LeadData): LeadScore {
  const analytics = createAnalytics();
  return analytics.calculateLeadScore(lead);
}
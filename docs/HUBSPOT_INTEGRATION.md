# HubSpot Form Integration Documentation

This document provides comprehensive guidance for setting up and using the HubSpot form integration system for the Narradar landing page.

## Overview

The HubSpot integration provides:
- **Three form types**: Beacon Check, Beta Signup, and Contact forms
- **Server-side processing** with comprehensive validation
- **Honeypot spam protection** with multiple detection methods
- **Rate limiting** to prevent abuse
- **Lead scoring and analytics** tracking
- **Progressive enhancement** (works without JavaScript)
- **GDPR compliance** with explicit consent handling

## Quick Start

### 1. Environment Configuration

Copy `.env.example` to `.env.local` and configure the following variables:

```bash
# Required HubSpot Configuration
HUBSPOT_PORTAL_ID=your_portal_id_here
HUBSPOT_FORM_ID_BEACON=your_beacon_check_form_id_here
HUBSPOT_FORM_ID_BETA=your_beta_signup_form_id_here
HUBSPOT_FORM_ID_CONTACT=your_contact_form_id_here
HUBSPOT_API_KEY=your_private_app_api_key_here

# Optional Analytics Configuration
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=your_ga4_measurement_protocol_secret
ANALYTICS_ENDPOINT=https://your-analytics-endpoint.com/events
ANALYTICS_API_KEY=your_analytics_api_key
```

### 2. HubSpot Setup

#### Step 1: Create HubSpot Forms

1. Log into your HubSpot account
2. Go to Marketing → Lead Capture → Forms
3. Create three separate forms:

**Beacon Check Form Fields:**
- Email (required)
- Company (required)
- Job Title (required)
- Message (required, multi-line text)

**Beta Signup Form Fields:**
- Email (required)
- First Name (required)
- Last Name (optional)
- Company (required)
- Job Title (optional)
- Company Size (dropdown)
- Interests (multiple checkboxes)

**Contact Form Fields:**
- Email (required)
- First Name (required)
- Last Name (optional)
- Company (required)
- Job Title (optional)
- Subject (dropdown)
- Message (required, multi-line text)

#### Step 2: Create HubSpot Private App

1. Go to Settings → Integrations → Private Apps
2. Create a new private app with these scopes:
   - `forms`: Read and write access to forms
   - `crm.objects.contacts.write`: Create and update contacts
   - `crm.objects.contacts.read`: Read contact data

3. Copy the API key to your environment variables

#### Step 3: Get Form IDs

1. Go to each form you created
2. Copy the form ID from the URL or form settings
3. Add these IDs to your environment variables

### 3. Form Usage

Import and use the form components in your React pages:

```tsx
import { BeaconCheckForm, BetaSignupForm, ContactForm } from '@/components/forms'

// Beacon Check Form (Homepage CTA)
<BeaconCheckForm className="max-w-2xl mx-auto" />

// Beta Signup Form (Footer, modals)
<BetaSignupForm variant="inline" className="max-w-lg" />

// Contact Form (Contact page)
<ContactForm 
  title="Contact Our Team"
  description="Get in touch with our APO experts"
  className="max-w-2xl mx-auto"
/>
```

## Technical Architecture

### Server-Side Processing Flow

```
Client Form → /api/hubspot/submit → Validation → Spam Check → HubSpot API → Analytics → Response
```

1. **CORS Validation**: Ensures requests come from allowed origins
2. **Rate Limiting**: Basic and advanced rate limiting with IP tracking
3. **Input Sanitization**: Prevents XSS and injection attacks
4. **Spam Detection**: Multi-layer spam protection
5. **HubSpot Submission**: Robust API integration with retry logic
6. **Analytics Tracking**: Comprehensive event and lead scoring
7. **Response Handling**: Appropriate success/error responses

### Spam Protection System

#### Honeypot Fields
Four invisible fields that should remain empty:
- `website` (text input)
- `phone` (tel input)
- `address` (text input)
- `url` (url input)

#### Detection Methods
- **Timing Analysis**: Forms completed too quickly or slowly
- **User Agent Validation**: Suspicious or missing user agents
- **Content Quality**: Keyboard walking, test data, spam keywords
- **Email Pattern Analysis**: Disposable emails, suspicious formats
- **Rate Limiting**: IP-based submission frequency

#### Rate Limiting
- **Basic**: 5 requests per minute per IP
- **Advanced**: Pattern detection for consistent timing intervals
- **Adaptive**: Increased restrictions for repeated violations

### Lead Scoring Algorithm

Leads are scored 0-100 with the following breakdown:

#### Role Scoring (0-30 points)
- CMO: 30 points
- VP Marketing: 25 points
- Marketing Director: 20 points
- Marketing Manager: 15 points
- Other roles: 5-15 points

#### Company Scoring (0-25 points)
- Base company info: 15 points
- Company size bonus: 2-10 points based on employee count

#### Engagement Scoring (0-20 points)
- Detailed message (>50 chars): 10 points
- Multiple interests selected: 2 points per interest (max 10)

#### Source Quality (0-15 points)
- Organic/Direct: 12-15 points
- LinkedIn: 12 points
- Google: 10 points
- Email: 10 points
- Social media: 6-8 points

#### Data Completeness (0-10 points)
- Complete profile information: 8-10 points
- Partial information: Proportional scoring

#### Lead Grades
- A: 70+ points (High priority)
- B: 50-69 points (Medium priority)
- C: 30-49 points (Low priority)
- D: <30 points (Qualification needed)

### Analytics Events

#### Form Events
- `beacon_check_start` / `beacon_check_submit`
- `beta_signup_start` / `beta_signup_complete`
- `contact_form_start` / `contact_form_submit`

#### Conversion Funnel
- `funnel_step`: Tracks user progression through form flow
- `lead_captured`: Server-side lead capture events
- `form_submit_blocked`: Security and spam prevention events

#### Custom Parameters
- Form type and lead data
- UTM tracking parameters
- Lead score and grade
- Company and role information
- Error tracking and diagnostics

## Testing

### Automated Testing Suite

Run the comprehensive test suite:

```bash
# Install dependencies
npm install

# Run all tests against localhost
npx ts-node src/lib/form-testing.ts

# Run tests against specific URL
npx ts-node src/lib/form-testing.ts --url=https://your-domain.com
```

### Test Categories

#### 1. Form Validation Tests
- Required field validation
- Email format validation
- Message length requirements
- GDPR consent validation

#### 2. Spam Protection Tests
- Honeypot field detection
- Rate limiting functionality
- Suspicious content detection
- Bot behavior patterns

#### 3. Integration Tests
- HubSpot API connectivity
- Form field mapping
- Lead scoring accuracy
- Analytics event tracking

#### 4. Performance Tests
- Response time benchmarks
- Concurrent request handling
- Rate limiting effectiveness

### Manual Testing Checklist

#### Beacon Check Form
- [ ] Form loads without JavaScript
- [ ] All fields validate correctly
- [ ] Honeypot fields are invisible
- [ ] Success message displays properly
- [ ] Lead appears in HubSpot with correct tags
- [ ] Analytics events fire correctly

#### Beta Signup Form
- [ ] Interest checkboxes work
- [ ] Company size dropdown populates
- [ ] Form submits with minimal required fields
- [ ] Optional fields handled correctly
- [ ] Welcome message displays

#### Contact Form
- [ ] Subject dropdown options correct
- [ ] Message validation works
- [ ] Form integrates with HubSpot tickets
- [ ] Response time meets expectations

## Production Deployment

### Environment Setup

1. **Set production environment variables**:
   ```bash
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://www.narradar.com
   ```

2. **Configure HubSpot forms for production**:
   - Update form notification settings
   - Set up automated workflows
   - Configure lead routing rules

3. **Set up monitoring**:
   - Error tracking (Sentry, LogRocket)
   - Performance monitoring (New Relic, DataDog)
   - Uptime monitoring (Pingdom, UptimeRobot)

### Security Considerations

1. **CORS Configuration**: Only allow your domain(s)
2. **Rate Limiting**: Consider using Redis for distributed rate limiting
3. **API Keys**: Store securely and rotate regularly
4. **Input Validation**: All inputs are sanitized server-side
5. **GDPR Compliance**: Consent is explicitly captured and stored

### Performance Optimization

1. **Caching**: Implement Redis for rate limiting and session data
2. **CDN**: Use CDN for static assets and API responses where appropriate
3. **Database**: Consider dedicated database for high-volume form submissions
4. **Monitoring**: Set up alerts for response times and error rates

## Troubleshooting

### Common Issues

#### 1. Forms Not Submitting
- Check network tab for API errors
- Verify environment variables are set
- Confirm HubSpot form IDs are correct
- Check browser console for JavaScript errors

#### 2. HubSpot Integration Failing
- Verify API key permissions
- Check HubSpot form field mapping
- Confirm portal ID is correct
- Review HubSpot API logs

#### 3. Spam Protection Too Aggressive
- Review honeypot field visibility
- Adjust timing thresholds in spam-protection.ts
- Check rate limiting configuration
- Review content quality algorithms

#### 4. Analytics Not Tracking
- Confirm Google Analytics 4 configuration
- Check measurement ID and API secret
- Verify event parameter formatting
- Review browser network requests

### Debug Mode

Enable debug mode in development:

```typescript
// Set in .env.local
NODE_ENV=development

// Check API response for debug information
console.log(response.debug);
```

### Log Analysis

Server-side logs include:
- Spam detection details
- HubSpot API responses
- Rate limiting triggers
- Performance metrics
- Error stack traces

## Maintenance

### Regular Tasks

1. **Monitor form performance** and conversion rates
2. **Review spam detection** accuracy and adjust thresholds
3. **Update HubSpot field mappings** as needed
4. **Rotate API keys** quarterly
5. **Review and update** analytics tracking

### Updates and Changes

1. **Form Field Updates**: Update both frontend components and HubSpot forms
2. **Spam Algorithm Tuning**: Monitor false positives and adjust detection
3. **Rate Limit Adjustments**: Based on legitimate traffic patterns
4. **Analytics Enhancement**: Add new events and parameters as needed

## Support

### Resources
- HubSpot Developer Documentation: https://developers.hubspot.com/
- Google Analytics 4 Documentation: https://developers.google.com/analytics/devguides/collection/ga4
- Next.js API Routes: https://nextjs.org/docs/api-routes/introduction

### Getting Help
- Review server logs for error details
- Use the built-in testing suite for diagnostics
- Check HubSpot activity logs for submission status
- Monitor Google Analytics for event tracking

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Author**: HubSpot Integration Specialist
/**
 * HubSpot API Integration with Enhanced Error Handling and Retry Logic
 * Supports multiple form types, contact management, and comprehensive validation
 */

export interface HubSpotFormField {
  name: string;
  value: string;
}

export interface HubSpotContact {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  role?: string;
  companySize?: string;
  interests?: string[];
  message?: string;
  subject?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  pageUri?: string;
  consent?: boolean;
  leadScore?: number;
}

export interface HubSpotFormSubmission {
  fields: HubSpotFormField[];
  context: {
    pageUri: string;
    pageName: string;
    hutk?: string;
    ipAddress?: string;
  };
  legalConsentOptions?: {
    consent: {
      consentToProcess: boolean;
      text: string;
      communications?: Array<{
        value: boolean;
        subscriptionTypeId: number;
        text: string;
      }>;
    };
  };
}

export interface HubSpotResponse {
  success: boolean;
  data?: any;
  error?: string;
  retryAfter?: number;
}

export class HubSpotClient {
  private portalId: string;
  private apiKey?: string;
  private baseUrl = 'https://api.hsforms.com/submissions/v3/integration/submit';
  private contactsApiUrl = 'https://api.hubapi.com/crm/v3/objects/contacts';
  private maxRetries = 3;
  private retryDelay = 1000; // 1 second

  constructor(portalId: string, apiKey?: string) {
    this.portalId = portalId;
    this.apiKey = apiKey;
  }

  /**
   * Submit form data to HubSpot Forms API with retry logic
   */
  async submitForm(
    formId: string,
    contact: HubSpotContact,
    formType: 'beacon-check' | 'beta-signup' | 'contact' = 'beacon-check'
  ): Promise<HubSpotResponse> {
    const submission = this.prepareFormSubmission(contact, formType);
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await fetch(`${this.baseUrl}/${this.portalId}/${formId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
          },
          body: JSON.stringify(submission),
        });

        if (response.ok) {
          const data = await response.json();
          return { success: true, data };
        }

        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('Retry-After') || '60');
          if (attempt < this.maxRetries) {
            await this.delay(retryAfter * 1000);
            continue;
          }
          return {
            success: false,
            error: 'Rate limit exceeded',
            retryAfter,
          };
        }

        // Handle other client errors
        if (response.status >= 400 && response.status < 500) {
          const errorText = await response.text();
          return {
            success: false,
            error: `Client error: ${response.status} - ${errorText}`,
          };
        }

        // Handle server errors with retry
        if (response.status >= 500 && attempt < this.maxRetries) {
          await this.delay(this.retryDelay * attempt);
          continue;
        }

        const errorText = await response.text();
        return {
          success: false,
          error: `Server error: ${response.status} - ${errorText}`,
        };

      } catch (error) {
        if (attempt < this.maxRetries) {
          await this.delay(this.retryDelay * attempt);
          continue;
        }
        
        return {
          success: false,
          error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        };
      }
    }

    return {
      success: false,
      error: 'Max retries exceeded',
    };
  }

  /**
   * Create or update contact using HubSpot Contacts API
   */
  async createOrUpdateContact(contact: HubSpotContact): Promise<HubSpotResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'API key required for Contacts API',
      };
    }

    const properties = this.mapContactProperties(contact);

    try {
      // Try to create contact first
      const createResponse = await fetch(this.contactsApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ properties }),
      });

      if (createResponse.ok) {
        const data = await createResponse.json();
        return { success: true, data };
      }

      // If contact exists, update instead
      if (createResponse.status === 409) {
        const updateResponse = await fetch(
          `${this.contactsApiUrl}/${encodeURIComponent(contact.email)}?idProperty=email`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({ properties }),
          }
        );

        if (updateResponse.ok) {
          const data = await updateResponse.json();
          return { success: true, data };
        }
      }

      const errorText = await createResponse.text();
      return {
        success: false,
        error: `Contacts API error: ${createResponse.status} - ${errorText}`,
      };

    } catch (error) {
      return {
        success: false,
        error: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Prepare form submission data with proper field mapping
   */
  private prepareFormSubmission(
    contact: HubSpotContact,
    formType: 'beacon-check' | 'beta-signup' | 'contact'
  ): HubSpotFormSubmission {
    const fields: HubSpotFormField[] = [
      { name: 'email', value: contact.email },
    ];

    // Add common fields
    if (contact.firstName) fields.push({ name: 'firstname', value: contact.firstName });
    if (contact.lastName) fields.push({ name: 'lastname', value: contact.lastName });
    if (contact.company) fields.push({ name: 'company', value: contact.company });
    if (contact.role) fields.push({ name: 'jobtitle', value: contact.role });

    // Add form-specific fields
    if (formType === 'beacon-check') {
      fields.push({ name: 'hs_lead_status', value: 'NEW' });
      fields.push({ name: 'lead_source', value: 'Website - Beacon Check' });
      if (contact.message) {
        fields.push({ name: 'message', value: contact.message });
      }
    } else if (formType === 'beta-signup') {
      fields.push({ name: 'hs_lead_status', value: 'OPEN' });
      fields.push({ name: 'lead_source', value: 'Website - Beta Signup' });
      if (contact.companySize) {
        fields.push({ name: 'numemployees', value: contact.companySize });
      }
      if (contact.interests && contact.interests.length > 0) {
        fields.push({ name: 'interests', value: contact.interests.join(';') });
      }
    } else if (formType === 'contact') {
      fields.push({ name: 'hs_lead_status', value: 'NEW' });
      fields.push({ name: 'lead_source', value: 'Website - Contact Form' });
      if (contact.subject) {
        fields.push({ name: 'subject', value: contact.subject });
      }
      if (contact.message) {
        fields.push({ name: 'message', value: contact.message });
      }
    }

    // Add UTM parameters
    if (contact.utmSource) fields.push({ name: 'hs_analytics_source', value: contact.utmSource });
    if (contact.utmMedium) fields.push({ name: 'hs_analytics_source_data_1', value: contact.utmMedium });
    if (contact.utmCampaign) fields.push({ name: 'hs_analytics_source_data_2', value: contact.utmCampaign });

    // Add lead scoring
    if (contact.leadScore !== undefined) {
      fields.push({ name: 'hs_lead_score', value: contact.leadScore.toString() });
    }

    const submission: HubSpotFormSubmission = {
      fields,
      context: {
        pageUri: contact.pageUri || 'https://www.narradar.com',
        pageName: formType === 'beacon-check' ? 'Beacon Check Form' : formType === 'beta-signup' ? 'Beta Signup Form' : 'Contact Form',
      },
    };

    // Add legal consent if provided
    if (contact.consent) {
      submission.legalConsentOptions = {
        consent: {
          consentToProcess: true,
          text: 'I agree to allow Narradar to store and process my personal data.',
          communications: [
            {
              value: true,
              subscriptionTypeId: 999, // Replace with actual subscription type ID
              text: 'I agree to receive marketing communications from Narradar.',
            },
          ],
        },
      };
    }

    return submission;
  }

  /**
   * Map contact data to HubSpot contact properties
   */
  private mapContactProperties(contact: HubSpotContact): Record<string, string> {
    const properties: Record<string, string> = {
      email: contact.email,
    };

    if (contact.firstName) properties.firstname = contact.firstName;
    if (contact.lastName) properties.lastname = contact.lastName;
    if (contact.company) properties.company = contact.company;
    if (contact.role) properties.jobtitle = contact.role;
    if (contact.companySize) properties.numemployees = contact.companySize;
    if (contact.source) properties.hs_lead_source = contact.source;
    if (contact.utmSource) properties.hs_analytics_source = contact.utmSource;
    if (contact.utmMedium) properties.hs_analytics_source_data_1 = contact.utmMedium;
    if (contact.utmCampaign) properties.hs_analytics_source_data_2 = contact.utmCampaign;
    if (contact.leadScore !== undefined) properties.hs_lead_score = contact.leadScore.toString();
    if (contact.interests && contact.interests.length > 0) {
      properties.interests = contact.interests.join(';');
    }

    return properties;
  }

  /**
   * Utility function to add delay for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Validate HubSpot configuration
   */
  static validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!process.env.HUBSPOT_PORTAL_ID) {
      errors.push('HUBSPOT_PORTAL_ID is required');
    }

    if (!process.env.HUBSPOT_FORM_ID_BEACON && !process.env.HUBSPOT_FORM_ID_BETA) {
      errors.push('At least one form ID is required (HUBSPOT_FORM_ID_BEACON or HUBSPOT_FORM_ID_BETA)');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Factory function to create HubSpot client with environment configuration
 */
export function createHubSpotClient(): HubSpotClient {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const apiKey = process.env.HUBSPOT_API_KEY;

  if (!portalId) {
    throw new Error('HUBSPOT_PORTAL_ID environment variable is required');
  }

  return new HubSpotClient(portalId, apiKey);
}

/**
 * Get form ID based on form type
 */
export function getFormId(formType: 'beacon-check' | 'beta-signup' | 'contact'): string {
  let formId: string | undefined;
  
  switch (formType) {
    case 'beacon-check':
      formId = process.env.HUBSPOT_FORM_ID_BEACON;
      break;
    case 'beta-signup':
      formId = process.env.HUBSPOT_FORM_ID_BETA;
      break;
    case 'contact':
      formId = process.env.HUBSPOT_FORM_ID_CONTACT;
      break;
    default:
      throw new Error(`Unknown form type: ${formType}`);
  }

  if (!formId) {
    throw new Error(`Form ID not configured for ${formType}`);
  }

  return formId;
}
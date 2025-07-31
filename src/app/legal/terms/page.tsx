import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Narradar', 
  description: 'Narradar terms of service governing the use of our Agent Perception Optimization platform.',
  alternates: {
    canonical: '/legal/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-narrow">
        <h1 className="heading-xl text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> June 1, 2025
          </p>

          <p>
            These Terms of Service ("Terms") govern your use of the Narradar Agent Perception Optimization 
            platform and related services ("Services") provided by Narradar ("we," "us," or "our").
          </p>

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree 
            to these Terms, please do not use our Services.
          </p>

          <h2>Description of Services</h2>
          <p>
            Narradar provides Agent Perception Optimization (APO) services, including:
          </p>
          <ul>
            <li>Content analysis across multiple AI models</li>
            <li>Semantic drift detection and measurement</li> 
            <li>Alignment scoring and reporting</li>
            <li>Optimization recommendations</li>
            <li>Ongoing monitoring services</li>
          </ul>

          <h2>User Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Use the Services only for lawful purposes</li>
            <li>Not submit harmful, offensive, or infringing content</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>

          <h2>Content and Intellectual Property</h2>
          <h3>Your Content</h3>
          <p>
            You retain ownership of content you submit to our Services. By submitting content, you grant us 
            a limited license to process, analyze, and generate reports for your use.
          </p>

          <h3>Our Content</h3>
          <p>
            Our Services, including reports, analyses, and recommendations, are proprietary to Narradar. 
            You may use our reports for your internal business purposes but may not redistribute or 
            commercialize them without permission.
          </p>

          <h2>Privacy and Data Protection</h2>
          <p>
            Your privacy is important to us. Our collection and use of personal information is governed 
            by our Privacy Policy, which is incorporated into these Terms by reference.
          </p>

          <h2>Service Availability</h2>
          <p>
            We strive to maintain high service availability but cannot guarantee uninterrupted access. 
            We reserve the right to modify, suspend, or discontinue Services with reasonable notice.
          </p>

          <h2>Pricing and Payment</h2>
          <ul>
            <li>Pricing for Services is as displayed on our website or as agreed in writing</li>
            <li>Payment is due according to the terms specified in your service agreement</li>
            <li>We reserve the right to change pricing with 30 days notice</li>
            <li>Refunds are subject to our refund policy</li>
          </ul>

          <h2>Limitations of Liability</h2>
          <p>
            To the maximum extent permitted by law, Narradar shall not be liable for any indirect, 
            incidental, special, or consequential damages arising from your use of our Services.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Narradar from any claims, damages, or expenses 
            arising from your use of our Services or violation of these Terms.
          </p>

          <h2>Termination</h2>
          <p>
            Either party may terminate these Terms at any time. Upon termination, your access to 
            the Services will cease, and we will delete your data according to our retention policy.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of [Jurisdiction] without regard to conflict of law principles.
          </p>

          <h2>Changes to Terms</h2>  
          <p>
            We may update these Terms periodically. We will notify you of material changes via email 
            or platform notification at least 30 days before they take effect.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about these Terms, please contact us at:
          </p>
          <p>
            Email: legal@narradar.com<br />
            Address: [Company Address]
          </p>
        </div>
      </div>
    </div>
  )
}
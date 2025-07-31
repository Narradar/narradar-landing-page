import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Narradar',
  description: 'Narradar privacy policy explaining how we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/legal/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="bg-white py-16">
      <div className="container-narrow">
        <h1 className="heading-xl text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> June 1, 2025
          </p>

          <p>
            This Privacy Policy describes how Narradar ("we," "us," or "our") collects, uses, and protects 
            your personal information when you use our Agent Perception Optimization platform and related services.
          </p>

          <h2>Information We Collect</h2>
          
          <h3>Information You Provide</h3>
          <ul>
            <li>Contact information (name, email address, company)</li>
            <li>Account information (username, password)</li>
            <li>Content you submit for analysis (press releases, marketing copy, etc.)</li>
            <li>Communication preferences and consent records</li>
          </ul>

          <h3>Information We Collect Automatically</h3>
          <ul>
            <li>Usage data and analytics</li>
            <li>Device and browser information</li>
            <li>IP address and location data</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>Provide and improve our APO services</li>
            <li>Analyze content and generate drift reports</li>
            <li>Communicate with you about our services</li>
            <li>Send requested reports and updates</li>
            <li>Ensure platform security and prevent fraud</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, rent, or share your personal information with third parties except:
          </p>
          <ul>
            <li>With your explicit consent</li>
            <li>To provide requested services (e.g., AI model analysis)</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement enterprise-grade security measures including:
          </p>
          <ul>
            <li>End-to-end encryption for all data transmission</li>
            <li>Secure cloud storage with access controls</li>
            <li>Regular security audits and compliance reviews</li>
            <li>SOC 2 Type II certification</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We retain your information only as long as necessary to provide services and comply with legal obligations. 
            Content submitted for analysis is processed and then securely deleted within 30 days unless you request longer retention.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your information</li>
            <li>Opt out of marketing communications</li>
            <li>Data portability</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar technologies to improve your experience, analyze usage, and provide personalized content. 
            You can control cookie preferences through your browser settings.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you of significant changes via email or 
            platform notification.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: privacy@narradar.com<br />
            Address: [Company Address]
          </p>
        </div>
      </div>
    </div>
  )
}
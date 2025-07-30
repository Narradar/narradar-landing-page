import Link from 'next/link'
import { Button } from '@/components/ui'

const footerNavigation = {
  platform: [
    { name: 'Agent Perception Optimization', href: '/apo', description: 'Core APO platform' },
    { name: 'How it Works', href: '/how-it-works', description: 'Learn about our process' },
    { name: 'Beacon Check', href: '#beacon-check', description: 'Free message analysis' },
    { name: 'Pricing', href: '/pricing', description: 'Plans and pricing' },
  ],
  resources: [
    { name: 'Blog', href: '/blog', description: 'APO insights and updates' },
    { name: 'Documentation', href: '/docs', description: 'Technical guides' },
    { name: 'Case Studies', href: '/blog?category=case-studies', description: 'Success stories' },
    { name: 'API Reference', href: '/docs/api', description: 'Developer resources' },
  ],
  company: [
    { name: 'About Narradar', href: '/about', description: 'Our mission and team' },
    { name: 'Contact Us', href: '/contact', description: 'Get in touch' },
    { name: 'Careers', href: '/careers', description: 'Join our team' },
    { name: 'Press Kit', href: '/press', description: 'Media resources' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy', description: 'How we protect your data' },
    { name: 'Terms of Service', href: '/legal/terms', description: 'Service terms' },
    { name: 'Security', href: '/security', description: 'Security practices' },
    { name: 'Compliance', href: '/compliance', description: 'Regulatory compliance' },
  ],
}

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/narradar',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/narradar',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19.338 19.338H16.67V15.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H11.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM8.005 9.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H9.34v-8.59H6.667v8.59zM20.668 4H3.328C2.595 4 2 4.581 2 5.298v15.403C2 21.418 2.595 22 3.328 22h17.34c.734 0 1.332-.582 1.332-1.299V5.298C22 4.581 21.402 4 20.668 4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/narradar',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      
      {/* Newsletter/CTA Section */}
      <div className="border-b border-gray-800">
        <div className="container-wide py-12 lg:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="heading-md text-white mb-4">
              Stay ahead of AI perception shifts
            </h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Get insights on semantic drift, APO strategies, and AI model updates 
              delivered to your inbox monthly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your.email@company.com"
                className="form-input bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary-400 focus:ring-primary-400"
                aria-label="Email address for newsletter"
              />
              <Button 
                variant="primary" 
                className="whitespace-nowrap px-6"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              No spam. Unsubscribe anytime. SOC 2 Type II compliant.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <span className="text-2xl font-bold text-white">Narradar</span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                The first Agent Perception Optimization platform. Control your narrative 
                in the AI multiverse and maintain brand consistency across all AI interpretations.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 py-6 border-t border-gray-800">
              <div>
                <div className="text-2xl font-bold text-primary-400">4+</div>
                <div className="text-sm text-gray-400">AI Models</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-400">15+</div>
                <div className="text-sm text-gray-400">Blip Types</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-400">99%</div>
                <div className="text-sm text-gray-400">Accuracy</div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">
                Follow our journey
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${item.name}`}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation Columns */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerNavigation).map(([category, links]) => (
                <div key={category}>
                  <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">
                    {category === 'platform' ? 'Platform' : 
                     category === 'resources' ? 'Resources' :
                     category === 'company' ? 'Company' : 'Legal'}
                  </h3>
                  <ul role="list" className="space-y-4">
                    {links.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="group text-sm text-gray-400 hover:text-primary-300 transition-colors duration-200"
                          title={item.description}
                        >
                          <span className="group-hover:underline">
                            {item.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} Narradar, Inc. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>SOC 2 Type II Compliant</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link 
                href="/status" 
                className="text-gray-400 hover:text-primary-300 transition-colors flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                System Status
              </Link>
              <Link 
                href="/changelog" 
                className="text-gray-400 hover:text-primary-300 transition-colors"
              >
                Changelog
              </Link>
              <Link 
                href="/support" 
                className="text-gray-400 hover:text-primary-300 transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
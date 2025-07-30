/**
 * Comprehensive Structured Data Components for SEO and GEO optimization
 * Implements JSON-LD schema markup for enhanced AI agent understanding
 */

interface BaseStructuredData {
  '@context': string
  '@type': string
}

interface OrganizationSchema extends BaseStructuredData {
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  sameAs: string[]
  contactPoint: {
    '@type': 'ContactPoint'
    contactType: string
    availableLanguage: string
  }
  address?: {
    '@type': 'PostalAddress'
    addressCountry: string
    addressRegion?: string
    addressLocality?: string
  }
}

interface WebSiteSchema extends BaseStructuredData {
  '@type': 'WebSite'
  name: string
  url: string
  potentialAction: {
    '@type': 'SearchAction'
    target: {
      '@type': 'EntryPoint'
      urlTemplate: string
    }
    'query-input': string
  }
}

interface BreadcrumbSchema extends BaseStructuredData {
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

interface ArticleSchema extends BaseStructuredData {
  '@type': 'Article'
  headline: string
  description: string
  author: {
    '@type': 'Organization' | 'Person'
    name: string
  }
  publisher: {
    '@type': 'Organization'
    name: string
    logo: {
      '@type': 'ImageObject'
      url: string
    }
  }
  datePublished: string
  dateModified: string
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
  image?: {
    '@type': 'ImageObject'
    url: string
    width: number
    height: number
  }
}

interface QAPageSchema extends BaseStructuredData {
  '@type': 'QAPage'
  mainEntity: {
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }
}

interface FAQPageSchema extends BaseStructuredData {
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

interface SoftwareApplicationSchema extends BaseStructuredData {
  '@type': 'SoftwareApplication'
  name: string
  applicationCategory: string
  operatingSystem: string
  description: string
  url: string
  author: {
    '@type': 'Organization'
    name: string
  }
  offers?: {
    '@type': 'Offer'
    price: string
    priceCurrency: string
  }
}

interface HowToSchema extends BaseStructuredData {
  '@type': 'HowTo'
  name: string
  description: string
  step: Array<{
    '@type': 'HowToStep'
    name: string
    text: string
  }>
  totalTime?: string
  estimatedCost?: {
    '@type': 'MonetaryAmount'
    currency: string
    value: string
  }
}

// Component Props
interface StructuredDataProps {
  data: BaseStructuredData | BaseStructuredData[]
}

/**
 * Generic Structured Data Component
 */
export function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data]
  
  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
    </>
  )
}

/**
 * Organization Schema Component
 */
interface OrganizationStructuredDataProps {
  name: string
  url: string
  logo: string
  description: string
  sameAs?: string[]
  contactType?: string
  address?: {
    country: string
    region?: string
    locality?: string
  }
}

export function OrganizationStructuredData({
  name,
  url,
  logo,
  description,
  sameAs = [],
  contactType = 'customer service',
  address
}: OrganizationStructuredDataProps) {
  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType,
      availableLanguage: 'English'
    }
  }
  
  if (address) {
    schema.address = {
      '@type': 'PostalAddress',
      addressCountry: address.country,
      addressRegion: address.region,
      addressLocality: address.locality
    }
  }
  
  return <StructuredData data={schema} />
}

/**
 * Website Schema Component
 */
interface WebSiteStructuredDataProps {
  name: string
  url: string
  searchUrl?: string
}

export function WebSiteStructuredData({
  name,
  url,
  searchUrl = `${url}/search?q={search_term_string}`
}: WebSiteStructuredDataProps) {
  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl
      },
      'query-input': 'required name=search_term_string'
    }
  }
  
  return <StructuredData data={schema} />
}

/**
 * Breadcrumb Schema Component
 */
interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const schema: BreadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
  
  return <StructuredData data={schema} />
}

/**
 * Article Schema Component
 */
interface ArticleStructuredDataProps {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  author?: string
  publisher?: string
  publisherLogo?: string
  image?: {
    url: string
    width: number
    height: number
  }
}

export function ArticleStructuredData({
  headline,
  description,
  url,
  datePublished,
  dateModified = datePublished,
  author = 'Narradar',
  publisher = 'Narradar',
  publisherLogo = '/images/logo.svg',
  image
}: ArticleStructuredDataProps) {
  const schema: ArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: {
      '@type': 'Organization',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: publisher,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo
      }
    },
    datePublished,
    dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  }
  
  if (image) {
    schema.image = {
      '@type': 'ImageObject',
      url: image.url,
      width: image.width,
      height: image.height
    }
  }
  
  return <StructuredData data={schema} />
}

/**
 * FAQ Page Schema Component
 */
interface FAQStructuredDataProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  const schema: FAQPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
  
  return <StructuredData data={schema} />
}

/**
 * Q&A Page Schema Component
 */
interface QAPageStructuredDataProps {
  question: string
  answer: string
}

export function QAPageStructuredData({ question, answer }: QAPageStructuredDataProps) {
  const schema: QAPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    }
  }
  
  return <StructuredData data={schema} />
}

/**
 * Software Application Schema Component
 */
interface SoftwareApplicationStructuredDataProps {
  name: string
  description: string
  url: string
  applicationCategory?: string
  operatingSystem?: string
  author?: string
  price?: string
  priceCurrency?: string
}

export function SoftwareApplicationStructuredData({
  name,
  description,
  url,
  applicationCategory = 'BusinessApplication',
  operatingSystem = 'Web Browser',
  author = 'Narradar',
  price,
  priceCurrency = 'USD'
}: SoftwareApplicationStructuredDataProps) {
  const schema: SoftwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory,
    operatingSystem,
    description,
    url,
    author: {
      '@type': 'Organization',
      name: author
    }
  }
  
  if (price) {
    schema.offers = {
      '@type': 'Offer',
      price,
      priceCurrency
    }
  }
  
  return <StructuredData data={schema} />
}

/**
 * How-To Schema Component
 */
interface HowToStructuredDataProps {
  name: string
  description: string
  steps: Array<{
    name: string
    text: string
  }>
  totalTime?: string
  estimatedCost?: {
    currency: string
    value: string
  }
}

export function HowToStructuredData({
  name,
  description,
  steps,
  totalTime,
  estimatedCost
}: HowToStructuredDataProps) {
  const schema: HowToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map(step => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text
    }))
  }
  
  if (totalTime) {
    schema.totalTime = totalTime
  }
  
  if (estimatedCost) {
    schema.estimatedCost = {
      '@type': 'MonetaryAmount',
      currency: estimatedCost.currency,
      value: estimatedCost.value
    }
  }
  
  return <StructuredData data={schema} />
}

// Export all components and types
export type {
  OrganizationSchema,
  WebSiteSchema,
  BreadcrumbSchema,
  ArticleSchema,
  QAPageSchema,
  FAQPageSchema,
  SoftwareApplicationSchema,
  HowToSchema
}
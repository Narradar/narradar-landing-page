export interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  category: 'Insights' | 'Case Studies' | 'Research'
  tags: string[]
  author: {
    name: string
    title: string
    bio?: string
  }
  readTime: string
  excerpt: string
  featured?: boolean
  draft?: boolean
  seoTitle?: string
  seoDescription?: string
  canonicalUrl?: string
  sources?: Array<{
    title: string
    url: string
    description?: string
  }>
  keyFacts?: Array<{
    fact: string
    source?: string
  }>
  summary?: string
  evergreenSummary?: string
}

export interface BlogPostMeta extends BlogPost {
  content?: string
}

export interface BlogCategory {
  name: string
  slug: string
  description: string
  count: number
}

export interface BlogTag {
  name: string
  slug: string
  count: number
}

export interface BlogMetrics {
  totalPosts: number
  totalCategories: number
  totalTags: number
  avgReadTime: number
  lastUpdated: string
}
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost, BlogPostMeta, BlogCategory, BlogTag } from '@/types/blog'

const POSTS_DIRECTORY = path.join(process.cwd(), 'src/content/blog')

// Ensure the blog directory exists
if (!fs.existsSync(POSTS_DIRECTORY)) {
  fs.mkdirSync(POSTS_DIRECTORY, { recursive: true })
}

export function getAllPosts(): BlogPostMeta[] {
  try {
    const fileNames = fs.readdirSync(POSTS_DIRECTORY)
    const posts = fileNames
      .filter(name => name.endsWith('.mdx'))
      .map(fileName => {
        const filePath = path.join(POSTS_DIRECTORY, fileName)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        
        const slug = fileName.replace(/\.mdx$/, '')
        
        return {
          slug,
          content,
          ...data
        } as BlogPostMeta
      })
      .filter(post => !post.draft || process.env.NODE_ENV === 'development')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return posts
  } catch (error) {
    console.warn('Error reading blog posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPostMeta | null {
  try {
    const filePath = path.join(POSTS_DIRECTORY, `${slug}.mdx`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      content,
      ...data
    } as BlogPostMeta
  } catch (error) {
    console.warn(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  )
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => 
    post.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllCategories(): BlogCategory[] {
  const posts = getAllPosts()
  const categoryMap = new Map<string, number>()
  
  posts.forEach(post => {
    const category = post.category
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
  })
  
  const categories: BlogCategory[] = [
    {
      name: 'All',
      slug: 'all',
      description: 'All blog posts',
      count: posts.length
    }
  ]
  
  Array.from(categoryMap.entries()).forEach(([name, count]) => {
    categories.push({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      description: `Posts in the ${name} category`,
      count
    })
  })
  
  return categories
}

export function getAllTags(): BlogTag[] {
  const posts = getAllPosts()
  const tagMap = new Map<string, number>()
  
  posts.forEach(post => {
    post.tags?.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })
  
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count
    }))
    .sort((a, b) => b.count - a.count)
}

export function getRelatedPosts(currentPost: BlogPostMeta, limit = 3): BlogPostMeta[] {
  const allPosts = getAllPosts().filter(post => post.slug !== currentPost.slug)
  
  // Score posts based on shared tags and category
  const scoredPosts = allPosts.map(post => {
    let score = 0
    
    // Same category gets higher score
    if (post.category === currentPost.category) {
      score += 10
    }
    
    // Shared tags get points
    const sharedTags = post.tags?.filter(tag => 
      currentPost.tags?.includes(tag)
    ) || []
    score += sharedTags.length * 5
    
    return { post, score }
  })
  
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
}

export function generateBlogSitemap(): string {
  const posts = getAllPosts()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.narradar.com'
  
  const urls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.8 : 0.6
  }))
  
  // Add blog index page
  urls.unshift({
    url: `${baseUrl}/blog`,
    lastModified: posts[0]?.publishedAt || new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  })
  
  return urls.map(item => `
    <url>
      <loc>${item.url}</loc>
      <lastmod>${item.lastModified}</lastmod>
      <changefreq>${item.changeFrequency}</changefreq>
      <priority>${item.priority}</priority>
    </url>
  `).join('')
}

export function generateRssFeed(): string {
  const posts = getAllPosts().slice(0, 20) // Last 20 posts
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.narradar.com'
  const now = new Date().toUTCString()
  
  const rssItems = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      <author>hello@narradar.com (Narradar Team)</author>
    </item>
  `).join('')
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Narradar Blog - Agent Perception Optimization Insights</title>
    <description>Latest insights on Agent Perception Optimization, semantic drift, and AI brand monitoring from Narradar.</description>
    <link>${baseUrl}/blog</link>
    <language>en-us</language>
    <managingEditor>hello@narradar.com (Narradar Team)</managingEditor>
    <webMaster>hello@narradar.com (Narradar Team)</webMaster>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const readTime = Math.ceil(words / wordsPerMinute)
  return `${readTime} min read`
}

export function extractExcerpt(content: string, maxLength = 160): string {
  // Remove MDX/markdown syntax and get plain text
  const plainText = content
    .replace(/^---[\s\S]*?---/m, '') // Remove frontmatter
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()
  
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  return plainText.substring(0, maxLength).replace(/\s+\w*$/, '') + '...'
}
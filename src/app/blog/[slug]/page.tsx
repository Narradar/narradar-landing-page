import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog'
import { BlogPostContent, RelatedPosts, CallToAction } from '@/components/blog'
import { MDXComponents } from '@/components/blog/MDXComponents'
import { ArticleStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Narradar Blog',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: post.seoTitle || `${post.title} - Narradar Blog`,
    description: post.seoDescription || post.description,
    alternates: {
      canonical: post.canonicalUrl || `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.narradar.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author?.name || 'Narradar Team'],
      tags: post.tags,
      images: [{
        url: `/images/blog/${slug}-og.jpg`,
        width: 1200,
        height: 630,
        alt: post.title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`/images/blog/${slug}-og.jpg`]
    }
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const relatedPosts = getRelatedPosts(post, 3)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.narradar.com'
  const postUrl = `${baseUrl}/blog/${slug}`

  return (
    <>
      {/* Structured Data */}
      <ArticleStructuredData
        headline={post.title}
        description={post.description}
        url={postUrl}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt || post.publishedAt}
        author={post.author?.name || 'Narradar Team'}
        publisher="Narradar"
        publisherLogo={`${baseUrl}/images/logo.svg`}
        image={{
          url: `${baseUrl}/images/blog/${slug}-og.jpg`,
          width: 1200,
          height: 630
        }}
      />
      
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Blog', url: `${baseUrl}/blog` },
          { name: post.title, url: postUrl }
        ]}
      />

      <BlogPostContent post={post}>
        <MDXRemote 
          source={post.content || ''} 
          components={MDXComponents}
        />
      </BlogPostContent>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <RelatedPosts posts={relatedPosts} currentPostSlug={slug} />
      )}

      {/* CTA */}
      <CallToAction variant="default" />

      {/* Back to Blog Navigation */}
      <footer className="py-16 bg-gray-50">
        <div className="container-narrow">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="btn-secondary group"
            >
              <span className="mr-2 group-hover:-translate-x-0.5 transition-transform">←</span>
              Back to Blog
            </Link>
            
            <div className="text-sm text-gray-500">
              <span>Share: </span>
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://www.narradar.com/blog/${slug}`)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 ml-2"
              >
                Twitter
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.narradar.com/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 ml-4"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
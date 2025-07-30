import Link from 'next/link'
import { BlogPostMeta } from '@/types/blog'

interface RelatedPostsProps {
  posts: BlogPostMeta[]
  currentPostSlug: string
}

export function RelatedPosts({ posts, currentPostSlug }: RelatedPostsProps) {
  const relatedPosts = posts.filter(post => post.slug !== currentPostSlug).slice(0, 3)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-narrow">
        <h2 className="heading-lg text-gray-900 mb-12 text-center">Related Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">{post.readTime}</span>
              </div>
              
              <h3 className="heading-sm text-gray-900 mb-3">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <time className="text-xs text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
                
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm group"
                >
                  Read more 
                  <span className="ml-1 group-hover:translate-x-0.5 transition-transform inline-block">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
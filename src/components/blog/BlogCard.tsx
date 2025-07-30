import Link from 'next/link'
import { BlogPostMeta } from '@/types/blog'

interface BlogCardProps {
  post: BlogPostMeta
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const cardClasses = featured 
    ? "card-hover p-8 lg:p-10 bg-gradient-to-br from-primary-50 to-white border-2 border-primary-100"
    : "card-hover p-8"

  return (
    <article className={cardClasses}>
      <div className="flex items-center space-x-4 mb-4">
        <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
          {post.category}
        </span>
        <span className="text-gray-500 text-sm">{post.readTime}</span>
        {featured && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
            Featured
          </span>
        )}
      </div>
      
      <h2 className={featured ? "heading-lg text-gray-900 mb-4" : "heading-sm text-gray-900 mb-4"}>
        <Link 
          href={`/blog/${post.slug}`}
          className="hover:text-primary-600 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        {post.excerpt}
      </p>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <time className="text-sm text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.author && (
            <span className="text-xs text-gray-400 mt-1">
              by {post.author.name}
            </span>
          )}
        </div>
        
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
  )
}
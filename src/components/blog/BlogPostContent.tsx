import { BlogPostMeta } from '@/types/blog'

interface BlogPostContentProps {
  post: BlogPostMeta
  children: React.ReactNode
}

export function BlogPostContent({ post, children }: BlogPostContentProps) {
  return (
    <article className="bg-white">
      {/* Article Header */}
      <header className="pt-16 pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-narrow">
          <div className="flex items-center space-x-4 mb-6">
            <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.readTime}</span>
          </div>
          
          <h1 className="heading-xl text-gray-900 mb-6">{post.title}</h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-gray-500">
              <time>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {post.author && (
                <span>by {post.author.name}</span>
              )}
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="py-16">
        <div className="container-narrow">
          <div className="prose prose-lg prose-primary max-w-none">
            {children}
          </div>
        </div>
      </div>

      {/* Article Footer with Summary, Key Facts, and Sources */}
      {(post.summary || post.keyFacts || post.sources) && (
        <div className="py-16 bg-gray-50">
          <div className="container-narrow">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Summary */}
              {post.summary && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="heading-sm text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    Summary
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{post.summary}</p>
                </div>
              )}

              {/* Key Facts */}
              {post.keyFacts && post.keyFacts.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="heading-sm text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Key Facts
                  </h3>
                  <ol className="space-y-3">
                    {post.keyFacts.map((fact, index) => (
                      <li key={index} className="text-gray-600 leading-relaxed">
                        <span className="font-medium text-primary-600 mr-2">{index + 1}.</span>
                        {fact.fact}
                        {fact.source && (
                          <span className="text-xs text-gray-400 ml-2">({fact.source})</span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Sources */}
              {post.sources && post.sources.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="heading-sm text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    Sources
                  </h3>
                  <ul className="space-y-2">
                    {post.sources.map((source, index) => (
                      <li key={index}>
                        <a 
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 text-sm underline"
                        >
                          {source.title}
                        </a>
                        {source.description && (
                          <p className="text-xs text-gray-500 mt-1">{source.description}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
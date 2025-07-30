import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/blog'
import { BlogCard, CallToAction } from '@/components/blog'

export const metadata: Metadata = {
  title: 'Blog - Insights on Agent Perception Optimization | Narradar',
  description: 'Read the latest insights on Agent Perception Optimization, semantic drift, and AI brand monitoring from leading experts.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Agent Perception Optimization Blog | Narradar',
    description: 'Expert insights on controlling your brand narrative in the age of AI',
    url: 'https://www.narradar.com/blog',
    type: 'website',
    images: [{
      url: '/images/og-blog.jpg',
      width: 1200,
      height: 630,
      alt: 'Narradar Blog - Agent Perception Optimization Insights'
    }]
  }
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const featuredPosts = allPosts.filter(post => post.featured)
  const regularPosts = allPosts.filter(post => !post.featured)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-16 pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-narrow">
          <div className="text-center">
            <h1 className="heading-xl text-gray-900 mb-6">Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights on Agent Perception Optimization and the future of AI-mediated communications
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-gray-200">
        <div className="container-narrow">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={category.slug}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} {category.count > 0 && `(${category.count})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container-narrow">
            <h2 className="heading-lg text-gray-900 mb-12 text-center">Featured Articles</h2>
            <div className="grid grid-cols-1 gap-8 mb-16">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16">
        <div className="container-narrow">
          {featuredPosts.length > 0 && (
            <h2 className="heading-lg text-gray-900 mb-12 text-center">Latest Articles</h2>
          )}
          
          {allPosts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {(featuredPosts.length > 0 ? regularPosts : allPosts).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-50 rounded-2xl p-12">
                <h3 className="heading-sm text-gray-900 mb-4">Coming Soon</h3>
                <p className="text-gray-600 mb-6">
                  We're working on insightful articles about Agent Perception Optimization.
                </p>
                <Link
                  href="/#beacon-check"
                  className="btn-primary"
                >
                  Run a Beacon Check
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CallToAction variant="beacon" />
    </div>
  )
}
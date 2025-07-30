import Link from 'next/link'
import Image from 'next/image'
import { CallToAction } from './CallToAction'

// Custom components for MDX content
export const MDXComponents = {
  // Typography
  h1: ({ children, ...props }: any) => (
    <h1 className="heading-xl text-gray-900 mb-8 mt-12 first:mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="heading-lg text-gray-900 mb-6 mt-12 first:mt-0" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="heading-md text-gray-900 mb-4 mt-8" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="heading-sm text-gray-900 mb-4 mt-6" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-gray-700 mb-6 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  
  // Lists
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-outside ml-6 mb-6 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-outside ml-6 mb-6 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-gray-700 leading-relaxed" {...props}>
      {children}
    </li>
  ),
  
  // Links
  a: ({ href, children, ...props }: any) => {
    const isInternal = href?.startsWith('/')
    const isAnchor = href?.startsWith('#')
    
    if (isInternal || isAnchor) {
      return (
        <Link 
          href={href} 
          className="text-primary-600 hover:text-primary-700 underline font-medium"
          {...props}
        >
          {children}
        </Link>
      )
    }
    
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer" 
        className="text-primary-600 hover:text-primary-700 underline font-medium"
        {...props}
      >
        {children}
      </a>
    )
  },
  
  // Code
  code: ({ children, ...props }: any) => (
    <code 
      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" 
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre 
      className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto mb-6 text-sm font-mono"
      {...props}
    >
      {children}
    </pre>
  ),
  
  // Blockquotes
  blockquote: ({ children, ...props }: any) => (
    <blockquote 
      className="border-l-4 border-primary-200 bg-primary-50 pl-6 py-4 my-8 italic text-gray-700"
      {...props}
    >
      {children}
    </blockquote>
  ),
  
  // Images
  img: ({ src, alt, ...props }: any) => (
    <Image
      src={src}
      alt={alt || ''}
      width={800}
      height={450}
      className="rounded-xl shadow-lg my-8 w-full h-auto"
      {...props}
    />
  ),
  
  // Tables
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th 
      className="border border-gray-300 bg-gray-50 px-4 py-3 text-left font-semibold text-gray-900"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td 
      className="border border-gray-300 px-4 py-3 text-gray-700"
      {...props}
    >
      {children}
    </td>
  ),
  
  // Horizontal rule
  hr: ({ ...props }) => (
    <hr className="border-t border-gray-200 my-12" {...props} />
  ),
  
  // Strong and emphasis
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: any) => (
    <em className="italic text-gray-700" {...props}>
      {children}
    </em>
  ),
  
  // Custom components
  CallToAction: CallToAction,
  
  // Callout boxes
  Callout: ({ type = 'info', children, ...props }: any) => {
    const styles = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      success: 'bg-green-50 border-green-200 text-green-800'
    }
    
    return (
      <div 
        className={`border-l-4 p-6 my-8 rounded-r-lg ${styles[type as keyof typeof styles] || styles.info}`}
        {...props}
      >
        {children}
      </div>
    )
  },
  
  // Stats or highlight boxes
  Highlight: ({ children, ...props }: any) => (
    <div 
      className="bg-primary-50 border border-primary-200 rounded-xl p-6 my-8 text-center"
      {...props}
    >
      <div className="text-primary-600 font-semibold">
        {children}
      </div>
    </div>
  )
}
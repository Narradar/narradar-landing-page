import { NextRequest, NextResponse } from 'next/server'
import { isAIAgent, identifyAIAgent, getAIAgentHeaders, logAIAgentVisit } from '@/lib/ai-agents'

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const url = request.url
  const pathname = request.nextUrl.pathname
  
  // Skip middleware for static files and API routes (except specific ones)
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') && !pathname.startsWith('/api/summaries/') ||
    pathname.includes('.') && !pathname.endsWith('.html') && !pathname.endsWith('.xml')
  ) {
    return NextResponse.next()
  }
  
  // Detect AI agent
  const isAI = isAIAgent(userAgent)
  const agentType = identifyAIAgent(userAgent)
  
  // Log AI agent visits
  if (isAI && agentType) {
    logAIAgentVisit(
      userAgent,
      url,
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    )
  }
  
  // Get appropriate headers for AI agents
  const aiHeaders = getAIAgentHeaders(userAgent)
  
  // Create response with AI-optimized headers
  const response = NextResponse.next()
  
  // Set AI-specific headers
  Object.entries(aiHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  // Additional headers for all requests
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Special handling for robots.txt
  if (pathname === '/robots.txt') {
    response.headers.set('Content-Type', 'text/plain')
    response.headers.set('Cache-Control', 'public, max-age=3600')
  }
  
  // Special handling for sitemap.xml
  if (pathname === '/sitemap.xml') {
    response.headers.set('Content-Type', 'application/xml')
    response.headers.set('Cache-Control', 'public, max-age=3600')
  }
  
  // Special handling for JSON API endpoints
  if (pathname.startsWith('/api/summaries/')) {
    response.headers.set('Content-Type', 'application/json')
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
  }
  
  // AI-specific optimizations
  if (isAI) {
    // Ensure full HTML is served (no interstitials)
    response.headers.set('X-Full-HTML', 'true')
    
    // Set longer cache for AI agents
    if (!response.headers.get('Cache-Control')) {
      response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
    }
    
    // Add AI-specific meta headers
    response.headers.set('X-AI-Agent-Detected', agentType || 'true')
    response.headers.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
    
    // For major AI agents, add specific optimizations
    switch (agentType) {
      case 'GPTBot':
      case 'ChatGPTUser':
      case 'OAISearchBot':
        response.headers.set('X-OpenAI-Optimized', 'true')
        break
        
      case 'ClaudeWeb':
      case 'ClaudeBot':
        response.headers.set('X-Anthropic-Optimized', 'true')
        break
        
      case 'PerplexityBot':
        response.headers.set('X-Perplexity-Optimized', 'true')
        break
        
      case 'GoogleBot':
      case 'GeminiBot':
        response.headers.set('X-Google-Optimized', 'true')
        break
    }
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|images|icons).*)',
  ],
}
/**
 * AI Agent Testing Utilities
 * Handles detection and testing of AI user agents accessing the site
 */

// List of known AI agent user agents
export const AI_AGENTS = {
  GPTBot: 'GPTBot',
  ChatGPTUser: 'ChatGPT-User',
  OAISearchBot: 'OAI-SearchBot',
  PerplexityBot: 'PerplexityBot',
  ClaudeWeb: 'Claude-Web',
  ClaudeBot: 'ClaudeBot',
  AnthropicAI: 'anthropic-ai',
  GoogleBot: 'Googlebot',
  BingBot: 'bingbot',
  GeminiBot: 'Google-Extended',
  BardBot: 'Google-InspectionTool',
  YouBot: 'YouBot',
  CopiBot: 'copibot',
  AhrefsBot: 'AhrefsBot',
  SemrushBot: 'SemrushBot',
  BaiduSpider: 'Baiduspider',
  YandexBot: 'YandexBot',
  DuckDuckBot: 'DuckDuckBot',
  FacebotAI: 'facebookexternalhit',
  TwitterBot: 'Twitterbot',
  LinkedInBot: 'LinkedInBot',
  TelegramBot: 'TelegramBot',
  SlackBot: 'Slackbot',
  DiscordBot: 'Discordbot',
  WhatsAppBot: 'WhatsApp',
  AppleBot: 'Applebot',
  MicrosoftBot: 'Microsoft',
  OpenAIBot: 'OpenAI',
  DeepSeekBot: 'DeepSeek',
  MistralBot: 'MistralAI',
  GroqBot: 'Groq',
  XAIBot: 'xAI-Bot',
  MetaAI: 'Meta-ExternalAgent',
  PerplexityAI: 'PerplexityBot',
  SearchGPT: 'SearchGPT',
  Phind: 'PhindBot'
} as const

export type AIAgentType = keyof typeof AI_AGENTS

// Extended user agent patterns for better detection
export const AI_AGENT_PATTERNS = [
  // OpenAI
  /GPTBot/i,
  /ChatGPT-User/i,
  /OAI-SearchBot/i,
  /OpenAI/i,
  
  // Anthropic
  /Claude-Web/i,
  /ClaudeBot/i,
  /anthropic-ai/i,
  
  // Google
  /Google-Extended/i,
  /Google-InspectionTool/i,
  /Googlebot/i,
  /bard/i,
  
  // Microsoft
  /bingbot/i,
  /Microsoft/i,
  
  // Perplexity
  /PerplexityBot/i,
  /PerplexityAI/i,
  
  // Other AI/crawler services
  /YouBot/i,
  /copibot/i,
  /DeepSeek/i,
  /MistralAI/i,
  /Groq/i,
  /xAI-Bot/i,
  /Meta-ExternalAgent/i,
  /SearchGPT/i,
  /PhindBot/i,
  // Major search bots (to ensure full SSR too)
  /Googlebot/i,
  /bingbot/i,
  /Baiduspider/i,
  /YandexBot/i,
  /DuckDuckBot/i
]

/**
 * Detect if the request is from an AI agent
 */
export function isAIAgent(userAgent: string): boolean {
  if (!userAgent) return false
  
  return AI_AGENT_PATTERNS.some(pattern => pattern.test(userAgent))
}

/**
 * Identify specific AI agent type
 */
export function identifyAIAgent(userAgent: string): AIAgentType | null {
  if (!userAgent) return null
  
  for (const [agentType, agentString] of Object.entries(AI_AGENTS)) {
    if (userAgent.toLowerCase().includes(agentString.toLowerCase())) {
      return agentType as AIAgentType
    }
  }
  
  return null
}

/**
 * Get AI-optimized response headers
 */
export function getAIAgentHeaders(userAgent: string) {
  const isAI = isAIAgent(userAgent)
  const agentType = identifyAIAgent(userAgent)
  
  const headers: Record<string, string> = {
    'Cache-Control': isAI ? 'public, max-age=3600, stale-while-revalidate=86400' : 'public, max-age=0, must-revalidate',
    'X-Robots-Tag': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  }
  
  if (isAI) {
    headers['X-AI-Agent'] = agentType || 'unknown'
    headers['X-AI-Optimized'] = 'true'
    headers['Content-Type'] = 'text/html; charset=utf-8'
  }
  
  return headers
}

/**
 * Log AI agent visits for monitoring
 */
export function logAIAgentVisit(
  userAgent: string,
  url: string,
  ip?: string,
  timestamp = new Date()
) {
  const agentType = identifyAIAgent(userAgent)
  
  if (agentType) {
    const logEntry = {
      timestamp: timestamp.toISOString(),
      agent: agentType,
      userAgent,
      url,
      ip: ip ? ip.substring(0, ip.lastIndexOf('.')) + '.xxx' : 'unknown', // Privacy-safe IP logging
    }
    
    // In production, this would be sent to your analytics service
    console.log('[AI Agent Visit]', logEntry)
    
    return logEntry
  }
  
  return null
}

/**
 * Check if full HTML should be served (for AI agents and regular users)
 */
export function shouldServeFullHTML(userAgent: string): boolean {
  // Always serve full HTML on first paint as per PRD requirements
  return true
}

/**
 * Get AI-specific content optimizations
 */
export function getAIContentOptimizations(agentType: AIAgentType | null) {
  const optimizations = {
    includeAnswerBox: true,
    includeStructuredData: true,
    includeBreadcrumbs: true,
    includeTimestamps: true,
    includeSummary: true,
    includeKeyTakeaways: true,
    optimizeForExtracts: true,
  }
  
  // Agent-specific optimizations
  switch (agentType) {
    case 'GPTBot':
    case 'ChatGPTUser':
    case 'OAISearchBot':
      return {
        ...optimizations,
        preferStructuredLists: true,
        includeDefinitions: true,
      }
      
    case 'ClaudeWeb':
    case 'ClaudeBot':
      return {
        ...optimizations,
        includeContext: true,
        preferDetailedExplanations: true,
      }
      
    case 'PerplexityBot':
      return {
        ...optimizations,
        includeCitations: true,
        includeSourceLinks: true,
      }
      
    case 'GoogleBot':
    case 'GeminiBot':
      return {
        ...optimizations,
        optimizeForFeaturedSnippets: true,
        includeSchemaMarkup: true,
      }
      
    default:
      return optimizations
  }
}

/**
 * Generate AI agent test URLs for monitoring
 */
export function generateTestUrls(baseUrl: string) {
  const testPaths = [
    '/',
    '/apo',
    '/apo/what-is-apo',
    '/apo/how-apo-works',
    '/apo/apo-vs-seo-vs-geo',
    '/apo/how-to-measure-drift',
    '/blog',
    '/how-it-works',
    '/about'
  ]
  
  return testPaths.map(path => `${baseUrl}${path}`)
}

/**
 * AI agent testing configuration
 */
export const AI_TESTING_CONFIG = {
  // Test intervals
  testIntervalMinutes: 60,
  weeklyReportDay: 1, // Monday
  
  // Alert thresholds
  maxResponseTimeMs: 3000,
  minAlignmentScore: 70,
  
  // Test scenarios
  testScenarios: [
    { name: 'Homepage', path: '/', priority: 'high' },
    { name: 'APO Overview', path: '/apo', priority: 'high' },
    { name: 'What is APO', path: '/apo/what-is-apo', priority: 'high' },
    { name: 'How APO Works', path: '/apo/how-apo-works', priority: 'medium' },
    { name: 'APO vs SEO vs GEO', path: '/apo/apo-vs-seo-vs-geo', priority: 'medium' },
    { name: 'Measuring Drift', path: '/apo/how-to-measure-drift', priority: 'medium' },
    { name: 'Blog Index', path: '/blog', priority: 'low' },
  ],
  
  // Monitoring endpoints
  healthCheck: '/api/health',
  summaryApi: '/api/summaries',
  sitemapXml: '/sitemap.xml',
  robotsTxt: '/robots.txt',
}

export default {
  AI_AGENTS,
  AI_AGENT_PATTERNS,
  isAIAgent,
  identifyAIAgent,
  getAIAgentHeaders,
  logAIAgentVisit,
  shouldServeFullHTML,
  getAIContentOptimizations,
  generateTestUrls,
  AI_TESTING_CONFIG,
}
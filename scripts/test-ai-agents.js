#!/usr/bin/env node

/**
 * AI Agent Testing Script
 * Tests how different AI agents see and interact with the Narradar website
 * 
 * Usage:
 *   node scripts/test-ai-agents.js
 *   node scripts/test-ai-agents.js --url=https://www.narradar.com
 *   node scripts/test-ai-agents.js --agent=GPTBot
 *   node scripts/test-ai-agents.js --full-report
 */

const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

// AI Agent User Agents to test
const AI_AGENTS = {
  GPTBot: 'Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)',
  ChatGPTUser: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) ChatGPT-User/1.0',
  OAISearchBot: 'OAI-SearchBot/1.0 (+https://openai.com/searchbot)',
  PerplexityBot: 'PerplexityBot/1.0 (+https://www.perplexity.ai/bot)',
  ClaudeWeb: 'Claude-Web/1.0 (+https://claude.ai/)',
  ClaudeBot: 'Mozilla/5.0 (compatible; ClaudeBot/1.0; +https://www.anthropic.com)',
  GoogleBot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  BingBot: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  GeminiBot: 'Google-Extended/1.0',
  YouBot: 'Mozilla/5.0 (compatible; YouBot/1.0; +https://you.com/bot)',
  MetaAI: 'Meta-ExternalAgent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)',
  SearchGPT: 'Mozilla/5.0 (compatible; SearchGPT/1.0; +https://openai.com/searchgpt)',
  DeepSeekBot: 'Mozilla/5.0 (compatible; DeepSeekBot/1.0; +https://www.deepseek.com)',
  MistralBot: 'Mozilla/5.0 (compatible; MistralAI/1.0; +https://mistral.ai)',
  XAIBot: 'Mozilla/5.0 (compatible; xAI-Bot/1.0; +https://x.ai)',
}

// Test URLs
const TEST_URLS = [
  '/',
  '/apo',
  '/apo/what-is-apo',
  '/apo/how-apo-works',
  '/apo/apo-vs-seo-vs-geo',
  '/apo/how-to-measure-drift',
  '/blog',
  '/how-it-works',
  '/about',
  '/sitemap.xml',
  '/robots.txt',
  '/api/summaries/what-is-apo'
]

// Parse command line arguments
const args = process.argv.slice(2)
const config = {
  baseUrl: 'http://localhost:3000',
  agent: null,
  fullReport: false,
  output: null,
  verbose: false
}

args.forEach(arg => {
  if (arg.startsWith('--url=')) {
    config.baseUrl = arg.substring(6)
  } else if (arg.startsWith('--agent=')) {
    config.agent = arg.substring(8)
  } else if (arg === '--full-report') {
    config.fullReport = true
  } else if (arg.startsWith('--output=')) {
    config.output = arg.substring(9)
  } else if (arg === '--verbose' || arg === '-v') {
    config.verbose = true
  }
})

// Logging utilities
function log(message, level = 'info') {
  const timestamp = new Date().toISOString()
  const prefix = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : level === 'success' ? '✅' : 'ℹ️'
  console.log(`${prefix} [${timestamp}] ${message}`)
}

function verbose(message) {
  if (config.verbose) {
    log(message, 'debug')
  }
}

// HTTP request utility
function makeRequest(url, userAgent) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    const urlObj = new URL(url)
    const client = urlObj.protocol === 'https:' ? https : http
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 10000
    }
    
    const req = client.request(options, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        const responseTime = Date.now() - startTime
        
        resolve({
          url,
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          responseTime,
          contentLength: data.length,
          userAgent
        })
      })
    })
    
    req.on('error', (error) => {
      reject({
        url,
        error: error.message,
        userAgent,
        responseTime: Date.now() - startTime
      })
    })
    
    req.on('timeout', () => {
      req.destroy()
      reject({
        url,
        error: 'Request timeout',
        userAgent,
        responseTime: Date.now() - startTime
      })
    })
    
    req.end()
  })
}

// Content analysis utilities
function analyzeContent(html, url) {
  const analysis = {
    hasAnswerBox: false,
    hasStructuredData: false,
    hasBreadcrumbs: false,
    hasTimestamp: false,
    hasQASection: false,
    titleTag: null,
    metaDescription: null,
    h1Tags: [],
    schemaTypes: [],
    wordCount: 0
  }
  
  if (!html) return analysis
  
  // Check for answer box
  analysis.hasAnswerBox = html.includes('answer-box') || html.includes('Answer Box')
  
  // Check for structured data
  analysis.hasStructuredData = html.includes('application/ld+json')
  
  // Check for breadcrumbs
  analysis.hasBreadcrumbs = html.includes('breadcrumb') || html.includes('BreadcrumbList')
  
  // Check for timestamp
  analysis.hasTimestamp = html.includes('Last Updated') || html.includes('lastModified')
  
  // Check for Q&A section
  analysis.hasQASection = html.includes('Frequently Asked Questions') || html.includes('Q&A')
  
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  analysis.titleTag = titleMatch ? titleMatch[1].trim() : null
  
  // Extract meta description
  const descMatch = html.match(/<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\'][^>]*>/i)
  analysis.metaDescription = descMatch ? descMatch[1].trim() : null
  
  // Extract H1 tags
  const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi)
  analysis.h1Tags = h1Matches ? h1Matches.map(h1 => h1.replace(/<[^>]+>/g, '').trim()) : []
  
  // Extract schema types
  const schemaMatches = html.match(/"@type":\s*"([^"]+)"/g)
  analysis.schemaTypes = schemaMatches ? 
    [...new Set(schemaMatches.map(match => match.match(/"@type":\s*"([^"]+)"/)[1]))] : []
  
  // Word count (approximate)
  const textContent = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  analysis.wordCount = textContent.split(' ').length
  
  return analysis
}

// Main testing function
async function testAIAgent(agentName, userAgent) {
  log(`Testing ${agentName}...`)
  const results = []
  
  for (const testPath of TEST_URLS) {
    const fullUrl = config.baseUrl + testPath
    verbose(`  Testing ${fullUrl}`)
    
    try {
      const result = await makeRequest(fullUrl, userAgent)
      const analysis = analyzeContent(result.body, fullUrl)
      
      results.push({
        agent: agentName,
        path: testPath,
        url: fullUrl,
        success: true,
        statusCode: result.statusCode,
        responseTime: result.responseTime,
        contentLength: result.contentLength,
        analysis,
        timestamp: new Date().toISOString()
      })
      
      verbose(`    ✅ ${result.statusCode} (${result.responseTime}ms)`)
      
    } catch (error) {
      results.push({
        agent: agentName,
        path: testPath,
        url: fullUrl,
        success: false,
        error: error.error || error.message,
        responseTime: error.responseTime || 0,
        timestamp: new Date().toISOString()
      })
      
      verbose(`    ❌ Error: ${error.error || error.message}`)
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  return results
}

// Generate test report
function generateReport(allResults) {
  const report = {
    summary: {
      totalTests: allResults.length,
      successfulTests: allResults.filter(r => r.success).length,
      failedTests: allResults.filter(r => r.success === false).length,
      averageResponseTime: 0,
      testedAgents: [...new Set(allResults.map(r => r.agent))],
      timestamp: new Date().toISOString()
    },
    byAgent: {},
    byUrl: {},
    recommendations: []
  }
  
  // Calculate average response time
  const successfulResults = allResults.filter(r => r.success && r.responseTime)
  report.summary.averageResponseTime = successfulResults.length > 0 ?
    Math.round(successfulResults.reduce((sum, r) => sum + r.responseTime, 0) / successfulResults.length) : 0
  
  // Group by agent
  report.summary.testedAgents.forEach(agent => {
    const agentResults = allResults.filter(r => r.agent === agent)
    const successful = agentResults.filter(r => r.success)
    
    report.byAgent[agent] = {
      totalTests: agentResults.length,
      successful: successful.length,
      failed: agentResults.length - successful.length,
      successRate: Math.round((successful.length / agentResults.length) * 100),
      averageResponseTime: successful.length > 0 ?
        Math.round(successful.reduce((sum, r) => sum + (r.responseTime || 0), 0) / successful.length) : 0,
      features: {
        answerBox: successful.filter(r => r.analysis?.hasAnswerBox).length,
        structuredData: successful.filter(r => r.analysis?.hasStructuredData).length,
        breadcrumbs: successful.filter(r => r.analysis?.hasBreadcrumbs).length,
        qaSection: successful.filter(r => r.analysis?.hasQASection).length
      }
    }
  })
  
  // Group by URL
  TEST_URLS.forEach(url => {
    const urlResults = allResults.filter(r => r.path === url && r.success)
    
    if (urlResults.length > 0) {
      report.byUrl[url] = {
        totalTests: urlResults.length,
        averageResponseTime: Math.round(urlResults.reduce((sum, r) => sum + (r.responseTime || 0), 0) / urlResults.length),
        features: {
          answerBox: urlResults.filter(r => r.analysis?.hasAnswerBox).length,
          structuredData: urlResults.filter(r => r.analysis?.hasStructuredData).length,
          breadcrumbs: urlResults.filter(r => r.analysis?.hasBreadcrumbs).length,
          qaSection: urlResults.filter(r => r.analysis?.hasQASection).length
        },
        schemaTypes: [...new Set(urlResults.flatMap(r => r.analysis?.schemaTypes || []))]
      }
    }
  })
  
  // Generate recommendations
  if (report.summary.averageResponseTime > 3000) {
    report.recommendations.push('Response times are high. Consider optimizing server performance.')
  }
  
  const lowAnswerBoxUrls = Object.entries(report.byUrl)
    .filter(([url, data]) => data.features.answerBox < report.summary.testedAgents.length * 0.8)
    .map(([url]) => url)
  
  if (lowAnswerBoxUrls.length > 0) {
    report.recommendations.push(`Answer boxes missing or not properly detected on: ${lowAnswerBoxUrls.join(', ')}`)
  }
  
  return report
}

// Main execution
async function main() {
  log(`Starting AI Agent Testing for ${config.baseUrl}`)
  log(`Testing ${config.agent ? 1 : Object.keys(AI_AGENTS).length} agents across ${TEST_URLS.length} URLs`)
  
  const allResults = []
  const agentsToTest = config.agent ? 
    { [config.agent]: AI_AGENTS[config.agent] } : 
    AI_AGENTS
  
  // Test each agent
  for (const [agentName, userAgent] of Object.entries(agentsToTest)) {
    if (!userAgent) {
      log(`Unknown agent: ${agentName}`, 'warn')
      continue
    }
    
    try {
      const results = await testAIAgent(agentName, userAgent)
      allResults.push(...results)
      log(`Completed testing ${agentName} (${results.filter(r => r.success).length}/${results.length} successful)`, 'success')
    } catch (error) {
      log(`Failed to test ${agentName}: ${error.message}`, 'error')
    }
  }
  
  // Generate report
  const report = generateReport(allResults)
  
  // Output results
  if (config.output) {
    const outputPath = path.resolve(config.output)
    fs.writeFileSync(outputPath, JSON.stringify({ report, results: allResults }, null, 2))
    log(`Full results saved to ${outputPath}`)
  }
  
  // Console summary
  log('\n📊 TEST SUMMARY')
  log(`Total Tests: ${report.summary.totalTests}`)
  log(`Successful: ${report.summary.successfulTests} (${Math.round((report.summary.successfulTests / report.summary.totalTests) * 100)}%)`)
  log(`Failed: ${report.summary.failedTests}`)
  log(`Average Response Time: ${report.summary.averageResponseTime}ms`)
  
  if (config.fullReport) {
    log('\n🤖 BY AGENT')
    Object.entries(report.byAgent).forEach(([agent, data]) => {
      log(`${agent}: ${data.successful}/${data.totalTests} (${data.successRate}%) - ${data.averageResponseTime}ms avg`)
    })
    
    log('\n🔗 BY URL')
    Object.entries(report.byUrl).forEach(([url, data]) => {
      log(`${url}: ${data.totalTests} tests - ${data.averageResponseTime}ms avg`)
    })
  }
  
  if (report.recommendations.length > 0) {
    log('\n💡 RECOMMENDATIONS')
    report.recommendations.forEach(rec => log(`• ${rec}`))
  }
  
  log('\nTesting completed!')
}

// Error handling
process.on('unhandledRejection', (error) => {
  log(`Unhandled error: ${error.message}`, 'error')
  process.exit(1)
})

// Run the tests
main().catch(error => {
  log(`Test execution failed: ${error.message}`, 'error')
  process.exit(1)
})
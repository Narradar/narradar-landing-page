#!/usr/bin/env node

/**
 * GEO Validation Script
 * Validates that all GEO and SEO infrastructure is properly implemented
 * 
 * Usage:
 *   node scripts/validate-geo.js
 *   node scripts/validate-geo.js --url=https://www.narradar.com --output=geo-validation.json
 */

const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

// Parse command line arguments
const args = process.argv.slice(2)
const config = {
  baseUrl: 'http://localhost:3000',
  output: null,
  verbose: false
}

args.forEach(arg => {
  if (arg.startsWith('--url=')) {
    config.baseUrl = arg.substring(6)
  } else if (arg.startsWith('--output=')) {
    config.output = arg.substring(9)
  } else if (arg === '--verbose' || arg === '-v') {
    config.verbose = true
  }
})

// Test configurations
const VALIDATION_TESTS = {
  infrastructure: [
    { path: '/robots.txt', name: 'Robots.txt', required: true },
    { path: '/sitemap.xml', name: 'XML Sitemap', required: true },
    { path: '/api/summaries/what-is-apo', name: 'Helper JSON API', required: true }
  ],
  qTargetPages: [
    { path: '/apo/what-is-apo', name: 'What is APO Q-Target', required: true },
    { path: '/apo/how-apo-works', name: 'How APO Works Q-Target', required: true },
    { path: '/apo/apo-vs-seo-vs-geo', name: 'APO vs SEO vs GEO Q-Target', required: true },
    { path: '/apo/how-to-measure-drift', name: 'How to Measure Drift Q-Target', required: true }
  ],
  mainPages: [
    { path: '/', name: 'Homepage', required: true },
    { path: '/apo', name: 'APO Hub', required: true },
    { path: '/blog', name: 'Blog Index', required: true }
  ]
}

const AI_AGENTS = [
  'Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)',
  'Mozilla/5.0 (compatible; ClaudeBot/1.0; +https://www.anthropic.com)',
  'PerplexityBot/1.0 (+https://www.perplexity.ai/bot)',
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
]

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
function makeRequest(url, userAgent = 'GEO-Validator/1.0') {
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
        'Connection': 'keep-alive',
      },
      timeout: 10000
    }
    
    const req = client.request(options, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        resolve({
          url,
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          responseTime: Date.now() - startTime,
          userAgent
        })
      })
    })
    
    req.on('error', (error) => {
      reject({ url, error: error.message, userAgent })
    })
    
    req.on('timeout', () => {
      req.destroy()
      reject({ url, error: 'Request timeout', userAgent })
    })
    
    req.end()
  })
}

// Content validation functions
function validateStructuredData(html) {
  const schemas = {
    organization: html.includes('"@type":"Organization"') || html.includes('"@type": "Organization"'),
    website: html.includes('"@type":"WebSite"') || html.includes('"@type": "WebSite"'),
    breadcrumb: html.includes('"@type":"BreadcrumbList"') || html.includes('"@type": "BreadcrumbList"'),
    article: html.includes('"@type":"Article"') || html.includes('"@type": "Article"'),
    qaPage: html.includes('"@type":"QAPage"') || html.includes('"@type": "QAPage"'),
    faqPage: html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"')
  }
  
  return {
    hasStructuredData: Object.values(schemas).some(Boolean),
    schemas,
    count: Object.values(schemas).filter(Boolean).length
  }
}

function validateAnswerBox(html) {
  return {
    hasAnswerBox: html.includes('answer-box') || html.includes('Answer Box'),
    hasAnswerBoxClass: html.includes('class="answer-box"') || html.includes("class='answer-box'"),
    hasAnswerBoxContent: html.includes('answer-box') && html.length > 1000
  }
}

function validateQASection(html) {
  return {
    hasQASection: html.includes('Frequently Asked Questions') || html.includes('Q&A') || html.includes('qa-section'),
    hasMultipleQuestions: (html.match(/question/gi) || []).length >= 5,
    hasStructuredQA: html.includes('@type":"Question"') || html.includes('@type": "Question"')
  }
}

function validateMetaTags(html) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const descMatch = html.match(/<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\'][^>]*>/i)
  const canonicalMatch = html.match(/<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\'][^>]*>/i)
  
  return {
    hasTitle: !!titleMatch,
    hasDescription: !!descMatch,
    hasCanonical: !!canonicalMatch,
    title: titleMatch ? titleMatch[1].trim() : null,
    description: descMatch ? descMatch[1].trim() : null,
    canonical: canonicalMatch ? canonicalMatch[1].trim() : null
  }
}

function validateOpenGraph(html) {
  const ogTags = {
    title: html.match(/<meta[^>]+property=["\']og:title["\'][^>]+content=["\']([^"\']+)["\'][^>]*>/i),
    description: html.match(/<meta[^>]+property=["\']og:description["\'][^>]+content=["\']([^"\']+)["\'][^>]*>/i),
    image: html.match(/<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\'][^>]*>/i),
    url: html.match(/<meta[^>]+property=["\']og:url["\'][^>]+content=["\']([^"\']+)["\'][^>]*>/i),
    type: html.match(/<meta[^>]+property=["\']og:type["\'][^>]+content=["\']([^"\']+)["\'][^>]*>/i)
  }
  
  const hasOpenGraph = Object.values(ogTags).some(Boolean)
  const openGraphData = {}
  
  Object.entries(ogTags).forEach(([key, match]) => {
    openGraphData[key] = match ? match[1].trim() : null
  })
  
  return {
    hasOpenGraph,
    count: Object.values(ogTags).filter(Boolean).length,
    data: openGraphData
  }
}

function validateTimestamp(html) {
  return {
    hasLastUpdated: html.includes('Last Updated') || html.includes('lastModified') || html.includes('dateModified'),
    hasPublishedDate: html.includes('datePublished') || html.includes('Published'),
    hasTimestampVisible: html.includes('Last Updated:') && html.includes(new Date().getFullYear().toString()),
  }
}

// Main validation function
async function validatePage(url, pageName, isQTarget = false) {
  const results = {
    url,
    name: pageName,
    isQTarget,
    success: false,
    errors: [],
    warnings: [],
    features: {},
    aiAgentResults: []
  }
  
  try {
    // Test with regular user agent first
    const response = await makeRequest(url)
    
    if (response.statusCode !== 200) {
      results.errors.push(`HTTP ${response.statusCode} error`)
      return results
    }
    
    results.success = true
    results.responseTime = response.responseTime
    results.contentLength = response.body.length
    
    // Validate various features
    results.features.structuredData = validateStructuredData(response.body)
    results.features.answerBox = validateAnswerBox(response.body)
    results.features.qaSection = validateQASection(response.body)
    results.features.metaTags = validateMetaTags(response.body)
    results.features.openGraph = validateOpenGraph(response.body)
    results.features.timestamp = validateTimestamp(response.body)
    
    // Q-target specific validations
    if (isQTarget) {
      if (!results.features.answerBox.hasAnswerBox) {
        results.warnings.push('Missing answer box for Q-target page')
      }
      if (!results.features.qaSection.hasQASection) {
        results.warnings.push('Missing Q&A section for Q-target page')
      }
      if (!results.features.structuredData.schemas.qaPage && !results.features.structuredData.schemas.faqPage) {
        results.warnings.push('Missing QA/FAQ structured data for Q-target page')
      }
    }
    
    // Test with AI agents
    for (const aiAgent of AI_AGENTS.slice(0, 2)) { // Test with first 2 AI agents
      try {
        const aiResponse = await makeRequest(url, aiAgent)
        results.aiAgentResults.push({
          agent: aiAgent.includes('GPTBot') ? 'GPTBot' : 
                 aiAgent.includes('ClaudeBot') ? 'ClaudeBot' :
                 aiAgent.includes('PerplexityBot') ? 'PerplexityBot' : 'Googlebot',
          success: aiResponse.statusCode === 200,
          responseTime: aiResponse.responseTime,
          hasFullHTML: aiResponse.body.length > 1000,
          hasAnswerBox: aiResponse.body.includes('answer-box')
        })
      } catch (error) {
        results.aiAgentResults.push({
          agent: 'Unknown',
          success: false,
          error: error.error || error.message
        })
      }
      
      // Small delay between AI agent tests
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
  } catch (error) {
    results.errors.push(error.error || error.message)
  }
  
  return results
}

// Infrastructure validation
async function validateInfrastructure() {
  log('Validating infrastructure endpoints...')
  const results = []
  
  for (const test of VALIDATION_TESTS.infrastructure) {
    const url = config.baseUrl + test.path
    verbose(`Testing ${test.name} at ${url}`)
    
    try {
      const response = await makeRequest(url)
      const result = {
        name: test.name,
        path: test.path,
        success: response.statusCode === 200,
        statusCode: response.statusCode,
        contentLength: response.body.length,
        responseTime: response.responseTime,
        required: test.required
      }
      
      // Special validation for specific endpoints
      if (test.path === '/robots.txt') {
        result.hasAIAgents = response.body.includes('GPTBot') && response.body.includes('PerplexityBot')
        result.hasSitemap = response.body.includes('Sitemap:')
      } else if (test.path === '/sitemap.xml') {
        result.isValidXML = response.body.includes('<?xml') && response.body.includes('<urlset')
        result.hasUrls = (response.body.match(/<url>/g) || []).length
      } else if (test.path.includes('/api/summaries/')) {
        try {
          const jsonData = JSON.parse(response.body)
          result.isValidJSON = true
          result.hasRequiredFields = !!(jsonData.title && jsonData.summary80 && jsonData.alignment_score)
        } catch (e) {
          result.isValidJSON = false
        }
      }
      
      results.push(result)
      log(`${test.name}: ${result.success ? '✅' : '❌'}`)
      
    } catch (error) {
      results.push({
        name: test.name,
        path: test.path,
        success: false,
        error: error.error || error.message,
        required: test.required
      })
      log(`${test.name}: ❌ ${error.error || error.message}`)
    }
  }
  
  return results
}

// Main execution
async function main() {
  log(`Starting GEO validation for ${config.baseUrl}`)
  
  const validationResults = {
    timestamp: new Date().toISOString(),
    baseUrl: config.baseUrl,
    infrastructure: [],
    pages: [],
    summary: {
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      warnings: [],
      criticalIssues: []
    }
  }
  
  // Validate infrastructure
  validationResults.infrastructure = await validateInfrastructure()
  
  // Validate pages
  log('Validating pages...')
  const allTests = [
    ...VALIDATION_TESTS.mainPages.map(test => ({ ...test, isQTarget: false })),
    ...VALIDATION_TESTS.qTargetPages.map(test => ({ ...test, isQTarget: true }))
  ]
  
  for (const test of allTests) {
    const url = config.baseUrl + test.path
    log(`Validating ${test.name}...`)
    
    const result = await validatePage(url, test.name, test.isQTarget)
    validationResults.pages.push(result)
    
    verbose(`${test.name}: ${result.success ? '✅' : '❌'} (${result.errors.length} errors, ${result.warnings.length} warnings)`)
  }
  
  // Generate summary
  const allResults = [...validationResults.infrastructure, ...validationResults.pages]
  validationResults.summary.totalTests = allResults.length
  validationResults.summary.passedTests = allResults.filter(r => r.success).length
  validationResults.summary.failedTests = allResults.filter(r => !r.success).length
  
  // Collect warnings and critical issues
  validationResults.pages.forEach(page => {
    validationResults.summary.warnings.push(...page.warnings)
    if (page.errors.length > 0) {
      validationResults.summary.criticalIssues.push(`${page.name}: ${page.errors.join(', ')}`)
    }
  })
  
  // Required infrastructure failures are critical
  validationResults.infrastructure.forEach(infra => {
    if (!infra.success && infra.required) {
      validationResults.summary.criticalIssues.push(`Required infrastructure missing: ${infra.name}`)
    }
  })
  
  // Output results
  if (config.output) {
    const outputPath = path.resolve(config.output)
    fs.writeFileSync(outputPath, JSON.stringify(validationResults, null, 2))
    log(`Full validation results saved to ${outputPath}`)
  }
  
  // Console summary
  log('\n📊 VALIDATION SUMMARY')
  log(`Total Tests: ${validationResults.summary.totalTests}`)
  log(`Passed: ${validationResults.summary.passedTests} (${Math.round((validationResults.summary.passedTests / validationResults.summary.totalTests) * 100)}%)`)
  log(`Failed: ${validationResults.summary.failedTests}`)
  
  if (validationResults.summary.criticalIssues.length > 0) {
    log('\n🚨 CRITICAL ISSUES')
    validationResults.summary.criticalIssues.forEach(issue => log(`• ${issue}`))
  }
  
  if (validationResults.summary.warnings.length > 0) {
    log('\n⚠️ WARNINGS')
    validationResults.summary.warnings.slice(0, 10).forEach(warning => log(`• ${warning}`))
    if (validationResults.summary.warnings.length > 10) {
      log(`... and ${validationResults.summary.warnings.length - 10} more warnings`)
    }
  }
  
  // Feature summary for Q-target pages
  const qTargetPages = validationResults.pages.filter(p => p.isQTarget)
  log('\n🎯 Q-TARGET PAGE FEATURES')
  qTargetPages.forEach(page => {
    if (page.success) {
      const features = page.features
      log(`${page.name}:`)
      log(`  ✓ Answer Box: ${features.answerBox?.hasAnswerBox ? '✅' : '❌'}`)
      log(`  ✓ Q&A Section: ${features.qaSection?.hasQASection ? '✅' : '❌'}`)
      log(`  ✓ Structured Data: ${features.structuredData?.hasStructuredData ? '✅' : '❌'}`)
      log(`  ✓ AI Agent Compatible: ${page.aiAgentResults.filter(a => a.success).length}/${page.aiAgentResults.length}`)
    }
  })
  
  log('\nValidation completed!')
  
  // Exit with appropriate code
  process.exit(validationResults.summary.criticalIssues.length > 0 ? 1 : 0)
}

// Error handling
process.on('unhandledRejection', (error) => {
  log(`Unhandled error: ${error.message}`, 'error')
  process.exit(1)
})

// Run validation
main().catch(error => {
  log(`Validation failed: ${error.message}`, 'error')
  process.exit(1)
})
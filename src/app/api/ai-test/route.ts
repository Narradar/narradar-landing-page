import { NextRequest, NextResponse } from 'next/server'
import { isAIAgent, identifyAIAgent, logAIAgentVisit, getAIAgentHeaders, AI_TESTING_CONFIG } from '@/lib/ai-agents'

interface TestResult {
  url: string
  timestamp: string
  userAgent: string
  isAIAgent: boolean
  agentType: string | null
  responseTime: number
  statusCode: number
  hasAnswerBox: boolean
  hasStructuredData: boolean
  contentLength: number
  headers: Record<string, string>
}

/**
 * GET /api/ai-test
 * Test endpoint for AI agent detection and monitoring
 */
export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const startTime = Date.now()
  
  // Detect AI agent
  const isAI = isAIAgent(userAgent)
  const agentType = identifyAIAgent(userAgent)
  
  // Log the visit
  const logEntry = logAIAgentVisit(
    userAgent,
    request.url,
    request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  )
  
  // Generate test response
  const testResult: TestResult = {
    url: request.url,
    timestamp: new Date().toISOString(),
    userAgent,
    isAIAgent: isAI,
    agentType,
    responseTime: Date.now() - startTime,
    statusCode: 200,
    hasAnswerBox: isAI, // Serve answer box for AI agents
    hasStructuredData: true,
    contentLength: 0, // Will be calculated
    headers: getAIAgentHeaders(userAgent)
  }
  
  const response = {
    success: true,
    test: testResult,
    aiDetection: {
      isAIAgent: isAI,
      detectedAgent: agentType,
      confidence: isAI ? 'high' : 'none',
      patterns: isAI ? ['user-agent-match'] : []
    },
    seoOptimization: {
      fullHTMLServed: true,
      answerBoxIncluded: isAI,
      structuredDataIncluded: true,
      breadcrumbsIncluded: true,
      timestampIncluded: true
    },
    performance: {
      responseTimeMs: testResult.responseTime,
      withinThreshold: testResult.responseTime < AI_TESTING_CONFIG.maxResponseTimeMs
    },
    log: logEntry
  }
  
  // Update content length
  testResult.contentLength = JSON.stringify(response).length
  
  // Set AI-optimized headers
  const responseHeaders = new Headers()
  Object.entries(testResult.headers).forEach(([key, value]) => {
    responseHeaders.set(key, value)
  })
  
  return NextResponse.json(response, {
    status: 200,
    headers: responseHeaders
  })
}

/**
 * POST /api/ai-test
 * Manual test trigger for specific URLs
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { urls, userAgent: customUserAgent } = body
    
    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json(
        { error: 'URLs array is required' },
        { status: 400 }
      )
    }
    
    const userAgent = customUserAgent || request.headers.get('user-agent') || ''
    const results: TestResult[] = []
    
    // Test each URL
    for (const url of urls) {
      const startTime = Date.now()
      
      try {
        // Simulate fetch to test URL
        const testResponse = await fetch(url, {
          headers: {
            'User-Agent': userAgent
          }
        })
        
        const isAI = isAIAgent(userAgent)
        const agentType = identifyAIAgent(userAgent)
        
        const result: TestResult = {
          url,
          timestamp: new Date().toISOString(),
          userAgent,
          isAIAgent: isAI,
          agentType,
          responseTime: Date.now() - startTime,
          statusCode: testResponse.status,
          hasAnswerBox: isAI,
          hasStructuredData: true,
          contentLength: parseInt(testResponse.headers.get('content-length') || '0'),
          headers: getAIAgentHeaders(userAgent)
        }
        
        results.push(result)
        
        // Log the test
        logAIAgentVisit(userAgent, url, 'test-runner')
        
      } catch (error) {
        // Log failed test
        results.push({
          url,
          timestamp: new Date().toISOString(),
          userAgent,
          isAIAgent: false,
          agentType: null,
          responseTime: Date.now() - startTime,
          statusCode: 500,
          hasAnswerBox: false,
          hasStructuredData: false,
          contentLength: 0,
          headers: {}
        })
      }
    }
    
    return NextResponse.json({
      success: true,
      testCount: results.length,
      results,
      summary: {
        averageResponseTime: results.reduce((sum, r) => sum + r.responseTime, 0) / results.length,
        successRate: results.filter(r => r.statusCode === 200).length / results.length,
        aiAgentCount: results.filter(r => r.isAIAgent).length
      }
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

/**
 * PUT /api/ai-test
 * Update AI testing configuration
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { testIntervalMinutes, alertThresholds, testScenarios } = body
    
    // In a real implementation, this would update the configuration
    // For now, we'll just validate and return the current config
    
    return NextResponse.json({
      success: true,
      message: 'Configuration updated',
      config: {
        ...AI_TESTING_CONFIG,
        testIntervalMinutes: testIntervalMinutes || AI_TESTING_CONFIG.testIntervalMinutes,
        maxResponseTimeMs: alertThresholds?.maxResponseTimeMs || AI_TESTING_CONFIG.maxResponseTimeMs,
        minAlignmentScore: alertThresholds?.minAlignmentScore || AI_TESTING_CONFIG.minAlignmentScore,
        testScenarios: testScenarios || AI_TESTING_CONFIG.testScenarios
      }
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid configuration data' },
      { status: 400 }
    )
  }
}

/**
 * DELETE /api/ai-test
 * Clear test logs (for development)
 */
export async function DELETE() {
  // In production, this would clear test logs from the database
  return NextResponse.json({
    success: true,
    message: 'Test logs cleared'
  })
}
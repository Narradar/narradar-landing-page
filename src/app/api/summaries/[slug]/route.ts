import { NextRequest, NextResponse } from 'next/server'

// Sample data structure - in production, this would come from a database
const summaryData: Record<string, any> = {
  'what-is-apo': {
    title: 'What is APO',
    summary80: 'APO measures how AI models reinterpret your core message and helps you reduce drift against your Beacon.',
    alignment_score: 87,
    blips: [
      { model: 'gpt', category: 'omission', severity: 'medium', direction: 'away', confidence: 0.78 },
      { model: 'claude', category: 'attribution', severity: 'high', direction: 'away', confidence: 0.92 },
      { model: 'gemini', category: 'hedging', severity: 'medium', direction: 'away', confidence: 0.85 }
    ],
    facts: [
      { text: 'Beacon is the reference truth defined by the brand.', source: 'https://www.narradar.com/apo/what-is-apo' },
      { text: 'Semantic drift occurs in 67% of marketing messages when processed by multiple AI models.', source: 'https://www.narradar.com/apo/what-is-apo' },
      { text: 'APO focuses on message fidelity rather than visibility.', source: 'https://www.narradar.com/apo/what-is-apo' }
    ],
    updated: '2025-01-30'
  },
  'how-apo-works': {
    title: 'How APO Works',
    summary80: 'APO establishes your Beacon, analyzes AI model interpretations, detects blips, scores alignment, and provides optimization recommendations.',
    alignment_score: 91,
    blips: [
      { model: 'gpt', category: 'substitution', severity: 'low', direction: 'neutral', confidence: 0.65 },
      { model: 'claude', category: 'omission', severity: 'medium', direction: 'away', confidence: 0.88 }
    ],
    facts: [
      { text: 'Analysis typically completes within 5-10 minutes for standard content.', source: 'https://www.narradar.com/apo/how-apo-works' },
      { text: 'Each model is tested with 15-20 different prompt variations.', source: 'https://www.narradar.com/apo/how-apo-works' },
      { text: 'Blip detection accuracy exceeds 94% with human expert validation.', source: 'https://www.narradar.com/apo/how-apo-works' }
    ],
    updated: '2025-01-30'
  },
  'apo-vs-seo-vs-geo': {
    title: 'APO vs SEO vs GEO',
    summary80: 'SEO optimizes for search rankings, GEO for AI answer inclusion, APO for message fidelity across AI interpretations.',
    alignment_score: 89,
    blips: [
      { model: 'gpt', category: 'omission', severity: 'low', direction: 'away', confidence: 0.72 },
      { model: 'gemini', category: 'substitution', severity: 'medium', direction: 'neutral', confidence: 0.81 }
    ],
    facts: [
      { text: 'SEO focuses on search engine rankings and visibility.', source: 'https://www.narradar.com/apo/apo-vs-seo-vs-geo' },
      { text: 'GEO optimizes for AI-generated answer inclusion.', source: 'https://www.narradar.com/apo/apo-vs-seo-vs-geo' },
      { text: 'APO ensures message fidelity across all AI interpretations.', source: 'https://www.narradar.com/apo/apo-vs-seo-vs-geo' }
    ],
    updated: '2025-01-30'
  },
  'how-to-measure-drift': {
    title: 'How to Measure Drift',
    summary80: 'Drift measurement involves Beacon comparison, blip categorization, severity scoring, and temporal analysis.',
    alignment_score: 85,
    blips: [
      { model: 'gpt', category: 'hedging', severity: 'medium', direction: 'away', confidence: 0.79 },
      { model: 'claude', category: 'attribution', severity: 'high', direction: 'away', confidence: 0.94 },
      { model: 'gemini', category: 'omission', severity: 'low', direction: 'away', confidence: 0.66 }
    ],
    facts: [
      { text: 'Alignment scores range from 0-100, with higher scores indicating better fidelity.', source: 'https://www.narradar.com/apo/how-to-measure-drift' },
      { text: 'Drift patterns can be categorized into omissions, substitutions, hedging, attribution, and sentiment changes.', source: 'https://www.narradar.com/apo/how-to-measure-drift' },
      { text: 'Regular monitoring can reduce semantic drift by up to 78%.', source: 'https://www.narradar.com/apo/how-to-measure-drift' }
    ],
    updated: '2025-01-30'
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Validate slug parameter
  if (!slug) {
    return NextResponse.json(
      { error: 'Slug parameter is required' },
      { status: 400 }
    )
  }

  // Get summary data
  const data = summaryData[slug]
  
  if (!data) {
    return NextResponse.json(
      { error: 'Summary not found' },
      { status: 404 }
    )
  }

  // Return JSON response
  return NextResponse.json(data, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}

// Handle other HTTP methods
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
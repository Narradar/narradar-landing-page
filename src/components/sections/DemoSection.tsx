'use client'

import { useState } from 'react'
import { AlignmentScoreBadge, Tooltip, Card } from '@/components/ui'

const demoData = {
  original: "Our revolutionary AI platform increases productivity by 40% through advanced machine learning algorithms.",
  interpretations: {
    gpt: {
      text: "AI tool boosts productivity up to 40% with machine learning technology.",
      score: 78,
      blips: [
        { 
          type: 'omission', 
          text: 'revolutionary', 
          severity: 'medium',
          description: 'Key brand descriptor removed from interpretation',
          confidence: 92
        },
        { 
          type: 'substitution', 
          text: 'up to 40%', 
          severity: 'high',
          description: 'Definitive claim weakened with qualifier',
          confidence: 95
        },
      ]
    },
    claude: {
      text: "Platform claims 40% productivity improvement using AI algorithms.",
      score: 65,
      blips: [
        { 
          type: 'omission', 
          text: 'revolutionary', 
          severity: 'medium',
          description: 'Brand differentiator omitted',
          confidence: 88
        },
        { 
          type: 'attribution', 
          text: 'claims', 
          severity: 'high',
          description: 'Statement reframed as unverified claim',
          confidence: 94
        },
      ]
    },
    gemini: {
      text: "Machine learning platform may increase productivity by around 40%.",
      score: 62,
      blips: [
        { 
          type: 'omission', 
          text: 'revolutionary', 
          severity: 'medium',
          description: 'Key positioning term missing',
          confidence: 90
        },
        { 
          type: 'uncertainty', 
          text: 'may', 
          severity: 'high',
          description: 'Certainty reduced with uncertainty modifier',
          confidence: 96
        },
        { 
          type: 'approximation', 
          text: 'around 40%', 
          severity: 'medium',
          description: 'Precise figure made imprecise',
          confidence: 85
        },
      ]
    },
    grok: {
      text: "AI system reportedly delivers 40% efficiency gains through ML.",
      score: 71,
      blips: [
        { 
          type: 'omission', 
          text: 'revolutionary', 
          severity: 'medium',
          description: 'Strategic positioning removed',
          confidence: 87
        },
        { 
          type: 'attribution', 
          text: 'reportedly', 
          severity: 'high',
          description: 'Direct statement attributed to external source',
          confidence: 91
        },
        { 
          type: 'substitution', 
          text: 'efficiency gains', 
          severity: 'low',
          description: 'Term substitution maintains similar meaning',
          confidence: 78
        },
      ]
    }
  }
}

const blipTypes = [
  { 
    id: 'omission', 
    label: 'Omissions', 
    color: 'text-red-700 bg-red-100 border-red-200 hover:bg-red-200',
    icon: '🚫',
    description: 'Key terms or concepts removed from the original message'
  },
  { 
    id: 'substitution', 
    label: 'Substitutions', 
    color: 'text-orange-700 bg-orange-100 border-orange-200 hover:bg-orange-200',
    icon: '🔄',
    description: 'Original words replaced with different terms'
  },
  { 
    id: 'attribution', 
    label: 'Attribution Changes', 
    color: 'text-purple-700 bg-purple-100 border-purple-200 hover:bg-purple-200',
    icon: '📎',
    description: 'Statements reframed as claims or reports rather than facts'
  },
  { 
    id: 'uncertainty', 
    label: 'Added Uncertainty', 
    color: 'text-yellow-700 bg-yellow-100 border-yellow-200 hover:bg-yellow-200',
    icon: '❓',
    description: 'Confidence reduced with uncertainty modifiers'
  },
  { 
    id: 'approximation', 
    label: 'Approximations', 
    color: 'text-blue-700 bg-blue-100 border-blue-200 hover:bg-blue-200',
    icon: '≈',
    description: 'Precise numbers or statements made imprecise'
  },
]

export function DemoSection() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [selectedModel, setSelectedModel] = useState<string | null>(null)

  const toggleFilter = (type: string) => {
    setActiveFilters(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const getBlipTypeInfo = (type: string) => {
    return blipTypes.find(bt => bt.id === type)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-400'
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-sm font-medium mb-6">
            <span className="mr-2">📊</span>
            Live Demo
          </div>
          <h2 className="heading-lg text-gray-900 mb-6">One message, five realities</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            See how the same press release gets interpreted differently across AI models. 
            Each model introduces subtle changes that can significantly impact perception.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Filter by Blip Type</h3>
            <p className="text-sm text-gray-600">Click to highlight specific types of semantic changes</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {blipTypes.map((type) => (
              <Tooltip key={type.id} content={type.description}>
                <button
                  onClick={() => toggleFilter(type.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    activeFilters.includes(type.id)
                      ? type.color.replace('hover:', '')
                      : 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  aria-pressed={activeFilters.includes(type.id)}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.label}
                  {activeFilters.includes(type.id) && (
                    <span className="ml-2 w-2 h-2 bg-current rounded-full" />
                  )}
                </button>
              </Tooltip>
            ))}
            
            {activeFilters.length > 0 && (
              <button
                onClick={() => setActiveFilters([])}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-500 bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Mobile-First Demo Table */}
        <div className="space-y-6">
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Card variant="elevated" padding="none" className="overflow-hidden">
              <div className="grid grid-cols-6 divide-x divide-gray-200">
                {/* Original Column */}
                <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-3" />
                    <h3 className="text-lg font-bold text-gray-900">Original</h3>
                  </div>
                  <p className="text-gray-800 leading-relaxed mb-6 font-medium">
                    {demoData.original}
                  </p>
                  <AlignmentScoreBadge score={100} size="lg" />
                </div>

                {/* Model Columns */}
                {Object.entries(demoData.interpretations).map(([model, data]) => (
                  <div key={model} className={`p-8 transition-colors ${selectedModel === model ? 'bg-primary-25' : 'bg-white hover:bg-gray-25'}`}>
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-primary-500 rounded-full mr-3" />
                      <h3 className="text-lg font-bold text-gray-900 capitalize">{model}</h3>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {data.text}
                    </p>
                    
                    {/* Blips */}
                    <div className="space-y-3 mb-6">
                      {data.blips
                        .filter(blip => activeFilters.length === 0 || activeFilters.includes(blip.type))
                        .map((blip, index) => {
                          const blipInfo = getBlipTypeInfo(blip.type)
                          return (
                            <Tooltip 
                              key={index}
                              content={`${blip.description} (${blip.confidence}% confidence)`}
                            >
                              <div className={`inline-flex items-center px-3 py-2 rounded-lg text-xs font-medium mr-2 mb-2 border-l-4 ${getSeverityColor(blip.severity)} ${blipInfo?.color || 'text-gray-600 bg-gray-100'}`}>
                                <span className="mr-1">{blipInfo?.icon}</span>
                                {blip.text}
                                <span className="ml-2 px-1.5 py-0.5 bg-black/10 rounded text-xs">
                                  {blip.confidence}%
                                </span>
                              </div>
                            </Tooltip>
                          )
                        })}
                    </div>

                    <AlignmentScoreBadge score={data.score} size="lg" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-6">
            {/* Original Card */}
            <Card variant="elevated" className="bg-gradient-to-br from-gray-50 to-gray-100">
              <Card.Header>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-400 rounded-full mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Original Message</h3>
                </div>
              </Card.Header>
              <Card.Body>
                <p className="text-gray-800 leading-relaxed mb-4 font-medium">
                  {demoData.original}
                </p>
                <AlignmentScoreBadge score={100} size="lg" />
              </Card.Body>
            </Card>

            {/* Model Cards */}
            {Object.entries(demoData.interpretations).map(([model, data]) => (
              <Card key={model} variant="elevated" hover>
                <Card.Header>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-primary-500 rounded-full mr-3" />
                      <h3 className="text-xl font-bold text-gray-900 capitalize">{model} Interpretation</h3>
                    </div>
                    <AlignmentScoreBadge score={data.score} size="md" />
                  </div>
                </Card.Header>
                
                <Card.Body>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {data.text}
                  </p>
                  
                  {/* Blips */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Semantic Changes ({data.blips.filter(blip => activeFilters.length === 0 || activeFilters.includes(blip.type)).length})
                    </h4>
                    {data.blips
                      .filter(blip => activeFilters.length === 0 || activeFilters.includes(blip.type))
                      .map((blip, index) => {
                        const blipInfo = getBlipTypeInfo(blip.type)
                        return (
                          <div key={index} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(blip.severity)} ${blipInfo?.color?.replace('hover:', 'bg-opacity-50 ') || 'bg-gray-100'}`}>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center">
                                <span className="mr-2 text-lg">{blipInfo?.icon}</span>
                                <span className="font-semibold text-sm">{blip.text}</span>
                              </div>
                              <span className="px-2 py-1 bg-black/10 rounded text-xs font-medium">
                                {blip.confidence}%
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {blip.description}
                            </p>
                            <div className="mt-2 flex items-center">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                blip.severity === 'high' ? 'bg-red-100 text-red-800' :
                                blip.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {blip.severity.toUpperCase()} SEVERITY
                              </span>
                              <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                                {blipInfo?.label}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">4</div>
            <div className="text-sm text-gray-600">AI Models Tested</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">69</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">12</div>
            <div className="text-sm text-gray-600">Total Blips</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
            <div className="text-sm text-gray-600">Blip Types</div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card variant="glass" className="max-w-2xl mx-auto bg-gradient-to-r from-primary-50 to-accent-50">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to test your own message?
            </h3>
            <p className="text-gray-600 mb-6">
              See how AI models interpret your content with a free Beacon Check
            </p>
            <button className="btn-primary px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow">
              Run Your Beacon Check
            </button>
          </Card>
        </div>
      </div>
    </section>
  )
}
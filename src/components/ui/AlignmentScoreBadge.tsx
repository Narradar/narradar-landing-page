interface AlignmentScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function AlignmentScoreBadge({ 
  score, 
  size = 'md', 
  showLabel = true,
  className = '' 
}: AlignmentScoreBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200'
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-red-100 text-red-800 border-red-200'
  }

  const getScoreText = (score: number) => {
    if (score >= 80) return 'High Alignment'
    if (score >= 60) return 'Medium Alignment'
    return 'Low Alignment'
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span 
        className={`inline-flex items-center font-semibold rounded-full border ${getScoreColor(score)} ${sizeClasses[size]}`}
        title={`Alignment Score: ${score}/100 - ${getScoreText(score)}`}
      >
        <span className="font-mono">{score}</span>
        {size !== 'sm' && <span className="text-xs opacity-75">/100</span>}
      </span>
      {showLabel && size !== 'sm' && (
        <span className="text-xs text-gray-600 font-medium">
          {getScoreText(score)}
        </span>
      )}
    </div>
  )
}
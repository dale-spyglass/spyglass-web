'use client'

import { useEffect, useState } from 'react'

interface Span {
  name: string
  startTime: number
  endTime: number
  attributes: Record<string, any>
}

interface TraceWaterfallProps {
  traceId: string
}

export default function TraceWaterfall({ traceId }: TraceWaterfallProps) {
  const [spans, setSpans] = useState<Span[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrace() {
      try {
        const response = await fetch(`/api/traces/${traceId}`)
        const data = await response.json()
        setSpans(data.spans)
      } catch (error) {
        console.error('Error fetching trace:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrace()
  }, [traceId])

  if (loading) return <div>Loading...</div>

  const totalDuration = Math.max(...spans.map(span => span.endTime)) - Math.min(...spans.map(span => span.startTime))

  return (
    <div className="space-y-2">
      {spans.map((span, index) => {
        const startOffset = ((span.startTime - Math.min(...spans.map(s => s.startTime))) / totalDuration) * 100
        const duration = ((span.endTime - span.startTime) / totalDuration) * 100

        return (
          <div key={index} className="relative h-8">
            <div
              className="absolute h-full bg-indigo-600 rounded"
              style={{
                left: `${startOffset}%`,
                width: `${duration}%`,
              }}
            >
              <div className="px-2 py-1 text-xs text-white truncate">
                {span.name}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 
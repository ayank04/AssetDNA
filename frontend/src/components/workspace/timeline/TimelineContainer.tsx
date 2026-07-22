import * as React from "react"
import { TimelineEvent } from "@/types/models"
import { TimelineCard } from "./TimelineCard"
import { Clock } from "lucide-react"

interface TimelineContainerProps {
  events: TimelineEvent[]
  assetId: string
  isLoading: boolean
}

// Group events by day string
function groupEventsByDate(events: TimelineEvent[]) {
  const groups: Record<string, TimelineEvent[]> = {}
  
  events.forEach(event => {
    const date = new Date(event.date)
    // Create a normalized date string like "October 24, 2023"
    const dateStr = date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    if (!groups[dateStr]) {
      groups[dateStr] = []
    }
    groups[dateStr].push(event)
  })
  
  return groups
}

export function TimelineContainer({ events, assetId, isLoading }: TimelineContainerProps) {
  if (isLoading && events.length === 0) {
    return (
      <div className="relative pl-6 space-y-8 mt-6 p-4">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-border/50" />
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="relative pl-8 sm:pl-12 py-3">
            <div className="absolute left-0 top-3.5 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-muted/50 border animate-pulse z-10" />
            <div className="h-24 glass rounded-xl border animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  if (!isLoading && events.length === 0) {
    return (
      <div className="glass flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed mt-8 min-h-[400px]">
        <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
          <Clock className="h-8 w-8 text-muted-foreground opacity-50" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No timeline events</h3>
        <p className="text-muted-foreground max-w-sm">
          Try adjusting your filters or search terms. If none are active, this asset has no historical records.
        </p>
      </div>
    )
  }

  const groupedEvents = groupEventsByDate(events)

  return (
    <div className="relative pt-6 pb-12 p-4">
      {/* The Master Vertical Spine */}
      <div className="absolute left-7 sm:left-[31px] top-6 bottom-0 w-px bg-border group-hover:bg-primary/50 transition-colors z-0" />
      
      {Object.entries(groupedEvents).map(([dateStr, dayEvents]) => (
        <div key={dateStr} className="mb-8 relative z-10">
          <div className="sticky top-[130px] z-20 inline-block bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-muted-foreground uppercase tracking-wider border ml-8 sm:ml-12 mb-4 shadow-sm">
            {dateStr}
          </div>
          
          <div className="space-y-1">
            {dayEvents.map(event => (
              <TimelineCard key={event.id} event={event} assetId={assetId} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

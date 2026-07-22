import * as React from "react"
import { TimelineEvent } from "@/types/models"
import { Wrench, Search, FileText, CheckCircle, Clock, Info } from "lucide-react"
import { AnimatedSlideUp } from "@/components/animations/Motion"

interface RecentActivityProps {
  events: TimelineEvent[] | null
  isLoading?: boolean
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'maintenance': return <Wrench className="h-4 w-4" />
    case 'inspection': return <Search className="h-4 w-4" />
    case 'engineering_change': return <FileText className="h-4 w-4" />
    case 'status_change': return <CheckCircle className="h-4 w-4" />
    default: return <Info className="h-4 w-4" />
  }
}

const getEventColor = (type: string) => {
  switch (type) {
    case 'maintenance': return 'bg-warning/10 text-warning border-warning/20'
    case 'inspection': return 'bg-info/10 text-info border-info/20'
    case 'engineering_change': return 'bg-primary/10 text-primary border-primary/20'
    case 'status_change': return 'bg-success/10 text-success border-success/20'
    default: return 'bg-muted text-muted-foreground border-border'
  }
}

export function RecentActivity({ events, isLoading }: RecentActivityProps) {
  if (isLoading) {
    return (
      <div className="glass p-6 rounded-xl border flex flex-col min-h-[300px] h-full">
        <div className="h-5 w-32 bg-muted/50 rounded animate-pulse mb-6" />
        <div className="space-y-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex gap-4">
              <div className="h-8 w-8 rounded-full bg-muted/50 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                <div className="h-3 w-24 bg-muted/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!events || events.length === 0) {
    return (
      <div className="glass p-6 rounded-xl border flex flex-col items-center justify-center min-h-[300px] h-full text-center">
        <Clock className="h-8 w-8 text-muted-foreground mb-3 opacity-50" />
        <h4 className="text-sm font-semibold">No recent activity</h4>
        <p className="text-xs text-muted-foreground mt-1">Timeline events will appear here.</p>
      </div>
    )
  }

  return (
    <AnimatedSlideUp className="glass p-6 rounded-xl border h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold tracking-tight">Recent Activity</h3>
        <span className="text-[10px] font-bold text-success uppercase tracking-wider bg-success/10 px-2 py-0.5 rounded-sm">Live</span>
      </div>

      <div className="relative border-l border-border/50 ml-4 space-y-8 pb-4 flex-1">
        {events.slice(0, 5).map((event, idx) => (
          <div key={event.id} className="relative pl-6 group">
            <div className={`absolute -left-[17px] top-0 h-8 w-8 rounded-full border bg-background flex items-center justify-center shadow-sm ${getEventColor(event.type)}`}>
              {getEventIcon(event.type)}
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <p className="text-sm font-medium text-foreground leading-tight group-hover:text-primary transition-colors">
                {event.title}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {event.description}
              </p>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-1 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSlideUp>
  )
}

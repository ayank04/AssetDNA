"use client"

import * as React from "react"
import Link from "next/link"
import { TimelineEvent } from "@/types/models"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { cn } from "@/lib/utils"
import { 
  Wrench, 
  Search, 
  FileText, 
  Database, 
  StickyNote,
  Activity,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from "lucide-react"

interface TimelineCardProps {
  event: TimelineEvent
  assetId: string
}

export function TimelineCard({ event, assetId }: TimelineCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const getConfig = (type: string) => {
    switch (type) {
      case 'maintenance': return { icon: Wrench, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', link: `/assets/${assetId}/maintenance` }
      case 'inspection': return { icon: Search, color: 'text-info', bg: 'bg-info/10', border: 'border-info/20', link: `/assets/${assetId}/inspections` }
      case 'engineering_change': return { icon: FileText, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', link: `/assets/${assetId}/engineering-changes` }
      case 'status_change': return { icon: Activity, color: 'text-foreground', bg: 'bg-muted', border: 'border-border', link: null }
      case 'note': return { icon: StickyNote, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border', link: null }
      default: return { icon: Database, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border', link: null }
    }
  }

  const config = getConfig(event.type)
  const Icon = config.icon

  return (
    <AnimatedSlideUp className="relative pl-8 sm:pl-12 py-3 group">
      {/* Timeline Node */}
      <div className={cn(
        "absolute left-0 top-3.5 h-6 w-6 sm:h-8 sm:w-8 rounded-full border flex items-center justify-center shadow-sm z-10 transition-colors",
        config.bg, config.border, config.color,
        "group-hover:scale-110 duration-300 bg-background"
      )}>
        <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
      </div>

      <div className="glass card-hover rounded-xl border group relative bg-background/50 backdrop-blur-xl overflow-hidden">
        {/* Card Header (Clickable) */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 hover:bg-muted/30 transition-colors cursor-pointer"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {event.type.replace('_', ' ')}
              </span>
              <span className="text-xs text-muted-foreground opacity-50">•</span>
              <span className="text-xs text-muted-foreground font-mono">
                {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <h4 className="text-base font-semibold text-foreground truncate">{event.title}</h4>
            {!isExpanded && (
              <p className="text-sm text-muted-foreground truncate mt-1">{event.description}</p>
            )}
          </div>
          
          <div className="shrink-0 text-muted-foreground flex items-center">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="p-4 pt-0 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
            
            {(event.metadata || event.referenceId) && (
              <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {event.referenceId && (
                  <div>
                    <span className="text-xs text-muted-foreground block mb-0.5">Reference ID</span>
                    <span className="font-mono">{event.referenceId}</span>
                  </div>
                )}
                {event.metadata && Object.entries(event.metadata).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-xs text-muted-foreground block mb-0.5 capitalize">{key}</span>
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
            
            {config.link && (
              <div className="mt-4 flex justify-end">
                <Link href={config.link} className="inline-flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-full">
                  View Module <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </AnimatedSlideUp>
  )
}

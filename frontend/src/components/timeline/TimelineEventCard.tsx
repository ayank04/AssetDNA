"use client"

import * as React from "react"
import { Clock, ArrowRight, Box, Wrench, Search, FileText, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { TimelineEventType } from "@/types/models"

export interface TimelineEventRecord {
  id: string
  assetId: string
  assetName: string
  type: TimelineEventType
  title: string
  description: string
  timestamp: string
}

interface TimelineEventCardProps {
  event: TimelineEventRecord
  index?: number
  onClick?: (id: string) => void
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

export function TimelineEventCard({ event, index = 0, onClick }: TimelineEventCardProps) {
  return (
    <AnimatedSlideUp 
      delay={Math.min(index * 0.05, 0.3)}
      className="glass card-hover p-5 rounded-2xl border group flex flex-col h-full bg-background/50 backdrop-blur-xl relative overflow-hidden cursor-pointer"
      onClick={() => onClick?.(event.id)}
    >
      <div className="flex items-start gap-4">
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border ${getEventColor(event.type)}`}>
          {getEventIcon(event.type)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-base font-semibold tracking-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Box className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">{event.assetName}</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(event.timestamp).toLocaleDateString()}
            </span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50 flex justify-end">
        <Button variant="ghost" size="sm" className="h-8 group-hover:bg-primary/10 group-hover:text-primary">
          View Details <ArrowRight className="ml-2 h-3 w-3" />
        </Button>
      </div>
    </AnimatedSlideUp>
  )
}

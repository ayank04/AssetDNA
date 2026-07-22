"use client"

import * as React from "react"
import Link from "next/link"
import { TimelineEvent } from "@/types/models"
import { AnimatedFade } from "@/components/animations/Motion"
import { Clock, Wrench, Search, FileText, Database, ArrowRight } from "lucide-react"

interface RecentActivityPreviewProps {
  events: TimelineEvent[]
  isLoading?: boolean
  assetId: string
}

export function RecentActivityPreview({ events, isLoading, assetId }: RecentActivityPreviewProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'maintenance': return <Wrench className="h-4 w-4 text-warning" />
      case 'inspection': return <Search className="h-4 w-4 text-info" />
      case 'engineering_change': return <FileText className="h-4 w-4 text-primary" />
      default: return <Database className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <AnimatedFade className="glass rounded-xl border overflow-hidden h-full flex flex-col min-h-[300px]">
      <div className="p-4 border-b border-border/50 bg-muted/20 flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" /> Recent Activity
        </h3>
        <Link href={`/assets/${assetId}/timeline`} className="text-xs font-medium text-primary hover:underline flex items-center">
          View Timeline <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {isLoading ? (
          <div className="space-y-6 pl-4 border-l border-border/50 ml-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="relative pl-6">
                <div className="absolute -left-10 top-0.5 h-8 w-8 rounded-full bg-muted/50 animate-pulse border" />
                <div className="space-y-2 py-1">
                  <div className="h-3 w-3/4 bg-muted/50 rounded animate-pulse" />
                  <div className="h-2 w-1/4 bg-muted/50 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
            <Clock className="h-8 w-8 text-muted-foreground opacity-30 mb-2" />
            <p className="text-sm font-medium">No recent activity</p>
            <p className="text-xs text-muted-foreground">This asset has no recorded history.</p>
          </div>
        ) : (
          <div className="relative border-l border-border/50 ml-4 space-y-6 py-2">
            {events.map((event, idx) => (
              <div key={event.id} className="relative pl-6">
                <div className="absolute -left-[33px] top-0 h-8 w-8 rounded-full bg-background border flex items-center justify-center shadow-sm z-10">
                  {getIcon(event.type)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AnimatedFade>
  )
}

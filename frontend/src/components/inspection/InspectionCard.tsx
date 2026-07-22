"use client"

import * as React from "react"
import { Search, ArrowRight, Box, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { cn } from "@/lib/utils"

export interface InspectionRecordScaffold {
  id: string
  assetId: string
  assetName: string
  type: string
  status: "scheduled" | "in_progress" | "completed" | "failed"
  inspector: string
  scheduledDate: string
}

interface InspectionCardProps {
  record: InspectionRecordScaffold
  index?: number
  onClick?: (id: string) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-success/10 text-success border-success/20'
    case 'in_progress': return 'bg-info/10 text-info border-info/20'
    case 'failed': return 'bg-destructive/10 text-destructive border-destructive/20'
    default: return 'bg-muted text-muted-foreground border-border'
  }
}

export function InspectionCard({ record, index = 0, onClick }: InspectionCardProps) {
  return (
    <AnimatedSlideUp 
      delay={Math.min(index * 0.05, 0.3)}
      className="glass card-hover p-5 rounded-2xl border group flex flex-col h-full bg-background/50 backdrop-blur-xl relative overflow-hidden cursor-pointer"
      onClick={() => onClick?.(record.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <span className={cn("px-2 py-0.5 rounded-full border text-xs font-medium capitalize", getStatusColor(record.status))}>
          {record.status.replace('_', ' ')}
        </span>
        <span className="text-xs font-mono text-muted-foreground">{record.id.slice(0, 8)}</span>
      </div>
      
      <div className="flex-1">
        <h3 className="text-base font-semibold tracking-tight text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors capitalize">
          {record.type.replace('_', ' ')} Inspection
        </h3>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Box className="h-3.5 w-3.5 text-primary" />
          <span className="font-medium text-foreground">{record.assetName}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            <span className="truncate">{record.inspector}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(record.scheduledDate).toLocaleDateString()}
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <Button variant="ghost" size="sm" className="h-8 group-hover:bg-primary/10 group-hover:text-primary">
            View Log <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </div>
    </AnimatedSlideUp>
  )
}

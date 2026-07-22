"use client"

import * as React from "react"
import { Wrench, ArrowRight, Box, Clock, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { cn } from "@/lib/utils"

export interface MaintenanceRecordScaffold {
  id: string
  assetId: string
  assetName: string
  title: string
  type: "preventive" | "corrective" | "predictive"
  status: "scheduled" | "in_progress" | "completed" | "overdue"
  priority: "low" | "medium" | "high" | "critical"
  assignedDate: string
}

interface MaintenanceCardProps {
  record: MaintenanceRecordScaffold
  index?: number
  onClick?: (id: string) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-success/10 text-success border-success/20'
    case 'in_progress': return 'bg-primary/10 text-primary border-primary/20'
    case 'overdue': return 'bg-destructive/10 text-destructive border-destructive/20'
    default: return 'bg-muted text-muted-foreground border-border'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'text-destructive'
    case 'high': return 'text-warning'
    case 'medium': return 'text-info'
    default: return 'text-muted-foreground'
  }
}

export function MaintenanceCard({ record, index = 0, onClick }: MaintenanceCardProps) {
  return (
    <AnimatedSlideUp 
      delay={Math.min(index * 0.05, 0.3)}
      className="glass card-hover p-5 rounded-2xl border group flex flex-col h-full bg-background/50 backdrop-blur-xl relative overflow-hidden cursor-pointer"
      onClick={() => onClick?.(record.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 text-xs">
          <span className={cn("px-2 py-0.5 rounded-full border font-medium capitalize", getStatusColor(record.status))}>
            {record.status.replace('_', ' ')}
          </span>
          <span className="flex items-center gap-1 font-medium capitalize text-muted-foreground">
            <ShieldAlert className={cn("h-3.5 w-3.5", getPriorityColor(record.priority))} />
            {record.priority}
          </span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{record.id.slice(0, 8)}</span>
      </div>
      
      <div className="flex-1">
        <h3 className="text-base font-semibold tracking-tight text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {record.title}
        </h3>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Box className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">{record.assetName}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {new Date(record.assignedDate).toLocaleDateString()}
          </div>
          <Button variant="ghost" size="sm" className="h-8 group-hover:bg-primary/10 group-hover:text-primary">
            View Work Order <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </div>
    </AnimatedSlideUp>
  )
}

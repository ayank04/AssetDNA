import * as React from "react"
import { Loader2, CheckCircle, AlertCircle, PlayCircle, StopCircle } from "lucide-react"

export type AIStatus = 'ready' | 'thinking' | 'generating' | 'completed' | 'cancelled' | 'error'

export function InvestigationStatus({ status }: { status: AIStatus }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'ready':
        return { label: 'Ready', icon: PlayCircle, className: 'text-muted-foreground bg-muted/50 border-border/50' }
      case 'thinking':
        return { label: 'Thinking...', icon: Loader2, className: 'text-primary bg-primary/10 border-primary/20 animate-pulse' }
      case 'generating':
        return { label: 'Generating response...', icon: Loader2, className: 'text-info bg-info/10 border-info/20' }
      case 'completed':
        return { label: 'Completed', icon: CheckCircle, className: 'text-success bg-success/10 border-success/20' }
      case 'cancelled':
        return { label: 'Cancelled', icon: StopCircle, className: 'text-warning bg-warning/10 border-warning/20' }
      case 'error':
        return { label: 'Error', icon: AlertCircle, className: 'text-destructive bg-destructive/10 border-destructive/20' }
      default:
        return { label: 'Ready', icon: PlayCircle, className: 'text-muted-foreground bg-muted/50 border-border/50' }
    }
  }

  const { label, icon: Icon, className } = getStatusConfig()

  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}>
      <Icon className={`h-3.5 w-3.5 mr-1.5 ${status === 'thinking' || status === 'generating' ? 'animate-spin' : ''}`} />
      {label}
    </div>
  )
}

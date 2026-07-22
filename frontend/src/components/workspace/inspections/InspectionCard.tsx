"use client"

import * as React from "react"
import { Inspection } from "@/types/models"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { ChevronDown, ChevronUp, Calendar, User, Search, FileText, CheckCircle, XOctagon, AlertCircle } from "lucide-react"

interface InspectionCardProps {
  inspection: Inspection
  delay?: number
}

function InspectionBadge({ status }: { status: Inspection['status'] }) {
  let color = "bg-muted text-muted-foreground border-border"
  let label: string = status
  let Icon = Search

  if (status === 'pass') {
    color = "bg-success/10 text-success border-success/20"
    label = "Passed"
    Icon = CheckCircle
  } else if (status === 'fail') {
    color = "bg-destructive/10 text-destructive border-destructive/20"
    label = "Failed"
    Icon = XOctagon
  } else if (status === 'conditional') {
    color = "bg-warning/10 text-warning border-warning/20"
    label = "Conditional"
    Icon = AlertCircle
  }

  return (
    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${color}`}>
      <Icon className="h-3 w-3 mr-1" />
      {label}
    </div>
  )
}

export function InspectionCard({ inspection, delay = 0 }: InspectionCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <AnimatedSlideUp delay={delay} className="glass card-hover rounded-xl border group bg-background/50 backdrop-blur-xl overflow-hidden">
      {/* Header / Collapsed View */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            <InspectionBadge status={inspection.status} />
            <span className="text-xs text-muted-foreground font-mono">ID: {inspection.id.slice(0, 8)}</span>
          </div>
          <h4 className="text-base font-semibold text-foreground truncate mb-1">{inspection.title}</h4>
          {!isExpanded && (
            <p className="text-sm text-muted-foreground truncate">{inspection.findings}</p>
          )}
        </div>
        
        <div className="shrink-0 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(inspection.date).toLocaleDateString()}</span>
            </div>
            {inspection.inspector && (
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>{inspection.inspector}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted/50 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </div>
      </button>

      {/* Expanded View */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Findings
                </h5>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap bg-muted/20 p-3 rounded-lg border border-border/50">
                  {inspection.findings}
                </p>
              </div>
              
              {inspection.recommendations && (
                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Recommendations
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {inspection.recommendations}
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-4 bg-muted/20 p-4 rounded-xl border border-border/50 h-fit">
              <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/50 pb-2 mb-3">
                Inspection Details
              </h5>
              
              <div>
                <span className="text-xs text-muted-foreground block mb-0.5">Date</span>
                <span className="text-sm font-medium">{new Date(inspection.date).toLocaleDateString()}</span>
              </div>
              
              <div>
                <span className="text-xs text-muted-foreground block mb-0.5">Inspector</span>
                <span className="text-sm font-medium">{inspection.inspector}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatedSlideUp>
  )
}

"use client"

import * as React from "react"
import { MaintenanceRecord } from "@/types/models"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { ChevronDown, ChevronUp, Calendar, User, DollarSign, Wrench, FileText } from "lucide-react"
import { StatusBadge } from "@/components/assets/StatusBadge"

interface MaintenanceCardProps {
  record: MaintenanceRecord
  delay?: number
}

export function MaintenanceCard({ record, delay = 0 }: MaintenanceCardProps) {
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
            <StatusBadge status={record.status} />
            <span className="text-xs text-muted-foreground font-mono bg-muted/30 px-1 rounded">ID: {record.id.slice(0, 8)}</span>
          </div>
          <h4 className="text-base font-semibold text-foreground truncate mb-1">{record.title}</h4>
          {!isExpanded && (
            <p className="text-sm text-muted-foreground truncate">{record.description}</p>
          )}
        </div>
        
        <div className="shrink-0 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(record.scheduledDate).toLocaleDateString()}</span>
            </div>
            {record.technician && (
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>{record.technician}</span>
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
                  <FileText className="h-3.5 w-3.5" /> Description
                </h5>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap bg-muted/20 p-3 rounded-lg border border-border/50">
                  {record.description}
                </p>
              </div>
              
              {record.notes && (
                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Technician Notes
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {record.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4 bg-muted/20 p-4 rounded-xl border border-border/50 h-fit">
              <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/50 pb-2 mb-3">
                Work Details
              </h5>
              
              {record.completedDate && (
                <div>
                  <span className="text-xs text-muted-foreground block mb-0.5">Completed Date</span>
                  <span className="text-sm font-medium">{new Date(record.completedDate).toLocaleDateString()}</span>
                </div>
              )}
              
              {record.cost !== undefined && (
                <div>
                  <span className="text-xs text-muted-foreground block mb-0.5">Total Cost</span>
                  <span className="text-sm font-medium flex items-center">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground mr-0.5" />
                    {record.cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}
              
              {record.partsReplaced && record.partsReplaced.length > 0 && (
                <div>
                  <span className="text-xs text-muted-foreground block mb-1.5">Parts Replaced</span>
                  <ul className="space-y-1">
                    {record.partsReplaced.map((part, idx) => (
                      <li key={idx} className="text-xs flex items-start gap-1.5 bg-background p-1.5 rounded border border-border/50">
                        <Wrench className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                        <span className="truncate" title={part}>{part}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AnimatedSlideUp>
  )
}

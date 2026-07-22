import * as React from "react"
import { Clock, Zap, Search, Database } from "lucide-react"

interface InvestigationSummaryCardProps {
  metadata: Record<string, any>;
}

export function InvestigationSummaryCard({ metadata }: InvestigationSummaryCardProps) {
  if (!metadata || Object.keys(metadata).length === 0) return null;

  return (
    <div className="mt-4 mb-2 p-4 bg-background border border-border/50 rounded-xl overflow-hidden relative group">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
      <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
        <Zap className="h-3 w-3 text-primary" /> Investigation Summary
      </h5>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {metadata.latency && (
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> Time
            </span>
            <span className="text-xs font-medium text-foreground">
              {(metadata.latency / 1000).toFixed(2)}s
            </span>
          </div>
        )}
        
        {metadata.evidenceCount !== undefined && (
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Search className="h-3 w-3" /> Evidence Found
            </span>
            <span className="text-xs font-medium text-foreground">
              {metadata.evidenceCount} items
            </span>
          </div>
        )}
        
        {metadata.documentsUsed !== undefined && (
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Database className="h-3 w-3" /> Documents Used
            </span>
            <span className="text-xs font-medium text-foreground">
              {metadata.documentsUsed}
            </span>
          </div>
        )}

        {metadata.model && (
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Zap className="h-3 w-3" /> Model
            </span>
            <span className="text-xs font-medium text-foreground capitalize">
              {metadata.model.split('/').pop() || metadata.model}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

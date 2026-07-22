import * as React from "react"
import { AIStatus, InvestigationStatus } from "./InvestigationStatus"
import { Trash2, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface InvestigationHeaderProps {
  assetName: string;
  status: AIStatus;
  onClear: () => void;
  onNew: () => void;
}

export function InvestigationHeader({ assetName, status, onClear, onNew }: InvestigationHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/95 backdrop-blur z-10 sticky top-0 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-semibold flex items-center gap-2">
            AI Investigation
            <span className="text-muted-foreground font-normal hidden sm:inline-block">/ {assetName}</span>
          </h2>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <InvestigationStatus status={status} />
        
        <div className="h-4 w-px bg-border/50 mx-1 hidden sm:block" />
        
        <Button variant="ghost" size="sm" onClick={onClear} className="hidden sm:flex h-8 px-2 text-muted-foreground hover:text-destructive">
          <Trash2 className="h-3.5 w-3.5 mr-1.5" />
          Clear
        </Button>
        <Button variant="default" size="sm" onClick={onNew} className="h-8 px-3">
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          New Search
        </Button>
      </div>
    </div>
  )
}

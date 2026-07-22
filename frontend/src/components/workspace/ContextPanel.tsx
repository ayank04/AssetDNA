"use client"

import * as React from "react"
import { useWorkspace } from "./WorkspaceProvider"
import { cn } from "@/lib/utils"
import { 
  ChevronLeft,
  ChevronRight,
  Info,
  Activity,
  FileText
} from "lucide-react"

export function ContextPanel() {
  const { asset, isContextPanelCollapsed, setContextPanelCollapsed } = useWorkspace()
  
  if (!asset) return null

  return (
    <aside className={cn(
      "h-full border-l border-border/50 bg-background/50 backdrop-blur-xl transition-all duration-300 flex flex-col relative z-20 shrink-0",
      isContextPanelCollapsed ? "w-12" : "w-80"
    )}>
      <div className="p-4 flex items-center border-b border-border/50 h-16 shrink-0 relative">
        <button 
          onClick={() => setContextPanelCollapsed(!isContextPanelCollapsed)}
          className={cn("h-8 w-8 rounded-md flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors absolute left-2")}
        >
          {isContextPanelCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        
        {!isContextPanelCollapsed && (
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-10">Asset Context</span>
        )}
      </div>

      {!isContextPanelCollapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Metadata Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" /> Quick Facts
            </h3>
            <div className="space-y-3">
              <div className="glass p-3 rounded-lg border text-sm">
                <span className="text-muted-foreground block text-xs mb-1">Manufacturer</span>
                <span className="font-medium">{asset.metadata?.manufacturer || 'Unknown'}</span>
              </div>
              <div className="glass p-3 rounded-lg border text-sm">
                <span className="text-muted-foreground block text-xs mb-1">Installation Date</span>
                <span className="font-medium">{asset.metadata?.installationDate || 'Unknown'}</span>
              </div>
            </div>
          </div>

          {/* Health Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Health
            </h3>
            <div className="glass p-4 rounded-lg border text-sm flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Criticality</span>
                <span className="font-semibold text-destructive">High</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-destructive h-full w-3/4 rounded-full" />
              </div>
            </div>
          </div>
          
          {/* Pinned Documents Placeholder */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> Pinned Documents
            </h3>
            <div className="glass p-4 rounded-lg border border-dashed text-center">
              <p className="text-xs text-muted-foreground">No documents pinned.</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

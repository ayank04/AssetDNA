"use client"

import * as React from "react"
import Link from "next/link"
import { Asset } from "@/types/models"
import { StatusBadge } from "./StatusBadge"
import { MapPin, ArrowRight, Brain, Wrench, FileText, Search, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { cn } from "@/lib/utils"

interface AssetCardProps {
  asset: Asset
  index?: number
  onPreview?: (assetId: string) => void
}

export const AssetCard = React.memo(function AssetCard({ asset, index = 0, onPreview }: AssetCardProps) {
  // Determine if it's healthy or critical for the ring indicator
  const isCritical = asset.status === 'decommissioned' || asset.status === 'inactive'
  const isWarning = asset.status === 'maintenance'
  
  const ringColor = isCritical 
    ? "ring-destructive/30 bg-destructive/10 text-destructive"
    : isWarning 
    ? "ring-warning/30 bg-warning/10 text-warning" 
    : "ring-success/30 bg-success/10 text-success"

  return (
    <AnimatedSlideUp 
      delay={Math.min(index * 0.05, 0.3)} 
      className="glass card-hover p-5 rounded-2xl border group flex flex-col h-full bg-background/50 backdrop-blur-xl relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ring-2 ring-offset-2 ring-offset-background", ringColor)}>
            <div className={cn("w-2 h-2 rounded-full", isCritical || isWarning ? "animate-pulse bg-current" : "bg-current")} />
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground line-clamp-1" title={asset.name}>
              {asset.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
              <span className="font-mono bg-muted/50 px-1 rounded">{asset.id.slice(0, 8)}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="capitalize">{asset.type.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {onPreview && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onPreview(asset.id)
              }}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
          <StatusBadge status={asset.status} />
        </div>
      </div>
      
      <div className="flex-1 relative z-10">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[40px]">
          {asset.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-6 bg-muted/30 px-3 py-2 rounded-lg border border-border/50">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{asset.location || "Unknown Location"}</span>
        </div>
      </div>
      
      {/* Quick Actions Row */}
      <div className="mt-auto pt-4 border-t border-border/50 relative z-10">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <Link href={`/assets/${asset.id}/maintenance`} tabIndex={-1}>
            <Button variant="ghost" size="sm" className="w-full h-8 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted">
              <Wrench className="h-3.5 w-3.5 mr-1.5" /> Tasks
            </Button>
          </Link>
          <Link href={`/assets/${asset.id}/documents`} tabIndex={-1}>
            <Button variant="ghost" size="sm" className="w-full h-8 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted">
              <FileText className="h-3.5 w-3.5 mr-1.5" /> Docs
            </Button>
          </Link>
          <Link href={`/assets/${asset.id}`} tabIndex={-1}>
            <Button variant="ghost" size="sm" className="w-full h-8 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted">
              <Search className="h-3.5 w-3.5 mr-1.5" /> View
            </Button>
          </Link>
        </div>

        <Link href={`/assets/${asset.id}/investigate`} tabIndex={-1}>
          <Button variant="secondary" className="w-full justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm border border-transparent group-hover:border-primary/20 bg-background/80">
            <Brain className="h-4 w-4 mr-2" /> AI Investigate
            <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-auto" />
          </Button>
        </Link>
      </div>
    </AnimatedSlideUp>
  )
})

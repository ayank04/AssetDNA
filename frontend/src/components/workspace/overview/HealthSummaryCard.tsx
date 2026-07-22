"use client"

import * as React from "react"
import { Asset } from "@/types/models"
import { AnimatedFade } from "@/components/animations/Motion"
import { Activity, ShieldCheck, AlertCircle, XOctagon } from "lucide-react"
import { StatusBadge } from "@/components/assets/StatusBadge"

interface HealthSummaryCardProps {
  asset: Asset
}

export function HealthSummaryCard({ asset }: HealthSummaryCardProps) {
  // Use metadata health score if available, otherwise fallback to standard status
  const score = asset.metadata?.healthScore ? Number(asset.metadata.healthScore) : undefined
  
  let icon = <ShieldCheck className="h-10 w-10 text-success opacity-80" />
  let color = "bg-success"
  let description = "Asset is operating within normal parameters."
  
  if (asset.status === 'maintenance') {
    icon = <AlertCircle className="h-10 w-10 text-warning opacity-80" />
    color = "bg-warning"
    description = "Asset is currently undergoing maintenance."
  } else if (asset.status === 'decommissioned' || asset.status === 'inactive') {
    icon = <XOctagon className="h-10 w-10 text-muted-foreground opacity-80" />
    color = "bg-muted-foreground"
    description = "Asset is not currently operational."
  } else if (score && score < 70) {
    icon = <AlertCircle className="h-10 w-10 text-warning opacity-80" />
    color = "bg-warning"
    description = "Asset health is degrading. Attention recommended."
  } else if (score && score < 40) {
    icon = <XOctagon className="h-10 w-10 text-destructive opacity-80" />
    color = "bg-destructive"
    description = "Critical health warning. Immediate action required."
  }

  return (
    <AnimatedFade className="glass rounded-xl border h-full flex flex-col justify-between min-h-[300px]">
      <div className="p-4 border-b border-border/50 bg-muted/20">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" /> Health Summary
        </h3>
      </div>
      
      <div className="p-6 flex flex-col items-center justify-center text-center flex-1">
        <div className="h-20 w-20 rounded-full bg-background border flex items-center justify-center mb-4 relative shadow-elevation-1">
          {icon}
          {score !== undefined && (
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-muted/30" />
              <circle 
                cx="50" cy="50" r="46" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeDasharray={`${score * 2.89} 289`}
                className={color.replace('bg-', 'text-')}
              />
            </svg>
          )}
        </div>
        
        {score !== undefined ? (
          <div className="text-3xl font-bold mb-1">{score}<span className="text-lg text-muted-foreground">%</span></div>
        ) : (
          <div className="mb-2"><StatusBadge status={asset.status} /></div>
        )}
        
        <p className="text-xs text-muted-foreground max-w-[200px] mt-2">
          {description}
        </p>
      </div>
    </AnimatedFade>
  )
}

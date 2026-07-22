"use client"

import * as React from "react"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { Asset } from "@/types/models"
import { AlertTriangle, Wrench, ArrowRight, ShieldAlert, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface PriorityAssetsProps {
  assets: Asset[] | null
  isLoading?: boolean
}

export function PriorityAssets({ assets, isLoading }: PriorityAssetsProps) {
  if (isLoading) {
    return (
      <AnimatedSlideUp className="glass p-6 rounded-xl border flex flex-col gap-4">
        <div className="h-6 w-48 bg-muted rounded animate-pulse" />
        <div className="space-y-3 mt-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 w-full bg-muted/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </AnimatedSlideUp>
    )
  }

  const priorityAssets = (assets || [])
    .filter(a => a.status === 'maintenance' || a.status === 'decommissioned' || a.status === 'inactive')
    .slice(0, 3)

  if (priorityAssets.length === 0) {
    return (
      <AnimatedSlideUp className="glass p-6 rounded-xl border border-dashed flex flex-col items-center justify-center min-h-[300px]">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-3">
          <ShieldAlert className="h-5 w-5 text-success" />
        </div>
        <h4 className="text-sm font-semibold">No critical issues</h4>
        <p className="text-xs text-muted-foreground mt-1 text-center max-w-[250px]">
          All assets are currently operating within nominal parameters.
        </p>
      </AnimatedSlideUp>
    )
  }

  // Generate fake AI reasons and recommendations for demo
  const getAiContext = (assetId: string) => {
    const seed = assetId.charCodeAt(0) + assetId.charCodeAt(assetId.length - 1)
    if (seed % 3 === 0) {
      return {
        risk: "Critical",
        reason: "Vibration signature indicates imminent bearing failure.",
        recommendation: "Immediate replacement of thrust bearings recommended."
      }
    } else if (seed % 3 === 1) {
      return {
        risk: "High",
        reason: "Consecutive thermal anomalies detected during peak load.",
        recommendation: "Inspect cooling system and check fluid levels."
      }
    } else {
      return {
        risk: "Moderate",
        reason: "Maintenance interval exceeded by 14 days.",
        recommendation: "Perform routine lubrication and seal check."
      }
    }
  }

  return (
    <AnimatedSlideUp className="glass p-6 rounded-xl border h-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold tracking-tight">Priority Assets</h3>
          <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
        </div>
        <span className="text-xs font-medium bg-destructive/10 text-destructive px-2 py-1 rounded-full border border-destructive/20">
          {priorityAssets.length} Critical
        </span>
      </div>

      <div className="space-y-4">
        {priorityAssets.map((asset) => {
          const aiContext = getAiContext(asset.id)
          return (
            <div key={asset.id} className="group relative bg-background/50 border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-colors shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <Link href={`/assets/${asset.id}`} className="font-semibold text-base hover:text-primary transition-colors hover:underline">
                    {asset.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border",
                      aiContext.risk === 'Critical' ? "bg-destructive/10 text-destructive border-destructive/20" : 
                      aiContext.risk === 'High' ? "bg-warning/10 text-warning border-warning/20" : 
                      "bg-info/10 text-info border-info/20"
                    )}>
                      Risk: {aiContext.risk}
                    </span>
                  </div>
                </div>
                <Link href={`/assets/${asset.id}/investigate`} tabIndex={-1}>
                  <Button size="sm" className="h-8 text-xs font-medium shrink-0 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                    Investigate <ArrowRight className="ml-1.5 h-3 w-3" />
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-2 text-sm bg-muted/20 p-3 rounded-lg border border-border/30">
                <div>
                  <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider block mb-0.5">Reason</span>
                  <span className="text-foreground">{aiContext.reason}</span>
                </div>
                <div className="pt-2 border-t border-border/30">
                  <span className="text-primary/80 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 mb-0.5">
                    <Sparkles className="h-3 w-3" /> AI Recommendation
                  </span>
                  <span className="text-foreground">{aiContext.recommendation}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </AnimatedSlideUp>
  )
}

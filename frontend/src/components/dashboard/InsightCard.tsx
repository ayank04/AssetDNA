import * as React from "react"
import { Sparkles, ArrowRight, Loader2, Info } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

interface InsightCardProps {
  isLoading?: boolean
  hasData?: boolean
}

export function InsightCard({ isLoading, hasData = true }: InsightCardProps) {
  if (isLoading) {
    return (
      <div className="glass p-6 rounded-xl border relative overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
        <div className="absolute inset-0 bg-primary/5 animate-pulse" />
        <Loader2 className="h-6 w-6 text-primary animate-spin mb-4" />
        <p className="text-sm font-medium text-muted-foreground">Generating contextual insights...</p>
      </div>
    )
  }

  if (!hasData) {
    return (
      <div className="glass p-6 rounded-xl border border-dashed flex flex-col items-center justify-center min-h-[220px] text-center gap-3 bg-muted/20">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          <Info className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h4 className="text-sm font-semibold">No active insights</h4>
          <p className="text-xs text-muted-foreground max-w-[200px] mt-1 mx-auto">Start an AI investigation on an asset to see recommendations here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass p-6 rounded-xl border border-primary/20 relative overflow-hidden group hover:shadow-elevation-2 transition-all flex flex-col min-h-[220px]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 group-hover:bg-primary/20 transition-all" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary gap-1.5">
          <Sparkles className="h-3 w-3" />
          AI Recommendation
        </div>
        <span className="text-xs text-muted-foreground font-medium">Just now</span>
      </div>
      
      <h3 className="text-base font-semibold text-foreground mb-2 leading-tight">
        Potential seal failure detected on Pump-X402
      </h3>
      
      <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
        Cross-referencing the latest vibration anomaly (2.4g) with historical maintenance logs suggests a high probability of impending mechanical seal failure within 48 hours.
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-muted text-[10px] font-bold">2</span>
          <span className="text-xs font-medium text-muted-foreground">Sources cited</span>
        </div>
        <Link href="/assets" tabIndex={-1}>
          <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold hover:bg-primary/10 hover:text-primary">
            View Analysis <ArrowRight className="ml-1.5 h-3 w-3" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

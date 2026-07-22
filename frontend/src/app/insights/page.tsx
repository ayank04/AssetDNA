"use client"

import * as React from "react"
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute"
import { AnimatedFade, AnimatedSlideUp } from "@/components/animations/Motion"
import { Sparkles, Activity, AlertTriangle, Lightbulb } from "lucide-react"

import { AIInsightCard } from "@/components/dashboard/AIInsightCard"
import { PlantHealthChart } from "@/components/dashboard/PlantHealthChart"
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection"

import { useApi } from "@/hooks/core-hooks"
import { AssetService } from "@/services"

export default function InsightsPage() {
  const { data: assetsData, isLoading: isLoadingAssets, execute: fetchAssets } = useApi(AssetService.getAll)

  React.useEffect(() => {
    fetchAssets({ limit: 100, offset: 0 })
  }, [fetchAssets])

  const assets = assetsData?.data || []
  
  return (
    <ProtectedRoute>
      <AnimatedFade className="p-4 sm:p-6 md:p-8 max-w-[1600px] mx-auto w-full">
        
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/50 pb-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" /> AI Insights
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              Deep operational intelligence and predictive fleet analytics.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          <div className="flex flex-col gap-6 xl:col-span-2">
            
            <AnimatedSlideUp className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-warning" /> AI Recommendations
              </h2>
              <AIInsightCard isLoading={isLoadingAssets} />
            </AnimatedSlideUp>

            <AnimatedSlideUp className="space-y-4" delay={0.1}>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-info" /> Risk Heatmap & Health
              </h2>
              <PlantHealthChart assets={assets} isLoading={isLoadingAssets} />
            </AnimatedSlideUp>
            
            <AnimatedSlideUp className="space-y-4" delay={0.2}>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" /> Failure Trends
              </h2>
              <AnalyticsSection isLoading={isLoadingAssets} />
            </AnimatedSlideUp>

          </div>

          <div className="flex flex-col gap-6">
            <AnimatedSlideUp className="glass rounded-xl p-6 border border-border/50 h-full">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Knowledge Highlights
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2 border-b border-border/30 pb-4">
                  <h3 className="font-medium text-sm text-foreground">Most referenced document this week</h3>
                  <p className="text-xs text-muted-foreground">OEM Compressor Manual v2</p>
                  <div className="text-xs font-semibold text-primary/80 bg-primary/10 px-2 py-1 rounded inline-block">Used in 14 investigations</div>
                </div>

                <div className="space-y-2 border-b border-border/30 pb-4">
                  <h3 className="font-medium text-sm text-foreground">Common failure mode detected</h3>
                  <p className="text-xs text-muted-foreground">Seal degradation due to sustained vibration above 2.4mm/s.</p>
                  <div className="text-xs font-semibold text-destructive/80 bg-destructive/10 px-2 py-1 rounded inline-block">Affects 3 assets</div>
                </div>

                <div className="space-y-2 border-b border-border/30 pb-4">
                  <h3 className="font-medium text-sm text-foreground">Maintenance efficiency</h3>
                  <p className="text-xs text-muted-foreground">Mean Time To Repair (MTTR) has improved by 12% across the fleet.</p>
                  <div className="text-xs font-semibold text-success/80 bg-success/10 px-2 py-1 rounded inline-block">Trending Positive</div>
                </div>
              </div>
            </AnimatedSlideUp>
          </div>

        </div>

      </AnimatedFade>
    </ProtectedRoute>
  )
}

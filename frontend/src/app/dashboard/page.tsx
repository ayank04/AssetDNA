"use client"

import * as React from "react"
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute"
import { AnimatedFade } from "@/components/animations/Motion"

import { DashboardHero } from "@/components/dashboard/DashboardHero"
import { KPIGrid } from "@/components/dashboard/KPIGrid"
import { AIInsightCard } from "@/components/dashboard/AIInsightCard"
import { PlantHealthChart } from "@/components/dashboard/PlantHealthChart"
import { PriorityAssets } from "@/components/dashboard/PriorityAssets"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { RecentInvestigations } from "@/components/dashboard/RecentInvestigations"
import { RecentDocuments } from "@/components/dashboard/RecentDocuments"
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection"

import { useApi } from "@/hooks/core-hooks"
import { AssetService, TimelineService } from "@/services"

export default function DashboardPage() {
  const { data: assetsData, isLoading: isLoadingAssets, execute: fetchAssets } = useApi(AssetService.getAll)
  const { data: timelineData, isLoading: isLoadingTimeline, execute: fetchTimeline } = useApi(TimelineService.getEvents)

  React.useEffect(() => {
    fetchAssets({ limit: 100, offset: 0 })
  }, [fetchAssets])

  // Fetch some timeline data from a critical asset to simulate global feed
  const assets = assetsData?.data || []
  const firstCriticalAsset = assets.find(a => a.status !== 'active')
  
  React.useEffect(() => {
    if (firstCriticalAsset) {
      fetchTimeline(firstCriticalAsset.id, { limit: 10 }, { sortBy: 'date', sortOrder: 'desc' })
    }
  }, [firstCriticalAsset, fetchTimeline])

  const timelineEvents = timelineData?.data || []

  // Derived KPIs from what we can infer (Realistic demo scaling)
  const healthyAssetsCount = assets.filter(a => a.status === 'active').length
  const criticalAssetsCount = assets.filter(a => a.status === 'decommissioned' || a.status === 'inactive' || a.status === 'maintenance').length
  
  // Faking global stats for demo enterprise density
  const openMaintCount = assets.length > 0 ? assets.length * 3 + 12 : 0
  const openInspCount = assets.length > 0 ? assets.length * 2 + 5 : 0
  const openEngCount = assets.length > 0 ? 14 : 0
  const totalDocsCount = assets.length > 0 ? assets.length * 8 : 0
  const evidenceCount = assets.length > 0 ? assets.length * 15 : 0
  const aiInvestigationsCount = assets.length > 0 ? 4 : 0

  const isGlobalLoading = isLoadingAssets

  return (
    <ProtectedRoute>
      <AnimatedFade className="p-4 sm:p-6 md:p-8 max-w-[1600px] mx-auto w-full">
        <DashboardHero isLoading={isGlobalLoading} />
        
        <KPIGrid 
          isLoading={isGlobalLoading}
          assetsCount={assets.length}
          healthyAssetsCount={healthyAssetsCount}
          criticalAssetsCount={criticalAssetsCount}
          maintenanceDueCount={openMaintCount}
          openInspectionsCount={openInspCount}
          engineeringChangesCount={openEngCount}
          documentsCount={totalDocsCount}
          evidenceCount={evidenceCount}
          aiInvestigationsCount={aiInvestigationsCount}
        />

        {/* Adaptive Masonry / Grid Layout for Widgets */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left Column - Primary Insights & Health */}
          <div className="flex flex-col gap-6 xl:col-span-2">
            <AIInsightCard isLoading={isGlobalLoading} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlantHealthChart assets={assets} isLoading={isLoadingAssets} />
              <PriorityAssets assets={assets} isLoading={isLoadingAssets} />
            </div>

            <AnalyticsSection isLoading={isGlobalLoading} />
          </div>

          {/* Right Column - Activity & Feeds */}
          <div className="flex flex-col gap-6">
            <QuickActions />
            
            <RecentInvestigations isLoading={isGlobalLoading} />
            
            {/* Enterprise density placeholders */}
            <div className="glass rounded-xl p-5 border border-border/50">
              <h3 className="text-sm font-semibold mb-3 text-primary">Recent Documents</h3>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex justify-between items-center text-xs p-2 rounded bg-muted/10 border border-border/30 hover:bg-muted/30 cursor-pointer">
                    <span className="truncate w-3/4">Operational_SOP_v{i}.pdf</span>
                    <span className="text-muted-foreground">{i}h ago</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              <RecentActivity events={timelineEvents} isLoading={isLoadingTimeline || isGlobalLoading} />
            </div>
          </div>

        </div>
      </AnimatedFade>
    </ProtectedRoute>
  )
}

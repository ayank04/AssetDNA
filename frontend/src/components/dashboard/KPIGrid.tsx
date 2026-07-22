"use client"

import * as React from "react"
import { MetricCard } from "./MetricCard"
import { Database, Wrench, AlertTriangle, CheckCircle, FileText, FileEdit, ShieldAlert, Brain } from "lucide-react"

interface KPIGridProps {
  isLoading?: boolean
  assetsCount: number
  healthyAssetsCount: number
  criticalAssetsCount: number
  maintenanceDueCount: number
  openInspectionsCount: number
  engineeringChangesCount: number
  documentsCount: number
  evidenceCount: number
  aiInvestigationsCount: number
}

export function KPIGrid(props: KPIGridProps) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 md:gap-4 mb-6">
      <MetricCard 
        title="Total Assets" 
        value={props.assetsCount} 
        icon={Database} 
        isLoading={props.isLoading} 
        delay={0.1}
      />
      <MetricCard 
        title="Healthy Assets" 
        value={props.healthyAssetsCount} 
        icon={CheckCircle}
        trend={{ value: 92, label: "Uptime", isPositive: true }}
        isLoading={props.isLoading} 
        delay={0.15}
      />
      <MetricCard 
        title="Critical Assets" 
        value={props.criticalAssetsCount} 
        icon={AlertTriangle}
        trend={{ value: 12, label: "Needs attention", isPositive: false }}
        isLoading={props.isLoading} 
        delay={0.2}
      />
      <MetricCard 
        title="Maintenance Due" 
        value={props.maintenanceDueCount} 
        icon={Wrench} 
        description="Tasks pending resolution"
        isLoading={props.isLoading} 
        delay={0.25}
      />
      <MetricCard 
        title="AI Investigations" 
        value={props.aiInvestigationsCount} 
        icon={Brain} 
        description="Analyses performed"
        isLoading={props.isLoading} 
        delay={0.3}
      />
    </section>
  )
}

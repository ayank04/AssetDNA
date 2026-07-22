"use client"

import * as React from "react"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { QuickActionCard } from "./QuickActionCard"
import { Search, Box, FileText, Wrench, Clock, ShieldAlert, Sparkles, Activity } from "lucide-react"

export function QuickActions() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">Quick Actions</h3>
      <AnimatedSlideUp className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuickActionCard 
          title="Asset Explorer" 
          description="View all machinery and systems" 
          icon={Box} 
          href="/assets" 
        />
        <QuickActionCard 
          title="Maintenance Planner" 
          description="View AI-prioritized schedule" 
          icon={Wrench} 
          href="/planner" 
        />
        <QuickActionCard 
          title="Knowledge Assistant" 
          description="Ask fleet-wide questions" 
          icon={Sparkles} 
          href="/assistant" 
        />
        <QuickActionCard 
          title="AI Insights" 
          description="View risk and failure trends" 
          icon={Activity} 
          href="/insights" 
        />
        <QuickActionCard 
          title="Global Search" 
          description="Search across all data" 
          icon={Search} 
          href="/search" 
        />
      </AnimatedSlideUp>
    </div>
  )
}

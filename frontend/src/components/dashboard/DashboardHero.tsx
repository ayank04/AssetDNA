"use client"

import * as React from "react"
import { useAuth } from "@/features/auth/providers/AuthProvider"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { Sparkles, AlertTriangle, CheckCircle, FileText, Activity } from "lucide-react"

interface DashboardHeroProps {
  isLoading?: boolean
}

export function DashboardHero({ isLoading }: DashboardHeroProps) {
  const { user } = useAuth()
  
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 mb-8">
        <div className="h-40 w-full bg-muted animate-pulse rounded-2xl" />
      </div>
    )
  }

  return (
    <AnimatedSlideUp className="mb-8">
      <div className="glass rounded-3xl p-6 md:p-8 border border-border/50 relative overflow-hidden bg-gradient-to-br from-background/80 to-muted/20">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 shadow-sm">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
                Today's AI Briefing
              </h1>
              <p className="text-sm text-muted-foreground">
                Prepared for {user?.email?.split('@')[0] || 'Engineer'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            
            {/* Finding 1 */}
            <div className="bg-background/60 border border-border/50 p-4 rounded-2xl flex flex-col gap-2">
              <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
                <AlertTriangle className="h-4 w-4" /> Critical Finding
              </div>
              <p className="text-sm font-medium">Boiler Feed Pump P-101 showing abnormal vibration signatures.</p>
              <p className="text-xs text-muted-foreground mt-auto pt-2 border-t border-border/50">High probability of seal failure.</p>
            </div>

            {/* Finding 2 */}
            <div className="bg-background/60 border border-border/50 p-4 rounded-2xl flex flex-col gap-2">
              <div className="flex items-center gap-2 text-warning font-semibold text-sm">
                <Activity className="h-4 w-4" /> High-Risk Asset
              </div>
              <p className="text-sm font-medium">Compressor C-204 maintenance overdue by 14 days.</p>
              <p className="text-xs text-muted-foreground mt-auto pt-2 border-t border-border/50">Performance degrading by 2.4% weekly.</p>
            </div>

            {/* Finding 3 */}
            <div className="bg-background/60 border border-border/50 p-4 rounded-2xl flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <CheckCircle className="h-4 w-4" /> Recommended Action
              </div>
              <p className="text-sm font-medium">Schedule immediate bearing inspection for P-101.</p>
              <p className="text-xs text-muted-foreground mt-auto pt-2 border-t border-border/50">Will prevent estimated 12h downtime.</p>
            </div>

            {/* Finding 4 */}
            <div className="bg-background/60 border border-border/50 p-4 rounded-2xl flex flex-col gap-2">
              <div className="flex items-center gap-2 text-info font-semibold text-sm">
                <FileText className="h-4 w-4" /> Investigation Highlight
              </div>
              <p className="text-sm font-medium">New anomaly pattern detected in HVAC Unit 3.</p>
              <p className="text-xs text-muted-foreground mt-auto pt-2 border-t border-border/50">Matches historical failure from 2024.</p>
            </div>

          </div>
        </div>
      </div>
    </AnimatedSlideUp>
  )
}

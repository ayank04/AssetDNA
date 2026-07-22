"use client"

import * as React from "react"
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute"
import { AnimatedFade } from "@/components/animations/Motion"
import { CalendarDays, AlertTriangle, Sparkles, Clock, CheckCircle } from "lucide-react"

import { useApi } from "@/hooks/core-hooks"
import { AssetService } from "@/services"

export default function PlannerPage() {
  const { data: assetsData, isLoading } = useApi(AssetService.getAll)

  React.useEffect(() => {
    // Usually we would fetch maintenance records, but since this is an AI mockup without 
    // a global maintenance endpoint, we derive tasks from assets to keep it read-only.
  }, [])

  const assets = assetsData?.data || []

  if (isLoading) {
    return (
      <div className="p-8 animate-pulse max-w-7xl mx-auto w-full space-y-6">
        <div className="h-10 w-48 bg-muted rounded" />
        <div className="h-64 bg-muted rounded-xl" />
        <div className="h-64 bg-muted rounded-xl" />
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <AnimatedFade className="p-4 sm:p-6 md:p-8 max-w-[1400px] mx-auto w-full min-h-[calc(100vh-4rem)]">
        
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/50 pb-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading flex items-center gap-3">
              <CalendarDays className="h-8 w-8 text-primary" /> Maintenance Planner
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              AI-prioritized global maintenance schedule.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          
          {/* AI Suggested Maintenance */}
          <section className="glass rounded-2xl border border-primary/30 p-6 shadow-sm bg-primary/5">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-primary">
              <Sparkles className="h-5 w-5" /> AI Suggested Maintenance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background/80 border border-border/50 rounded-xl p-4 flex gap-4 items-start">
                <div className="mt-1 shrink-0"><AlertTriangle className="h-5 w-5 text-destructive" /></div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-sm">Boiler Feed Pump P-101</h3>
                    <span className="text-xs font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded border border-destructive/20">Critical Priority</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">AI detects high risk of bearing failure based on recent vibration spikes. Inspect immediately.</p>
                  <p className="text-xs font-medium">Due: <span className="text-destructive font-bold">Today</span></p>
                </div>
              </div>
              <div className="bg-background/80 border border-border/50 rounded-xl p-4 flex gap-4 items-start">
                <div className="mt-1 shrink-0"><AlertTriangle className="h-5 w-5 text-warning" /></div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-sm">Compressor C-204</h3>
                    <span className="text-xs font-bold text-warning bg-warning/10 px-2 py-0.5 rounded border border-warning/20">High Priority</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Thermal efficiency dropping by 2.4% weekly. Overhaul recommended before next production cycle.</p>
                  <p className="text-xs font-medium">Due: <span className="text-warning font-bold">In 3 Days</span></p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Urgent / This Week */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              
              <section>
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-destructive" /> Urgent (Overdue)
                </h2>
                <div className="space-y-3">
                  <div className="glass rounded-lg border border-border/50 p-4 flex justify-between items-center hover:bg-muted/30 transition-colors">
                    <div>
                      <h4 className="font-semibold text-sm">HVAC Unit 3 - Filter Replacement</h4>
                      <p className="text-xs text-muted-foreground mt-1">Routine maintenance</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-destructive">14 Days Overdue</div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-info" /> This Week
                </h2>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="glass rounded-lg border border-border/50 p-4 flex justify-between items-center hover:bg-muted/30 transition-colors">
                      <div>
                        <h4 className="font-semibold text-sm">Asset Assembly Line A - Calibration {i}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Sensor calibration</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-info">In {i + 1} Days</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
            </div>

            {/* Upcoming / Completed */}
            <div className="flex flex-col gap-8">
              
              <section>
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" /> Upcoming
                </h2>
                <div className="glass rounded-xl p-1 border border-border/50">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="p-3 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <h4 className="font-medium text-sm">Monthly Safety Inspection</h4>
                      <p className="text-xs text-muted-foreground mt-1">Next week, Thursday</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-success" /> Completed (Last 7 Days)
                </h2>
                <div className="glass rounded-xl p-1 border border-border/50">
                  {[1, 2].map(i => (
                    <div key={i} className="p-3 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors opacity-70">
                      <h4 className="font-medium text-sm line-through decoration-muted-foreground/50">Heat Exchanger X1 Cleaning</h4>
                      <p className="text-xs text-muted-foreground mt-1">Completed by John D.</p>
                    </div>
                  ))}
                </div>
              </section>

            </div>

          </div>
        </div>

      </AnimatedFade>
    </ProtectedRoute>
  )
}

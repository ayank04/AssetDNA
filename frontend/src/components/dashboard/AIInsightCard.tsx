"use client"

import * as React from "react"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { Brain, ArrowRight, AlertTriangle, FileText, CheckCircle, Clock, Wrench } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

interface AIInsightCardProps {
  isLoading?: boolean
}

export function AIInsightCard({ isLoading }: AIInsightCardProps) {
  if (isLoading) {
    return (
      <AnimatedSlideUp delay={0.4} className="glass-heavy p-6 rounded-2xl border flex flex-col gap-4 min-h-[300px]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-muted rounded-lg animate-pulse" />
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
        </div>
        <div className="space-y-2 mt-4">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
        </div>
      </AnimatedSlideUp>
    )
  }

  return (
    <AnimatedSlideUp delay={0.4} className="glass-heavy p-6 rounded-2xl border shadow-elevation-1 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 p-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10" />
      
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground tracking-tight">AI Priority Insight</h3>
            <p className="text-xs text-muted-foreground">Generated 10 mins ago</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-destructive/10 text-destructive text-xs font-medium border border-destructive/20">
          <AlertTriangle className="h-3.5 w-3.5" /> Severe
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <p className="text-lg font-medium leading-tight text-foreground">
          Recurring vibration detected in <span className="text-primary cursor-pointer hover:underline">Pump-X402</span> bearing assembly.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Analysis of the last 3 maintenance records and recent telemetry indicates a 94% probability of bearing failure within 72 hours.
        </p>
        
        <div className="bg-background/50 rounded-lg p-3 border space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Evidence Citations</p>
          <div className="flex items-center gap-4 text-sm text-foreground">
            <div className="flex items-center gap-1.5 hover:text-primary cursor-pointer transition-colors">
              <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
              <span>2 Maint. Logs</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-primary cursor-pointer transition-colors">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <span>OEM Manual v2</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/50">
        <div className="text-xs font-medium text-success flex items-center gap-1.5">
          <CheckCircle className="h-4 w-4" /> 94% Confidence
        </div>
        <Link href="/investigate" tabIndex={-1}>
          <Button size="sm" className="gap-2 group">
            Investigate
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </AnimatedSlideUp>
  )
}

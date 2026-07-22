"use client"

import * as React from "react"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { Brain, ArrowRight, Clock, ShieldAlert, FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface RecentInvestigationsProps {
  isLoading?: boolean
}

const MOCK_INVESTIGATIONS = [
  {
    id: "inv_1",
    question: "What is causing the intermittent pressure drop in the cooling circuit?",
    assetId: "CT-2",
    assetName: "Cooling Tower CT-2",
    status: "completed",
    time: "2 hours ago",
    evidenceCount: 4
  },
  {
    id: "inv_2",
    question: "Analyze bearing wear trends against recent OEM bulletins.",
    assetId: "PX-100",
    assetName: "Pump PX-100",
    status: "completed",
    time: "5 hours ago",
    evidenceCount: 2
  },
  {
    id: "inv_3",
    question: "Diagnose alignment faults indicated by sensor #4421.",
    assetId: "G-01",
    assetName: "Generator G-01",
    status: "processing",
    time: "Just now",
    evidenceCount: 0
  }
]

export function RecentInvestigations({ isLoading }: RecentInvestigationsProps) {
  if (isLoading) {
    return (
      <AnimatedSlideUp className="glass p-6 rounded-xl border flex flex-col gap-4">
        <div className="h-6 w-48 bg-muted rounded animate-pulse" />
        <div className="space-y-4 mt-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 w-full bg-muted/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </AnimatedSlideUp>
    )
  }

  return (
    <AnimatedSlideUp className="glass p-6 rounded-xl border">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold tracking-tight">Recent Investigations</h3>
          <p className="text-xs text-muted-foreground mt-1">Latest AI diagnostic queries</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Brain className="h-4 w-4 text-primary" />
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_INVESTIGATIONS.map((inv) => (
          <div key={inv.id} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-background/50 border hover:border-primary/30 transition-colors relative overflow-hidden">
            {inv.status === 'processing' && (
              <div className="absolute top-0 left-0 w-1 h-full bg-primary animate-pulse" />
            )}
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground truncate" title={inv.question}>
                "{inv.question}"
              </h4>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{inv.assetName}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {inv.time}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" /> {inv.evidenceCount} Citations
                </span>
                <span className={cn(
                  "flex items-center gap-1 font-medium",
                  inv.status === 'completed' ? 'text-success' : 'text-primary animate-pulse'
                )}>
                  {inv.status === 'completed' ? <CheckCircle className="h-3 w-3" /> : <Brain className="h-3 w-3" />}
                  {inv.status === 'completed' ? 'Resolved' : 'Analyzing'}
                </span>
              </div>
            </div>

            <Link href={`/assets/${inv.assetId}/investigate`} tabIndex={-1}>
              <Button size="sm" variant="secondary" className="shrink-0 w-full sm:w-auto h-8 text-xs font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                Open <ArrowRight className="ml-1.5 h-3 w-3" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </AnimatedSlideUp>
  )
}

"use client"

import * as React from "react"
import { Brain, ArrowRight, Clock, Box } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AnimatedSlideUp } from "@/components/animations/Motion"

// Scaffolded for Future Use when backend supports it
export interface AIInvestigationRecord {
  id: string
  assetId: string
  assetName: string
  question: string
  status: "resolved" | "processing" | "failed"
  timestamp: string
  modelUsed: string
  evidenceCount: number
  durationMs: number
}

interface InvestigationCardProps {
  investigation: AIInvestigationRecord
  index?: number
  onClick?: (id: string) => void
}

export function InvestigationCard({ investigation, index = 0, onClick }: InvestigationCardProps) {
  return (
    <AnimatedSlideUp 
      delay={Math.min(index * 0.05, 0.3)}
      className="glass card-hover p-5 rounded-2xl border group flex flex-col h-full bg-background/50 backdrop-blur-xl relative overflow-hidden cursor-pointer"
      onClick={() => onClick?.(investigation.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 ring-1 ring-primary/20">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Box className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{investigation.assetName}</span>
              <span>&bull;</span>
              <span>{new Date(investigation.timestamp).toLocaleDateString()}</span>
            </div>
            <span className="text-xs font-mono bg-muted/50 px-1.5 py-0.5 rounded border border-border/50">
              {investigation.modelUsed}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="text-base font-semibold tracking-tight text-foreground line-clamp-3 mb-4 leading-snug group-hover:text-primary transition-colors">
          "{investigation.question}"
        </h3>
      </div>
      
      <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {(investigation.durationMs / 1000).toFixed(1)}s
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-info" />
            {investigation.evidenceCount} sources
          </span>
        </div>
        
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </AnimatedSlideUp>
  )
}

"use client"

import * as React from "react"
import { ArrowDown, LucideIcon } from "lucide-react"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { cn } from "@/lib/utils"

interface GlobalHubUnavailableStateProps {
  title: string
  description: string
  icon: LucideIcon
  colorClass: "primary" | "secondary" | "destructive" | "warning" | "info" | "success"
  ctaText?: string
}

export function GlobalHubUnavailableState({
  title,
  description,
  icon: Icon,
  colorClass,
  ctaText = "Select an asset below to browse"
}: GlobalHubUnavailableStateProps) {
  
  const colorMap = {
    primary: "bg-primary/10 text-primary ring-primary/30",
    secondary: "bg-secondary/10 text-secondary ring-secondary/30",
    destructive: "bg-destructive/10 text-destructive ring-destructive/30",
    warning: "bg-warning/10 text-warning ring-warning/30",
    info: "bg-info/10 text-info ring-info/30",
    success: "bg-success/10 text-success ring-success/30",
  }

  const blurMap = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
    destructive: "bg-destructive/10",
    warning: "bg-warning/10",
    info: "bg-info/10",
    success: "bg-success/10",
  }

  return (
    <AnimatedSlideUp className="glass flex flex-col items-center justify-center p-12 text-center rounded-2xl border min-h-[300px] relative overflow-hidden mb-8">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px] pointer-events-none" />
      <div className={cn("absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none", blurMap[colorClass])} />
      
      <div className={cn("relative z-10 h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ring-1 shadow-inner", colorMap[colorClass])}>
        <Icon className="h-8 w-8" />
      </div>
      
      <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3 font-heading">
        {title}
      </h3>
      
      <p className="text-base text-muted-foreground max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-medium text-foreground bg-muted/50 px-4 py-2 rounded-full border border-border/50">
          {ctaText}
        </p>
        <ArrowDown className="h-5 w-5 text-muted-foreground animate-bounce" />
      </div>
    </AnimatedSlideUp>
  )
}

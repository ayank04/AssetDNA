"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useShell } from "@/components/providers/ShellProvider"
import { ANIMATION_SPEEDS, EASINGS } from "@/constants/design"
import { X, Activity, Zap } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function UtilityRail() {
  const { isUtilityRailOpen, toggleUtilityRail } = useShell()

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isUtilityRailOpen ? 320 : 0,
        opacity: isUtilityRailOpen ? 1 : 0
      }}
      transition={{ 
        duration: ANIMATION_SPEEDS.NORMAL, 
        ease: EASINGS.EMPHASIZED_EASE 
      }}
      className="hidden lg:flex flex-col h-screen sticky top-0 right-0 z-[39] bg-card border-l overflow-hidden flex-shrink-0 shadow-elevation-1"
    >
      <div className="w-[320px] h-full flex flex-col">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
          <span className="font-semibold text-sm">Context Rail</span>
          <Button variant="ghost" size="icon" onClick={toggleUtilityRail} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content Placeholders */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-6">
          
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Activity className="h-3.5 w-3.5" />
              Recent Activity
            </h3>
            <div className="rounded-lg border bg-background p-3 text-sm">
              <p className="font-medium">Motor Alignment Check</p>
              <p className="text-muted-foreground text-xs mt-1">Updated 2 mins ago by Sarah</p>
            </div>
            <div className="rounded-lg border bg-background p-3 text-sm">
              <p className="font-medium">Bearing Replacement</p>
              <p className="text-muted-foreground text-xs mt-1">Completed yesterday</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-primary" />
              AI Insights
            </h3>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
              <p className="text-primary/90 leading-relaxed font-medium">
                Based on the recent vibration logs, there is an 82% probability of bearing fatigue. Consider scheduling an inspection.
              </p>
            </div>
          </div>

        </div>
      </div>
    </motion.aside>
  )
}

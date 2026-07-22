import * as React from "react"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { LucideIcon } from "lucide-react"

export interface StatItem {
  label: string
  value: number | string
  icon: LucideIcon
  colorClass?: string
}

interface ModuleSummaryStatsProps {
  stats: StatItem[]
  isLoading?: boolean
}

export function ModuleSummaryStats({ stats, isLoading }: ModuleSummaryStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-24 glass rounded-xl animate-pulse border" />
        ))}
      </div>
    )
  }

  if (stats.length === 0) return null

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <AnimatedSlideUp key={stat.label} delay={idx * 0.05} className="glass p-4 rounded-xl border flex flex-col justify-between h-24 relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className={`absolute right-[-10px] bottom-[-10px] opacity-5 group-hover:opacity-10 transition-opacity ${stat.colorClass || 'text-primary'}`}>
              <Icon className="h-24 w-24" />
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground z-10">
              <Icon className={`h-4 w-4 ${stat.colorClass || ''}`} />
              <span className="text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold z-10 text-foreground">
              {stat.value}
            </div>
          </AnimatedSlideUp>
        )
      })}
    </div>
  )
}

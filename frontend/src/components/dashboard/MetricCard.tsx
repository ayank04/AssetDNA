import * as React from "react"
import { LucideIcon } from "lucide-react"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    label: string
    isPositive: boolean
  }
  isLoading?: boolean
  delay?: number
}

export function MetricCard({ title, value, icon: Icon, description, trend, isLoading, delay = 0 }: MetricCardProps) {
  if (isLoading) {
    return (
      <AnimatedSlideUp delay={delay} className="glass p-6 rounded-xl border flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 bg-muted/50 rounded animate-pulse" />
          <div className="h-8 w-8 rounded-full bg-muted/50 animate-pulse" />
        </div>
        <div className="h-8 w-16 bg-muted/50 rounded animate-pulse mt-2" />
        <div className="h-4 w-32 bg-muted/50 rounded animate-pulse mt-1" />
      </AnimatedSlideUp>
    )
  }

  return (
    <AnimatedSlideUp delay={delay} className="glass p-6 rounded-xl border hover:border-primary/20 transition-all hover:shadow-elevation-1 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground tracking-tight">{title}</h3>
        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
        {trend && (
          <div className="flex items-center gap-2 mt-1">
            <span className={cn(
              "text-xs font-medium px-1.5 py-0.5 rounded-sm",
              trend.isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          </div>
        )}
        {!trend && description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </AnimatedSlideUp>
  )
}

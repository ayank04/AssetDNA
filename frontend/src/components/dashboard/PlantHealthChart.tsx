"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Asset } from "@/types/models"
import { Loader2, PieChart as PieChartIcon } from "lucide-react"
import { AnimatedSlideUp } from "@/components/animations/Motion"

interface PlantHealthChartProps {
  assets: Asset[] | null
  isLoading?: boolean
}

const COLORS = {
  active: "hsl(var(--success))",
  maintenance: "hsl(var(--warning))",
  inactive: "hsl(var(--muted-foreground))",
  decommissioned: "hsl(var(--destructive))",
}

export function PlantHealthChart({ assets, isLoading }: PlantHealthChartProps) {
  const data = React.useMemo(() => {
    if (!assets || assets.length === 0) return []

    const counts = assets.reduce((acc, asset) => {
      acc[asset.status] = (acc[asset.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(counts).map(([name, value]) => {
      let displayName = name.charAt(0).toUpperCase() + name.slice(1)
      if (name === 'active') displayName = 'Healthy'
      if (name === 'maintenance') displayName = 'Warning'
      if (name === 'decommissioned' || name === 'inactive') displayName = 'Critical'

      return {
        name: displayName,
        value,
        color: COLORS[name as keyof typeof COLORS] || "hsl(var(--primary))"
      }
    })
  }, [assets])

  if (isLoading) {
    return (
      <div className="glass p-6 rounded-xl border flex flex-col items-center justify-center min-h-[300px] h-full">
        <Loader2 className="h-6 w-6 text-primary animate-spin mb-4" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading analytics...</p>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="glass p-6 rounded-xl border border-dashed flex flex-col items-center justify-center min-h-[300px] h-full">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-3">
          <PieChartIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        <h4 className="text-sm font-semibold">No data available</h4>
        <p className="text-xs text-muted-foreground mt-1">Add assets to view health distribution.</p>
      </div>
    )
  }

  return (
    <AnimatedSlideUp className="glass p-6 rounded-xl border hover:shadow-elevation-1 transition-all h-full flex flex-col min-h-[300px]">
      <div className="mb-2">
        <h3 className="text-base font-semibold tracking-tight">Overall Plant Health</h3>
        <p className="text-xs text-muted-foreground mt-1">Real-time distribution by operational status</p>
      </div>
      
      <div className="flex-1 w-full relative min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                color: "hsl(var(--popover-foreground))"
              }}
              itemStyle={{ color: "hsl(var(--popover-foreground))" }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </AnimatedSlideUp>
  )
}

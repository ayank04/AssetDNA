"use client"

import * as React from "react"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Activity } from "lucide-react"

const MOCK_DATA = [
  { name: 'Mon', maintenance: 4, inspections: 2, incidents: 1 },
  { name: 'Tue', maintenance: 3, inspections: 3, incidents: 0 },
  { name: 'Wed', maintenance: 7, inspections: 1, incidents: 2 },
  { name: 'Thu', maintenance: 5, inspections: 4, incidents: 0 },
  { name: 'Fri', maintenance: 2, inspections: 6, incidents: 1 },
  { name: 'Sat', maintenance: 1, inspections: 1, incidents: 0 },
  { name: 'Sun', maintenance: 0, inspections: 0, incidents: 0 },
]

export function AnalyticsSection({ isLoading }: { isLoading?: boolean }) {
  if (isLoading) {
    return (
      <AnimatedSlideUp className="glass p-6 rounded-xl border flex flex-col gap-4 min-h-[300px]">
        <div className="h-6 w-48 bg-muted rounded animate-pulse" />
        <div className="flex-1 bg-muted/30 rounded-lg animate-pulse" />
      </AnimatedSlideUp>
    )
  }

  return (
    <AnimatedSlideUp className="glass p-6 rounded-xl border flex flex-col h-full min-h-[350px]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold tracking-tight">Weekly Activity Trends</h3>
          <p className="text-xs text-muted-foreground mt-1">Maintenance & Inspections volume</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Activity className="h-4 w-4" />
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMaint" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorInsp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                color: "hsl(var(--popover-foreground))"
              }}
            />
            <Area type="monotone" dataKey="maintenance" name="Maintenance" stroke="hsl(var(--warning))" fillOpacity={1} fill="url(#colorMaint)" />
            <Area type="monotone" dataKey="inspections" name="Inspections" stroke="hsl(var(--info))" fillOpacity={1} fill="url(#colorInsp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </AnimatedSlideUp>
  )
}

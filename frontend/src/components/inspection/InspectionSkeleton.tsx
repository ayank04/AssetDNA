"use client"

import * as React from "react"

export function InspectionGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="glass p-5 rounded-2xl border h-[240px] flex flex-col gap-4 overflow-hidden relative">
          <div className="flex justify-between items-start mb-3 relative z-10">
            <div className="h-6 w-24 rounded-full bg-muted animate-pulse" />
            <div className="h-4 w-16 bg-muted animate-pulse rounded" />
          </div>
          
          <div className="mt-2 space-y-2 relative z-10">
            <div className="h-5 w-full rounded bg-muted animate-pulse" />
            <div className="h-5 w-2/3 rounded bg-muted animate-pulse" />
          </div>
          
          <div className="mt-auto pt-4 border-t border-border/50 flex flex-col gap-3 relative z-10">
            <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
            </div>
            <div className="flex justify-end mt-2">
              <div className="h-8 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

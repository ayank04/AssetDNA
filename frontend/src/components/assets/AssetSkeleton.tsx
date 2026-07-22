"use client"

import * as React from "react"

export function AssetGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="glass p-5 rounded-2xl border h-[320px] flex flex-col gap-4 overflow-hidden relative">
          <div className="flex justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-muted animate-pulse" />
              <div>
                <div className="h-5 w-24 rounded bg-muted animate-pulse mb-1" />
                <div className="h-3 w-16 rounded bg-muted animate-pulse" />
              </div>
            </div>
            <div className="h-6 w-20 rounded-full bg-muted animate-pulse" />
          </div>
          <div className="mt-4 space-y-2 relative z-10">
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
          </div>
          <div className="mt-auto grid grid-cols-3 gap-2 relative z-10">
            <div className="h-8 rounded bg-muted animate-pulse" />
            <div className="h-8 rounded bg-muted animate-pulse" />
            <div className="h-8 rounded bg-muted animate-pulse" />
          </div>
          <div className="h-10 w-full rounded mt-2 bg-muted animate-pulse relative z-10" />
        </div>
      ))}
    </div>
  )
}

export function AssetTableSkeleton() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border glass">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
          <tr>
            {['Asset Name', 'Tag', 'Type', 'Location', 'Status', 'Actions'].map((h, i) => (
              <th key={i} className="px-6 py-4 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, i) => (
            <tr key={i} className="border-b border-border/50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-muted animate-pulse shrink-0" />
                  <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                </div>
              </td>
              <td className="px-6 py-4"><div className="h-4 w-16 bg-muted rounded animate-pulse" /></td>
              <td className="px-6 py-4"><div className="h-4 w-20 bg-muted rounded animate-pulse" /></td>
              <td className="px-6 py-4"><div className="h-4 w-24 bg-muted rounded animate-pulse" /></td>
              <td className="px-6 py-4"><div className="h-6 w-20 rounded-full bg-muted animate-pulse" /></td>
              <td className="px-6 py-4 text-right"><div className="h-8 w-8 ml-auto rounded bg-muted animate-pulse" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

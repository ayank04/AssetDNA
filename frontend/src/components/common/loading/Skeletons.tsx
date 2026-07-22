import * as React from "react"
import { cn } from "@/lib/utils"

export const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
))
Skeleton.displayName = "Skeleton"

export const MetricSkeleton = () => (
  <div className="rounded-xl border bg-card p-6 flex flex-col gap-2 shadow-sm">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-8 w-16" />
  </div>
)

export const CardSkeleton = () => (
  <div className="rounded-xl border bg-card p-6 flex flex-col gap-4 shadow-sm">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-4/5" />
    <div className="flex gap-2 mt-4">
      <Skeleton className="h-8 w-16 rounded-full" />
      <Skeleton className="h-8 w-16 rounded-full" />
    </div>
  </div>
)

export const TableSkeleton = () => (
  <div className="w-full flex flex-col gap-3">
    <Skeleton className="h-10 w-full rounded-t-md" />
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-12 w-full" />
  </div>
)

export const SidebarSkeleton = () => (
  <div className="w-full h-full flex flex-col gap-4 p-4 border-r">
    <Skeleton className="h-8 w-3/4 mb-6" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
)

export const AIResponseSkeleton = () => (
  <div className="flex flex-col gap-4 p-5 border rounded-xl glass shadow-sm">
    <div className="flex items-center gap-3">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-4 w-32" />
    </div>
    <Skeleton className="h-4 w-full mt-2" />
    <Skeleton className="h-4 w-[90%]" />
    <Skeleton className="h-4 w-[60%]" />
  </div>
)

export const PageSkeleton = () => (
  <div className="w-full h-full p-6 md:p-8 flex flex-col gap-6">
    <Skeleton className="h-10 w-1/4 mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricSkeleton />
      <MetricSkeleton />
      <MetricSkeleton />
    </div>
    <Skeleton className="h-[400px] w-full mt-6 rounded-xl" />
  </div>
)

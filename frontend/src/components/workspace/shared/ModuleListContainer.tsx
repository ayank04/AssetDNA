import * as React from "react"
import { ArchiveX } from "lucide-react"
import { AnimatedFade } from "@/components/animations/Motion"

interface ModuleListContainerProps {
  itemsLength: number
  isLoading: boolean
  emptyTitle?: string
  emptyDescription?: string
  children: React.ReactNode
}

export function ModuleListContainer({ 
  itemsLength, 
  isLoading, 
  emptyTitle = "No records found", 
  emptyDescription = "Try adjusting your filters or search terms.",
  children 
}: ModuleListContainerProps) {
  
  if (isLoading && itemsLength === 0) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-24 glass rounded-xl border animate-pulse" />
        ))}
      </div>
    )
  }

  if (!isLoading && itemsLength === 0) {
    return (
      <AnimatedFade className="glass flex flex-col items-center justify-center p-12 text-center rounded-b-xl border-t-0 border border-dashed min-h-[300px]">
        <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
          <ArchiveX className="h-8 w-8 text-muted-foreground opacity-50" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{emptyTitle}</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          {emptyDescription}
        </p>
      </AnimatedFade>
    )
  }

  return (
    <div className="p-4 space-y-4 bg-background/20 rounded-b-xl">
      {children}
    </div>
  )
}

import * as React from "react"
import { AnimatedFade } from "@/components/animations/Motion"
import { cn } from "@/lib/utils"

interface ModuleContainerProps {
  children: React.ReactNode
  title: string
  description?: string
  className?: string
  action?: React.ReactNode
}

export function ModuleContainer({ children, title, description, className, action }: ModuleContainerProps) {
  return (
    <AnimatedFade className={cn("flex flex-col h-full w-full", className)}>
      <header className="px-6 py-6 border-b border-border/50 bg-background/30 backdrop-blur-md shrink-0 flex items-center justify-between gap-4 sticky top-0 z-10">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {action && (
          <div className="shrink-0">{action}</div>
        )}
      </header>
      <div className="flex-1 overflow-y-auto p-6 relative">
        <div className="max-w-[1400px] mx-auto w-full h-full min-h-full">
          {children}
        </div>
      </div>
    </AnimatedFade>
  )
}

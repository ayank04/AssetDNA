"use client"

import * as React from "react"
import { SearchX, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AnimatedSlideUp } from "@/components/animations/Motion"

interface EmptyAssetsStateProps {
  onClearFilters: () => void
}

export function EmptyAssetsState({ onClearFilters }: EmptyAssetsStateProps) {
  return (
    <AnimatedSlideUp className="glass flex flex-col items-center justify-center p-12 text-center rounded-2xl border min-h-[400px]">
      <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-5 ring-1 ring-border/50">
        <SearchX className="h-8 w-8 text-muted-foreground opacity-50" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">No assets found</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        We couldn&apos;t find any assets matching your current search or filter parameters. Try adjusting them.
      </p>
      <Button variant="outline" onClick={onClearFilters}>
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        Clear all filters
      </Button>
    </AnimatedSlideUp>
  )
}

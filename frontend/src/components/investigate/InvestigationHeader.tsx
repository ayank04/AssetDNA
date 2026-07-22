"use client"

import * as React from "react"
import { Search, RotateCw, X, Filter } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export function InvestigationHeader() {
  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Top Row: Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground font-heading flex items-center gap-3">
            AI Investigations
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Review every engineering investigation performed across your assets.
          </p>
        </div>
        
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="text-xs font-semibold bg-muted text-muted-foreground px-2.5 py-1 rounded-full border border-border flex items-center gap-1.5">
            0 Total
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-2 bg-background/50 backdrop-blur-sm"
            disabled
          >
            <RotateCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Bottom Row: Search and Filters (Disabled state since backend is unsupported) */}
      <div className="flex flex-col lg:flex-row items-center gap-4 bg-background/40 backdrop-blur-md border rounded-xl p-3 shadow-sm opacity-50 pointer-events-none grayscale-[50%]">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search investigation history..." 
            disabled
            className="pl-9 h-10 w-full bg-transparent border-none focus-visible:ring-0 shadow-none text-base sm:text-sm cursor-not-allowed"
          />
        </div>
        
        <div className="w-px h-6 bg-border hidden lg:block" />
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <Button variant="outline" className="h-9" disabled>
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>
      </div>
    </div>
  )
}

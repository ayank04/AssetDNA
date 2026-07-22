"use client"

import * as React from "react"
import { Search, LayoutGrid, List, RotateCw, X } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface AssetsHeaderProps {
  totalAssets: number
  searchValue: string
  onSearchChange: (value: string) => void
  viewMode: 'grid' | 'table'
  onViewModeChange: (mode: 'grid' | 'table') => void
  onSortChange: (sortBy: string) => void
  onFilterChange: (key: string, value: string) => void
  onRefresh: () => void
  isRefreshing?: boolean
}

export function AssetsHeader({ 
  totalAssets, 
  searchValue, 
  onSearchChange, 
  viewMode, 
  onViewModeChange,
  onSortChange,
  onFilterChange,
  onRefresh,
  isRefreshing
}: AssetsHeaderProps) {
  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Top Row: Title and View Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground font-heading">
            Assets
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Browse, monitor and investigate every industrial asset.
          </p>
        </div>
        
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {totalAssets} Total
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-2 bg-background/50 backdrop-blur-sm"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            <RotateCw className={cn("h-3.5 w-3.5", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
          <div className="flex items-center p-0.5 rounded-lg bg-muted/50 border shrink-0">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("h-7 px-2.5 rounded-md text-xs", viewMode === 'grid' && "bg-background shadow-sm text-foreground")}
              onClick={() => onViewModeChange('grid')}
            >
              <LayoutGrid className="h-3.5 w-3.5 mr-1.5" /> Grid
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("h-7 px-2.5 rounded-md text-xs", viewMode === 'table' && "bg-background shadow-sm text-foreground")}
              onClick={() => onViewModeChange('table')}
            >
              <List className="h-3.5 w-3.5 mr-1.5" /> Table
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Search and Filters */}
      <div className="flex flex-col lg:flex-row items-center gap-4 bg-background/40 backdrop-blur-md border rounded-xl p-3 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search assets by name or ID..." 
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-10 w-full bg-transparent border-none focus-visible:ring-0 shadow-none text-base sm:text-sm"
          />
          {searchValue && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
        
        <div className="w-px h-6 bg-border hidden lg:block" />
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select 
            className="h-9 px-3 rounded-md border border-input bg-background/50 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary appearance-none cursor-pointer w-full sm:w-[140px]"
            onChange={(e) => onFilterChange('status', e.target.value)}
            defaultValue=""
          >
            <option value="">All Health</option>
            <option value="active">Healthy</option>
            <option value="maintenance">Warning</option>
            <option value="decommissioned">Critical</option>
          </select>

          <select 
            className="h-9 px-3 rounded-md border border-input bg-background/50 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary appearance-none cursor-pointer w-full sm:w-[140px]"
            onChange={(e) => onFilterChange('equipmentType', e.target.value)}
            defaultValue=""
          >
            <option value="">All Types</option>
            <option value="pump">Pump</option>
            <option value="motor">Motor</option>
            <option value="valve">Valve</option>
            <option value="conveyor">Conveyor</option>
          </select>

          <select 
            className="h-9 px-3 rounded-md border border-input bg-background/50 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary appearance-none cursor-pointer w-full sm:w-[140px]"
            onChange={(e) => onSortChange(e.target.value)}
            defaultValue="createdAt"
          >
            <option value="createdAt">Newest First</option>
            <option value="name">Alphabetical</option>
            <option value="status">Health Status</option>
          </select>
        </div>
      </div>
    </div>
  )
}

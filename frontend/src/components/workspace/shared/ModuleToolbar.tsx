import * as React from "react"
import { Search, Filter, ArrowDownUp, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"

interface FilterOption {
  label: string
  value: string
}

interface ModuleToolbarProps {
  searchValue: string
  onSearchChange: (val: string) => void
  filterValue: string
  onFilterChange: (val: string) => void
  filterOptions?: FilterOption[]
  filterPlaceholder?: string
  sortOrder: 'asc' | 'desc'
  onSortChange: (val: 'asc' | 'desc') => void
  onRefresh?: () => void
  isRefreshing?: boolean
}

export function ModuleToolbar({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions = [],
  filterPlaceholder = "All",
  sortOrder,
  onSortChange,
  onRefresh,
  isRefreshing
}: ModuleToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b border-border/50 bg-muted/20 rounded-t-xl">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Search records..." 
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-9 w-full bg-background"
        />
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {filterOptions.length > 0 && (
          <div className="relative flex-1 sm:flex-none">
            <select 
              value={filterValue}
              onChange={(e) => onFilterChange(e.target.value)}
              className="h-9 px-3 py-1.5 pl-9 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none cursor-pointer w-full sm:w-[160px]"
            >
              <option value="">{filterPlaceholder}</option>
              {filterOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9 px-3 shrink-0"
          onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          <ArrowDownUp className="h-4 w-4 mr-2" />
          {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
        </Button>
        
        {onRefresh && (
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-primary' : ''}`} />
          </Button>
        )}
      </div>
    </div>
  )
}

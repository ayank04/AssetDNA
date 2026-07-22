import * as React from "react"
import { Search, Filter, ArrowDownUp } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"

interface TimelineHeaderProps {
  searchValue: string
  onSearchChange: (val: string) => void
  eventTypeFilter: string
  onEventTypeChange: (val: string) => void
  sortOrder: 'asc' | 'desc'
  onSortChange: (val: 'asc' | 'desc') => void
}

export function TimelineHeader({
  searchValue,
  onSearchChange,
  eventTypeFilter,
  onEventTypeChange,
  sortOrder,
  onSortChange
}: TimelineHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b border-border/50 bg-background/50 backdrop-blur-xl sticky top-0 z-20 rounded-t-xl">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Search timeline events..." 
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-9 w-full bg-background"
        />
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-none">
          <select 
            value={eventTypeFilter}
            onChange={(e) => onEventTypeChange(e.target.value)}
            className="h-9 px-3 py-1.5 pl-9 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none cursor-pointer w-full sm:w-[160px]"
          >
            <option value="">All Events</option>
            <option value="maintenance">Maintenance</option>
            <option value="inspection">Inspection</option>
            <option value="engineering_change">Engineering</option>
            <option value="status_change">Status Change</option>
            <option value="note">Notes</option>
          </select>
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9 px-3 shrink-0"
          onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          <ArrowDownUp className="h-4 w-4 mr-2" />
          {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
        </Button>
      </div>
    </div>
  )
}

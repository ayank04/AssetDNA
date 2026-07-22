"use client"

import * as React from "react"
import { useWorkspace } from "@/components/workspace/WorkspaceProvider"
import { ModuleContainer } from "@/components/workspace/ModuleContainer"
import { TimelineHeader } from "@/components/workspace/timeline/TimelineHeader"
import { TimelineContainer } from "@/components/workspace/timeline/TimelineContainer"
import { AssetPagination } from "@/components/assets/AssetPagination"

import { useApi, useDebounce, usePagination } from "@/hooks/core-hooks"
import { TimelineService } from "@/services"

export default function TimelinePage() {
  const { asset, isLoading: assetLoading } = useWorkspace()
  
  const [searchValue, setSearchValue] = React.useState("")
  const debouncedSearch = useDebounce(searchValue, 500)
  
  const [eventTypeFilter, setEventTypeFilter] = React.useState("")
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc')
  
  const { limit, offset, nextPage, prevPage, reset } = usePagination(20)
  
  const { data: timelineData, isLoading: timelineLoading, execute: fetchTimeline } = useApi(TimelineService.getEvents)

  React.useEffect(() => {
    if (asset?.id) {
      const filters: Record<string, any> = {}
      if (eventTypeFilter) filters.type = eventTypeFilter
      if (debouncedSearch) filters.search = debouncedSearch

      fetchTimeline(
        asset.id,
        { limit, offset },
        { sortBy: 'date', sortOrder },
        filters
      )
    }
  }, [asset?.id, fetchTimeline, limit, offset, sortOrder, eventTypeFilter, debouncedSearch])

  // Reset pagination when filters change
  React.useEffect(() => {
    reset()
  }, [debouncedSearch, eventTypeFilter, sortOrder, reset])

  if (assetLoading || !asset) {
    return (
      <ModuleContainer title="Chronological Timeline">
        <div className="h-full w-full flex flex-col items-center justify-center mt-20">
          <div className="h-8 w-8 rounded-full bg-muted/50 mb-4 animate-pulse" />
          <div className="h-4 w-32 bg-muted/50 rounded animate-pulse" />
        </div>
      </ModuleContainer>
    )
  }

  const events = timelineData?.data || []
  const total = timelineData?.pagination?.total || 0
  const hasMore = timelineData?.pagination?.hasMore || false

  return (
    <ModuleContainer 
      title="Chronological Timeline" 
      description="A unified history of all operational events across modules."
    >
      <div className="glass rounded-xl border border-border/50 shadow-sm overflow-hidden bg-background/20 mb-8">
        <TimelineHeader 
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          eventTypeFilter={eventTypeFilter}
          onEventTypeChange={setEventTypeFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
        
        <div>
          <TimelineContainer 
            events={events} 
            assetId={asset.id} 
            isLoading={timelineLoading} 
          />
        </div>
      </div>

      {events.length > 0 && (
        <AssetPagination 
          total={total}
          limit={limit}
          offset={offset}
          hasMore={hasMore}
          onNext={nextPage}
          onPrev={prevPage}
          isLoading={timelineLoading}
        />
      )}
    </ModuleContainer>
  )
}

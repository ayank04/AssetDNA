"use client"

import * as React from "react"
import { useWorkspace } from "@/components/workspace/WorkspaceProvider"
import { ModuleContainer } from "@/components/workspace/ModuleContainer"
import { ModuleToolbar } from "@/components/workspace/shared/ModuleToolbar"
import { ModuleSummaryStats, StatItem } from "@/components/workspace/shared/ModuleSummaryStats"
import { ModuleListContainer } from "@/components/workspace/shared/ModuleListContainer"
import { EngineeringCard } from "@/components/workspace/engineering/EngineeringCard"
import { AssetPagination } from "@/components/assets/AssetPagination"

import { useApi, useDebounce, usePagination } from "@/hooks/core-hooks"
import { EngineeringService } from "@/services"
import { FileText, CheckCircle, FilePlus, XOctagon } from "lucide-react"

export default function EngineeringChangesPage() {
  const { asset, isLoading: assetLoading } = useWorkspace()
  
  const [searchValue, setSearchValue] = React.useState("")
  const debouncedSearch = useDebounce(searchValue, 500)
  
  const [statusFilter, setStatusFilter] = React.useState("")
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc')
  
  const { limit, offset, nextPage, prevPage, reset } = usePagination(10)
  
  const { data: engineeringData, isLoading: engineeringLoading, execute: fetchEngineering } = useApi(EngineeringService.getAll)

  const fetchRecords = React.useCallback(() => {
    if (asset?.id) {
      const filters: Record<string, any> = { assetId: asset.id }
      if (statusFilter) filters.status = statusFilter
      if (debouncedSearch) filters.search = debouncedSearch

      fetchEngineering(
        { limit, offset },
        { sortBy: 'proposedDate', sortOrder },
        filters
      )
    }
  }, [asset?.id, fetchEngineering, limit, offset, sortOrder, statusFilter, debouncedSearch])

  React.useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  React.useEffect(() => {
    reset()
  }, [debouncedSearch, statusFilter, sortOrder, reset])

  if (assetLoading || !asset) {
    return (
      <ModuleContainer title="Engineering Changes">
        <div className="h-full w-full flex flex-col items-center justify-center mt-20">
          <div className="h-8 w-8 rounded-full bg-muted/50 mb-4 animate-pulse" />
          <div className="h-4 w-32 bg-muted/50 rounded animate-pulse" />
        </div>
      </ModuleContainer>
    )
  }

  const records = engineeringData?.data || []
  const total = engineeringData?.pagination?.total || 0
  const hasMore = engineeringData?.pagination?.hasMore || false

  const stats: StatItem[] = [
    { label: "Total Changes", value: total, icon: FileText, colorClass: "text-foreground" },
    { label: "Implemented", value: records.filter(r => r.status === 'implemented').length, icon: CheckCircle, colorClass: "text-success" },
    { label: "Approved", value: records.filter(r => r.status === 'approved').length, icon: FileText, colorClass: "text-primary" },
    { label: "Proposed", value: records.filter(r => r.status === 'proposed').length, icon: FilePlus, colorClass: "text-warning" },
  ]

  const statusOptions = [
    { label: "Proposed", value: "proposed" },
    { label: "Approved", value: "approved" },
    { label: "Implemented", value: "implemented" },
    { label: "Rejected", value: "rejected" },
  ]

  return (
    <ModuleContainer 
      title="Engineering Changes" 
      description="Design modifications, configuration updates, and physical additions."
    >
      <ModuleSummaryStats stats={stats} isLoading={engineeringLoading && records.length === 0} />
      
      <div className="glass rounded-xl border border-border/50 shadow-sm overflow-hidden mb-8">
        <ModuleToolbar 
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filterValue={statusFilter}
          onFilterChange={setStatusFilter}
          filterOptions={statusOptions}
          filterPlaceholder="All Statuses"
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onRefresh={fetchRecords}
          isRefreshing={engineeringLoading}
        />
        
        <ModuleListContainer 
          itemsLength={records.length} 
          isLoading={engineeringLoading}
          emptyTitle="No engineering changes found"
          emptyDescription="There are no design modifications matching your current filters."
        >
          {records.map((record, index) => (
            <EngineeringCard key={record.id} change={record} delay={index * 0.05} />
          ))}
        </ModuleListContainer>
      </div>

      {records.length > 0 && (
        <AssetPagination 
          total={total}
          limit={limit}
          offset={offset}
          hasMore={hasMore}
          onNext={nextPage}
          onPrev={prevPage}
          isLoading={engineeringLoading}
        />
      )}
    </ModuleContainer>
  )
}

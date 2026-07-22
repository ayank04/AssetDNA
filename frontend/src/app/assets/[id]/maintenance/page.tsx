"use client"

import * as React from "react"
import { useWorkspace } from "@/components/workspace/WorkspaceProvider"
import { ModuleContainer } from "@/components/workspace/ModuleContainer"
import { ModuleToolbar } from "@/components/workspace/shared/ModuleToolbar"
import { ModuleSummaryStats, StatItem } from "@/components/workspace/shared/ModuleSummaryStats"
import { ModuleListContainer } from "@/components/workspace/shared/ModuleListContainer"
import { MaintenanceCard } from "@/components/workspace/maintenance/MaintenanceCard"
import { AssetPagination } from "@/components/assets/AssetPagination"

import { useApi, useDebounce, usePagination } from "@/hooks/core-hooks"
import { MaintenanceService } from "@/services"
import { Wrench, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function MaintenancePage() {
  const { asset, isLoading: assetLoading } = useWorkspace()
  
  const [searchValue, setSearchValue] = React.useState("")
  const debouncedSearch = useDebounce(searchValue, 500)
  
  const [statusFilter, setStatusFilter] = React.useState("")
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc')
  
  const { limit, offset, nextPage, prevPage, reset } = usePagination(10)
  
  const { data: maintenanceData, isLoading: maintenanceLoading, execute: fetchMaintenance } = useApi(MaintenanceService.getAll)

  const fetchRecords = React.useCallback(() => {
    if (asset?.id) {
      const filters: Record<string, any> = { assetId: asset.id }
      if (statusFilter) filters.status = statusFilter
      if (debouncedSearch) filters.search = debouncedSearch

      fetchMaintenance(
        { limit, offset },
        { sortBy: 'scheduledDate', sortOrder },
        filters
      )
    }
  }, [asset?.id, fetchMaintenance, limit, offset, sortOrder, statusFilter, debouncedSearch])

  React.useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  // Reset pagination when filters change
  React.useEffect(() => {
    reset()
  }, [debouncedSearch, statusFilter, sortOrder, reset])

  if (assetLoading || !asset) {
    return (
      <ModuleContainer title="Maintenance History">
        <div className="h-full w-full flex flex-col items-center justify-center mt-20">
          <div className="h-8 w-8 rounded-full bg-muted/50 mb-4 animate-pulse" />
          <div className="h-4 w-32 bg-muted/50 rounded animate-pulse" />
        </div>
      </ModuleContainer>
    )
  }

  const records = maintenanceData?.data || []
  const total = maintenanceData?.pagination?.total || 0
  const hasMore = maintenanceData?.pagination?.hasMore || false

  // Compute stats locally. In a real app with massive datasets, 
  // you might hit a dedicated summary endpoint instead.
  const stats: StatItem[] = [
    { label: "Total Records", value: total, icon: Wrench, colorClass: "text-primary" },
    { label: "Completed", value: records.filter(r => r.status === 'completed').length, icon: CheckCircle, colorClass: "text-success" },
    { label: "In Progress", value: records.filter(r => r.status === 'in_progress').length, icon: Clock, colorClass: "text-info" },
    { label: "Scheduled", value: records.filter(r => r.status === 'scheduled').length, icon: AlertCircle, colorClass: "text-warning" },
  ]

  const statusOptions = [
    { label: "Scheduled", value: "scheduled" },
    { label: "In Progress", value: "in_progress" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ]

  return (
    <ModuleContainer 
      title="Maintenance History" 
      description="Detailed records of corrective and preventative maintenance."
    >
      <ModuleSummaryStats stats={stats} isLoading={maintenanceLoading && records.length === 0} />
      
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
          isRefreshing={maintenanceLoading}
        />
        
        <ModuleListContainer 
          itemsLength={records.length} 
          isLoading={maintenanceLoading}
          emptyTitle="No maintenance records found"
          emptyDescription="There are no work orders matching your current filters."
        >
          {records.map((record, index) => (
            <MaintenanceCard key={record.id} record={record} delay={index * 0.05} />
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
          isLoading={maintenanceLoading}
        />
      )}
    </ModuleContainer>
  )
}

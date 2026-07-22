"use client"

import * as React from "react"
import { useWorkspace } from "@/components/workspace/WorkspaceProvider"
import { ModuleContainer } from "@/components/workspace/ModuleContainer"
import { ModuleToolbar } from "@/components/workspace/shared/ModuleToolbar"
import { ModuleSummaryStats, StatItem } from "@/components/workspace/shared/ModuleSummaryStats"
import { ModuleListContainer } from "@/components/workspace/shared/ModuleListContainer"
import { InspectionCard } from "@/components/workspace/inspections/InspectionCard"
import { AssetPagination } from "@/components/assets/AssetPagination"

import { useApi, useDebounce, usePagination } from "@/hooks/core-hooks"
import { InspectionService } from "@/services"
import { Search, CheckCircle, XOctagon, AlertCircle } from "lucide-react"

export default function InspectionsPage() {
  const { asset, isLoading: assetLoading } = useWorkspace()
  
  const [searchValue, setSearchValue] = React.useState("")
  const debouncedSearch = useDebounce(searchValue, 500)
  
  const [statusFilter, setStatusFilter] = React.useState("")
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc')
  
  const { limit, offset, nextPage, prevPage, reset } = usePagination(10)
  
  const { data: inspectionData, isLoading: inspectionLoading, execute: fetchInspections } = useApi(InspectionService.getAll)

  const fetchRecords = React.useCallback(() => {
    if (asset?.id) {
      const filters: Record<string, any> = { assetId: asset.id }
      if (statusFilter) filters.status = statusFilter
      if (debouncedSearch) filters.search = debouncedSearch

      fetchInspections(
        { limit, offset },
        { sortBy: 'date', sortOrder },
        filters
      )
    }
  }, [asset?.id, fetchInspections, limit, offset, sortOrder, statusFilter, debouncedSearch])

  React.useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  React.useEffect(() => {
    reset()
  }, [debouncedSearch, statusFilter, sortOrder, reset])

  if (assetLoading || !asset) {
    return (
      <ModuleContainer title="Inspection Reports">
        <div className="h-full w-full flex flex-col items-center justify-center mt-20">
          <div className="h-8 w-8 rounded-full bg-muted/50 mb-4 animate-pulse" />
          <div className="h-4 w-32 bg-muted/50 rounded animate-pulse" />
        </div>
      </ModuleContainer>
    )
  }

  const records = inspectionData?.data || []
  const total = inspectionData?.pagination?.total || 0
  const hasMore = inspectionData?.pagination?.hasMore || false

  const stats: StatItem[] = [
    { label: "Total Inspections", value: total, icon: Search, colorClass: "text-primary" },
    { label: "Passed", value: records.filter(r => r.status === 'pass').length, icon: CheckCircle, colorClass: "text-success" },
    { label: "Failed", value: records.filter(r => r.status === 'fail').length, icon: XOctagon, colorClass: "text-destructive" },
    { label: "Conditional", value: records.filter(r => r.status === 'conditional').length, icon: AlertCircle, colorClass: "text-warning" },
  ]

  const statusOptions = [
    { label: "Passed", value: "pass" },
    { label: "Failed", value: "fail" },
    { label: "Conditional", value: "conditional" },
  ]

  return (
    <ModuleContainer 
      title="Inspection Reports" 
      description="Logs, parameter values, observations, and recommendations."
    >
      <ModuleSummaryStats stats={stats} isLoading={inspectionLoading && records.length === 0} />
      
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
          isRefreshing={inspectionLoading}
        />
        
        <ModuleListContainer 
          itemsLength={records.length} 
          isLoading={inspectionLoading}
          emptyTitle="No inspection records found"
          emptyDescription="There are no inspections matching your current filters."
        >
          {records.map((record, index) => (
            <InspectionCard key={record.id} inspection={record} delay={index * 0.05} />
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
          isLoading={inspectionLoading}
        />
      )}
    </ModuleContainer>
  )
}

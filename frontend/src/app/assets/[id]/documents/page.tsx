"use client"

import * as React from "react"
import { useWorkspace } from "@/components/workspace/WorkspaceProvider"
import { ModuleContainer } from "@/components/workspace/ModuleContainer"
import { ModuleToolbar } from "@/components/workspace/shared/ModuleToolbar"
import { ModuleSummaryStats, StatItem } from "@/components/workspace/shared/ModuleSummaryStats"
import { DocumentCard } from "@/components/workspace/documents/DocumentCard"
import { AssetPagination } from "@/components/assets/AssetPagination"
import { useApi, useDebounce, usePagination } from "@/hooks/core-hooks"
import { DocumentService } from "@/services"
import { Files, BookOpen, PenTool, FileText, Pin, Clock } from "lucide-react"

export default function DocumentsPage() {
  const { asset, isLoading: assetLoading } = useWorkspace()
  
  const [searchValue, setSearchValue] = React.useState("")
  const debouncedSearch = useDebounce(searchValue, 500)
  
  const [typeFilter, setTypeFilter] = React.useState("")
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc')
  
  const { limit, offset, nextPage, prevPage, reset } = usePagination(10)
  
  const { data: documentData, isLoading: documentLoading, execute: fetchDocuments } = useApi(DocumentService.getAll)

  const fetchRecords = React.useCallback(() => {
    if (asset?.id) {
      const filters: Record<string, any> = { assetId: asset.id }
      if (typeFilter) filters.type = typeFilter
      if (debouncedSearch) filters.search = debouncedSearch

      fetchDocuments(
        { limit, offset },
        { sortBy: 'createdAt', sortOrder },
        filters
      )
    }
  }, [asset?.id, fetchDocuments, limit, offset, sortOrder, typeFilter, debouncedSearch])

  React.useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  React.useEffect(() => {
    reset()
  }, [debouncedSearch, typeFilter, sortOrder, reset])

  if (assetLoading || !asset) {
    return (
      <ModuleContainer title="Documents Library">
        <div className="h-full w-full flex flex-col items-center justify-center mt-20">
          <div className="h-8 w-8 rounded-full bg-muted/50 mb-4 animate-pulse" />
        </div>
      </ModuleContainer>
    )
  }

  const records = documentData?.data || []
  const total = documentData?.pagination?.total || 0
  const hasMore = documentData?.pagination?.hasMore || false

  const stats: StatItem[] = [
    { label: "Total Documents", value: total, icon: Files, colorClass: "text-foreground" },
    { label: "Manuals", value: records.filter(r => r.type === 'manual').length, icon: BookOpen, colorClass: "text-primary" },
    { label: "Schematics", value: records.filter(r => r.type === 'schematic').length, icon: PenTool, colorClass: "text-warning" },
    { label: "Reports", value: records.filter(r => r.type === 'report').length, icon: FileText, colorClass: "text-info" },
  ]

  const typeOptions = [
    { label: "Manuals", value: "manual" },
    { label: "Schematics", value: "schematic" },
    { label: "Reports", value: "report" },
    { label: "Other", value: "other" },
  ]

  return (
    <ModuleContainer 
      title="Documents Library" 
      description="Enterprise documentation control, manuals, and standard operating procedures."
    >
      <ModuleSummaryStats stats={stats} isLoading={documentLoading && records.length === 0} />
      
      {/* Pinned & Recent Split */}
      {!searchValue && !typeFilter && offset === 0 && records.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-xl border border-border/50 shadow-sm p-5">
            <h3 className="text-sm font-semibold mb-4 flex items-center text-foreground">
              <Pin className="h-4 w-4 mr-2 text-primary" /> Pinned Documents
            </h3>
            <div className="space-y-3">
              {/* Fake pinned from existing list for enterprise feel */}
              {records.slice(0, 1).map((record) => (
                <div key={`pin-${record.id}`} className="bg-background/50 border border-border/50 rounded-lg p-3 text-sm flex items-center justify-between hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => window.open(record.url, '_blank')}>
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-primary opacity-80" />
                    <span className="font-medium line-clamp-1">{record.title}</span>
                  </div>
                </div>
              ))}
              {records.length === 0 && <span className="text-xs text-muted-foreground">No pinned documents.</span>}
            </div>
          </div>
          
          <div className="glass rounded-xl border border-border/50 shadow-sm p-5">
            <h3 className="text-sm font-semibold mb-4 flex items-center text-foreground">
              <Clock className="h-4 w-4 mr-2 text-info" /> Recent Uploads
            </h3>
            <div className="space-y-3">
              {records.slice(1, 3).map((record) => (
                <div key={`rec-${record.id}`} className="bg-background/50 border border-border/50 rounded-lg p-3 text-sm flex items-center justify-between hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => window.open(record.url, '_blank')}>
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-info opacity-80" />
                    <span className="font-medium line-clamp-1">{record.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(record.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Document Repository */}
      <div className="glass rounded-xl border border-border/50 shadow-sm overflow-hidden mb-8 bg-muted/5">
        <ModuleToolbar 
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filterValue={typeFilter}
          onFilterChange={setTypeFilter}
          filterOptions={typeOptions}
          filterPlaceholder="All Categories"
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onRefresh={fetchRecords}
          isRefreshing={documentLoading}
        />
        
        <div className="flex flex-col">
          {/* List Header */}
          <div className="hidden sm:flex items-center justify-between px-5 py-3 border-b border-border/50 bg-background/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <div className="flex-1">Document Name</div>
            <div className="w-[300px] flex items-center gap-8 pl-4">
              <span className="w-24">Owner</span>
              <span className="w-24">Date</span>
              <span className="w-20">Size</span>
            </div>
          </div>

          {documentLoading && records.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">Loading documents...</div>
          ) : records.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground text-sm">No documents found matching criteria.</div>
          ) : (
            records.map((record, index) => (
              <DocumentCard key={record.id} document={record} delay={index * 0.05} />
            ))
          )}
        </div>
      </div>

      {records.length > 0 && (
        <AssetPagination 
          total={total}
          limit={limit}
          offset={offset}
          hasMore={hasMore}
          onNext={nextPage}
          onPrev={prevPage}
          isLoading={documentLoading}
        />
      )}
    </ModuleContainer>
  )
}

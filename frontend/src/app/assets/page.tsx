"use client"

import * as React from "react"
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute"
import { AnimatedFade } from "@/components/animations/Motion"

import { AssetsHeader } from "@/components/assets/AssetsHeader"
import { AssetGrid } from "@/components/assets/AssetGrid"
import { AssetTable } from "@/components/assets/AssetTable"
import { AssetPagination } from "@/components/assets/AssetPagination"
import { AssetGridSkeleton, AssetTableSkeleton } from "@/components/assets/AssetSkeleton"
import { EmptyAssetsState } from "@/components/assets/EmptyAssetsState"
import { AssetPreviewDrawer } from "@/components/assets/AssetPreviewDrawer"

import { useApi, useDebounce, usePagination, useSorting } from "@/hooks/core-hooks"
import { AssetService } from "@/services"

export default function AssetDiscoveryHub() {
  const { limit, offset, nextPage, prevPage, reset } = usePagination(12)
  const { sortBy, setSortBy } = useSorting('createdAt', 'desc')
  
  const [searchValue, setSearchValue] = React.useState("")
  const debouncedSearch = useDebounce(searchValue, 500)
  
  const [viewMode, setViewMode] = React.useState<'grid' | 'table'>('grid')
  const [previewAssetId, setPreviewAssetId] = React.useState<string | null>(null)
  const [filters, setFilters] = React.useState<Record<string, string>>({})
  
  const { data: assetsData, isLoading, execute: fetchAssets } = useApi(AssetService.getAll)

  // Restore view preference from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('assetdna_view_pref')
    if (saved === 'grid' || saved === 'table') {
      setViewMode(saved)
    }
  }, [])

  // Save view preference
  const handleViewModeChange = (mode: 'grid' | 'table') => {
    setViewMode(mode)
    localStorage.setItem('assetdna_view_pref', mode)
  }

  // Handle specific filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
    reset() // Reset to page 1 on filter change
  }

  const handleClearFilters = () => {
    setSearchValue("")
    setFilters({})
    reset()
  }

  const loadAssets = React.useCallback(() => {
    fetchAssets(
      { limit, offset }, 
      { sortBy, sortOrder: 'desc' }, 
      { ...filters, search: debouncedSearch }
    )
  }, [fetchAssets, limit, offset, sortBy, filters, debouncedSearch])

  // Fetch data when params change
  React.useEffect(() => {
    loadAssets()
  }, [loadAssets])

  // Reset pagination when search or sort changes
  React.useEffect(() => {
    reset()
  }, [debouncedSearch, sortBy, reset])

  const assets = assetsData?.data || []
  const total = assetsData?.pagination?.total || 0
  const hasMore = assetsData?.pagination?.hasMore || false
  const isInitialLoading = isLoading && assets.length === 0

  return (
    <ProtectedRoute>
      <AnimatedFade className="p-4 sm:p-6 md:p-8 max-w-[1600px] mx-auto w-full flex flex-col min-h-[calc(100vh-4rem)]">
        
        <AssetsHeader 
          totalAssets={total}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onSortChange={setSortBy}
          onFilterChange={handleFilterChange}
          onRefresh={loadAssets}
          isRefreshing={isLoading}
        />

        <div className="flex-1 pb-8 relative z-0">
          {isInitialLoading ? (
            viewMode === 'grid' ? <AssetGridSkeleton /> : <AssetTableSkeleton />
          ) : assets.length === 0 ? (
            <EmptyAssetsState onClearFilters={handleClearFilters} />
          ) : viewMode === 'grid' ? (
            <AssetGrid assets={assets} onPreview={setPreviewAssetId} />
          ) : (
            <AssetTable assets={assets} onPreview={setPreviewAssetId} />
          )}
        </div>

        {!isInitialLoading && assets.length > 0 && (
          <AssetPagination 
            total={total}
            limit={limit}
            offset={offset}
            hasMore={hasMore}
            onNext={nextPage}
            onPrev={prevPage}
            isLoading={isLoading}
          />
        )}
      </AnimatedFade>

      <AssetPreviewDrawer 
        isOpen={!!previewAssetId} 
        assetId={previewAssetId} 
        onClose={() => setPreviewAssetId(null)} 
      />
    </ProtectedRoute>
  )
}

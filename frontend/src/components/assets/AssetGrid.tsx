import * as React from "react"
import { Asset } from "@/types/models"
import { AssetCard } from "./AssetCard"
import { SearchX } from "lucide-react"

interface AssetGridProps {
  assets: Asset[]
  isLoading?: boolean
  onPreview?: (assetId: string) => void
}

export const AssetGrid = React.memo(function AssetGrid({ assets, isLoading, onPreview }: AssetGridProps) {
  if (isLoading && assets.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="glass p-5 rounded-2xl border h-[320px] flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="h-10 w-10 rounded-xl bg-muted/50 animate-pulse" />
              <div className="h-5 w-16 rounded-full bg-muted/50 animate-pulse" />
            </div>
            <div className="h-6 w-3/4 rounded bg-muted/50 animate-pulse mt-2" />
            <div className="h-4 w-1/2 rounded bg-muted/50 animate-pulse" />
            <div className="h-16 w-full rounded bg-muted/50 animate-pulse mt-4" />
            <div className="mt-auto h-10 w-full rounded-md bg-muted/50 animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  if (!isLoading && assets.length === 0) {
    return (
      <div className="glass flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed min-h-[400px]">
        <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
          <SearchX className="h-8 w-8 text-muted-foreground opacity-50" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No assets found</h3>
        <p className="text-muted-foreground max-w-sm">
          We couldn&apos;t find any assets matching your current filters and search query. Try adjusting your parameters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {assets.map((asset, idx) => (
        <AssetCard key={asset.id} asset={asset} index={idx} onPreview={onPreview} />
      ))}
    </div>
  )
})

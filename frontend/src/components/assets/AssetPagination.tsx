import * as React from "react"
import { Button } from "@/components/ui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface AssetPaginationProps {
  total: number
  limit: number
  offset: number
  hasMore: boolean
  onNext: () => void
  onPrev: () => void
  isLoading?: boolean
}

export function AssetPagination({ total, limit, offset, hasMore, onNext, onPrev, isLoading }: AssetPaginationProps) {
  const currentPage = Math.floor(offset / limit) + 1
  const totalPages = Math.ceil(total / limit)
  
  if (total === 0) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-4 border-t border-border/50 gap-4 mt-6">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{offset + 1}</span> to <span className="font-medium text-foreground">{Math.min(offset + limit, total)}</span> of <span className="font-medium text-foreground">{total}</span> results
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onPrev} 
          disabled={offset === 0 || isLoading}
          className="h-8 px-3 shadow-sm"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        <span className="text-sm font-medium px-3 tabular-nums">Page {currentPage} of {totalPages || 1}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onNext} 
          disabled={!hasMore || isLoading}
          className="h-8 px-3 shadow-sm"
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}

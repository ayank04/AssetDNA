"use client"

import * as React from 'react'
import { ModuleContainer } from '@/components/workspace/ModuleContainer'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { Search as SearchIcon, Box, ArrowRight } from 'lucide-react'
import { useApi, useDebounce } from '@/hooks/core-hooks'
import { AssetService } from '@/services'
import Link from 'next/link'

export default function SearchPage() {
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)
  
  const { data: assetsData, isLoading, execute } = useApi(AssetService.getAll)

  React.useEffect(() => {
    execute({ limit: 100 })
  }, [execute])

  const assets = assetsData?.data || []
  
  const results = React.useMemo(() => {
    if (!debouncedQuery) return []
    const lowerQuery = debouncedQuery.toLowerCase()
    return assets.filter(a => 
      a.name.toLowerCase().includes(lowerQuery) || 
      a.description.toLowerCase().includes(lowerQuery) ||
      a.type.toLowerCase().includes(lowerQuery)
    )
  }, [debouncedQuery, assets])

  return (
    <ProtectedRoute>
      <ModuleContainer 
        title="Global Search" 
        description="Search across all industrial assets, documentation, and history."
      >
        <div className="max-w-4xl mx-auto w-full mt-8">
          
          <div className="relative mb-8">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for pumps, compressors, or manual references..."
              className="w-full bg-background/50 border border-border/50 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all"
            />
          </div>

          {!debouncedQuery && (
            <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border/50 rounded-2xl glass bg-background/30">
              <SearchIcon className="h-12 w-12 mb-4 opacity-30" />
              <h3 className="text-lg font-medium text-foreground mb-2">Start typing to search</h3>
              <p className="text-sm max-w-sm text-center">
                Search instantly across all plant locations, telemetry tags, and equipment manuals.
              </p>
            </div>
          )}

          {debouncedQuery && isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-muted/30 rounded-xl animate-pulse" />
              ))}
            </div>
          )}

          {debouncedQuery && !isLoading && results.length === 0 && (
            <div className="h-[200px] flex flex-col items-center justify-center text-muted-foreground">
              <p className="text-foreground font-medium">No results found for "{debouncedQuery}"</p>
              <p className="text-sm mt-1">Try searching for "Pump" or "Boiler"</p>
            </div>
          )}

          {debouncedQuery && !isLoading && results.length > 0 && (
            <div className="space-y-4">
              {results.map(asset => (
                <Link 
                  key={asset.id} 
                  href={`/assets/${asset.id}`}
                  className="block glass p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Box className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{asset.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{asset.type} • {asset.location}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </ModuleContainer>
    </ProtectedRoute>
  )
}

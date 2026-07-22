"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, FileText, Settings, ArrowRight, Loader2, Clock, X, Database } from "lucide-react"
import { useShell } from "@/components/providers/ShellProvider"
import { ANIMATION_SPEEDS, EASINGS } from "@/constants/design"
import { useDebounce, useApi } from "@/hooks/core-hooks"
import { AssetService } from "@/services"
import { useRouter } from "next/navigation"

const RECENT_SEARCHES_KEY = "assetdna_recent_searches"

export function CommandPalette() {
  const router = useRouter()
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useShell()

  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)
  
  const [recentSearches, setRecentSearches] = React.useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  
  const { data: searchData, isLoading, execute: fetchSearch } = useApi(AssetService.getAll)

  // Load recent searches on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
      if (stored) setRecentSearches(JSON.parse(stored))
    } catch (e) {
      console.error("Failed to load recent searches", e)
    }
  }, [])

  // Execute search when debounced query changes
  React.useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchSearch({ limit: 5 }, undefined, { q: debouncedQuery.trim() })
    }
    setSelectedIndex(0) // Reset selection on new search
  }, [debouncedQuery, fetchSearch])

  const results = searchData?.data || []
  
  // Total items currently displayed (for keyboard nav)
  const isShowingRecent = !debouncedQuery.trim()
  const itemsCount = isShowingRecent ? recentSearches.length : results.length

  const handleClose = React.useCallback(() => {
    setCommandPaletteOpen(false)
    setQuery("")
    setSelectedIndex(0)
  }, [setCommandPaletteOpen])

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isCommandPaletteOpen) return

      if (e.key === "Escape") {
        handleClose()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex(prev => (prev < itemsCount - 1 ? prev + 1 : prev))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (isShowingRecent && recentSearches[selectedIndex]) {
          setQuery(recentSearches[selectedIndex])
        } else if (!isShowingRecent && results[selectedIndex]) {
          handleSelectAsset(results[selectedIndex].id, results[selectedIndex].name)
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCommandPaletteOpen, itemsCount, selectedIndex, isShowingRecent, recentSearches, results, handleClose])

  const saveRecentSearch = (term: string) => {
    try {
      const updated = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error("Failed to save recent search", e)
    }
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  }

  const handleSelectAsset = (id: string, name: string) => {
    saveRecentSearch(name)
    handleClose()
    router.push(`/assets/${id}`)
  }

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-[var(--MODAL,1000)] flex items-start justify-center pt-[15vh] px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_SPEEDS.FAST }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: ANIMATION_SPEEDS.FAST, ease: EASINGS.EMPHASIZED_EASE }}
            className="relative w-full max-w-2xl glass-heavy rounded-xl shadow-2xl border flex flex-col overflow-hidden"
          >
            <div className="flex items-center px-4 py-4 border-b border-border/50">
              <Search className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground text-foreground"
                placeholder="Search assets..."
              />
              {isLoading ? (
                <Loader2 className="h-5 w-5 text-primary animate-spin ml-2" />
              ) : (
                <kbd className="ml-2 pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground">
                  ESC
                </kbd>
              )}
            </div>

            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
              {isShowingRecent ? (
                <div className="px-2 py-2">
                  <div className="flex items-center justify-between mb-2 px-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Recent Searches
                    </div>
                    {recentSearches.length > 0 && (
                      <button 
                        onClick={clearRecentSearches}
                        className="text-[10px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  
                  {recentSearches.length === 0 ? (
                    <div className="px-2 py-8 text-center text-sm text-muted-foreground">
                      No recent searches. Try typing an asset name.
                    </div>
                  ) : (
                    recentSearches.map((term, index) => (
                      <button 
                        key={term}
                        onClick={() => setQuery(term)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors group ${
                          selectedIndex === index ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50 text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-sm">{term}</span>
                        </div>
                        <ArrowRight className={`h-4 w-4 transition-opacity text-muted-foreground ${
                          selectedIndex === index ? 'opacity-100' : 'opacity-0'
                        }`} />
                      </button>
                    ))
                  )}
                </div>
              ) : (
                <div className="px-2 py-2">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                    Assets
                  </div>
                  
                  {results.length === 0 && !isLoading && (
                    <div className="px-2 py-8 text-center space-y-3">
                      <div className="mx-auto w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
                        <Search className="h-5 w-5 text-muted-foreground opacity-50" />
                      </div>
                      <p className="text-sm text-muted-foreground">No assets found matching &quot;{query}&quot;</p>
                    </div>
                  )}

                  {results.map((asset, index) => (
                    <button 
                      key={asset.id}
                      onClick={() => handleSelectAsset(asset.id, asset.name)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors group ${
                        selectedIndex === index ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50 text-foreground'
                      }`}
                    >
                      <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">{asset.name}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium ml-6">
                          {asset.type} • {asset.status}
                        </span>
                      </div>
                      <ArrowRight className={`h-4 w-4 transition-opacity text-muted-foreground ${
                        selectedIndex === index ? 'opacity-100' : 'opacity-0'
                      }`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

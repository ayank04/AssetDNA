"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Brain, Clock, MapPin, Box, Wrench, FileText } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { StatusBadge } from "./StatusBadge"
import { useApi } from "@/hooks/core-hooks"
import { AssetService } from "@/services"
import Link from "next/link"

interface AssetPreviewDrawerProps {
  assetId: string | null
  isOpen: boolean
  onClose: () => void
}

export function AssetPreviewDrawer({ assetId, isOpen, onClose }: AssetPreviewDrawerProps) {
  const { data, isLoading, execute } = useApi(AssetService.getById)

  React.useEffect(() => {
    if (isOpen && assetId) {
      execute(assetId)
    }
  }, [isOpen, assetId, execute])

  const asset = data?.data

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[110] w-full max-w-md bg-background border-l shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold tracking-tight">Quick Preview</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {isLoading || !asset ? (
                <div className="space-y-6">
                  <div className="flex gap-4 items-center">
                    <div className="h-16 w-16 rounded-xl bg-muted animate-pulse" />
                    <div className="space-y-2 flex-1">
                      <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                      <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                  <div className="h-24 w-full bg-muted animate-pulse rounded-xl mt-6" />
                  <div className="h-32 w-full bg-muted animate-pulse rounded-xl mt-6" />
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 ring-1 ring-primary/20">
                      <Box className="h-8 w-8" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold tracking-tight text-foreground">{asset.name}</h1>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span className="font-mono bg-muted/50 px-1 rounded text-xs">{asset.id}</span>
                        <span>&bull;</span>
                        <span className="capitalize">{asset.type.replace('_', ' ')}</span>
                      </div>
                      <div className="mt-3">
                        <StatusBadge status={asset.status} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-xl border border-border/50">
                      {asset.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground p-3 rounded-lg border bg-background">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">{asset.location || "Unknown Location"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground p-3 rounded-lg border bg-background">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Last Updated: <span className="font-medium text-foreground">{new Date(asset.updatedAt).toLocaleDateString()}</span></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
                    <Link href={`/assets/${asset.id}/maintenance`} onClick={onClose}>
                      <div className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                        <Wrench className="h-5 w-5 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                        <h4 className="text-sm font-semibold">Maintenance</h4>
                        <p className="text-xs text-muted-foreground mt-1">View task history</p>
                      </div>
                    </Link>
                    <Link href={`/assets/${asset.id}/documents`} onClick={onClose}>
                      <div className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                        <FileText className="h-5 w-5 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                        <h4 className="text-sm font-semibold">Documents</h4>
                        <p className="text-xs text-muted-foreground mt-1">Manuals & Schematics</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-background mt-auto">
              {asset && (
                <div className="flex gap-3">
                  <Link href={`/assets/${asset.id}`} onClick={onClose} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Full Details
                    </Button>
                  </Link>
                  <Link href={`/assets/${asset.id}/investigate`} onClick={onClose} className="flex-1">
                    <Button className="w-full">
                      <Brain className="h-4 w-4 mr-2" /> Investigate
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

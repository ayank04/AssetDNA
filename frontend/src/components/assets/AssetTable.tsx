"use client"

import * as React from "react"
import Link from "next/link"
import { Asset } from "@/types/models"
import { StatusBadge } from "./StatusBadge"
import { ArrowRight, Maximize2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface AssetTableProps {
  assets: Asset[]
  onPreview?: (assetId: string) => void
}

export function AssetTable({ assets, onPreview }: AssetTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border glass bg-background/50 backdrop-blur-xl">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 sticky top-0 z-10 border-b border-border/50">
          <tr>
            <th className="px-6 py-4 font-semibold">Asset Name</th>
            <th className="px-6 py-4 font-semibold">Tag</th>
            <th className="px-6 py-4 font-semibold">Type</th>
            <th className="px-6 py-4 font-semibold">Location</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs ring-1 ring-primary/20 shrink-0">
                    {asset.name.charAt(0)}
                  </div>
                  <span className="font-medium text-foreground whitespace-nowrap">{asset.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{asset.id.slice(0, 8)}</td>
              <td className="px-6 py-4 capitalize whitespace-nowrap text-muted-foreground">{asset.type.replace('_', ' ')}</td>
              <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{asset.location || "Unknown"}</td>
              <td className="px-6 py-4">
                <StatusBadge status={asset.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  {onPreview && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onPreview(asset.id)}
                      title="Quick Preview"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Link href={`/assets/${asset.id}/investigate`} tabIndex={-1}>
                    <Button variant="ghost" size="sm" className="h-8 bg-muted/30 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      Investigate <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

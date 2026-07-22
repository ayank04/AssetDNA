"use client"

import * as React from "react"
import { FileText, ArrowRight, Box, Calendar, User, FileCode, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { cn } from "@/lib/utils"

export interface DocumentRecordScaffold {
  id: string
  assetId: string
  assetName: string
  name: string
  type: string
  category: "manual" | "schematic" | "certification" | "report"
  version: string
  uploadDate: string
  uploadedBy?: string
  status: "active" | "archived" | "draft"
}

interface DocumentCardProps {
  document: DocumentRecordScaffold
  index?: number
  onClick?: (id: string) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-success/10 text-success border-success/20'
    case 'draft': return 'bg-warning/10 text-warning border-warning/20'
    case 'archived': return 'bg-muted text-muted-foreground border-border'
    default: return 'bg-muted text-muted-foreground border-border'
  }
}

export function DocumentCard({ document, index = 0, onClick }: DocumentCardProps) {
  return (
    <AnimatedSlideUp 
      delay={Math.min(index * 0.05, 0.3)}
      className="glass card-hover p-5 rounded-2xl border group flex flex-col h-full bg-background/50 backdrop-blur-xl relative overflow-hidden cursor-pointer"
      onClick={() => onClick?.(document.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-xs font-mono bg-muted/50 px-1.5 py-0.5 rounded border border-border/50">
            v{document.version}
          </span>
        </div>
        <span className={cn("px-2 py-0.5 rounded-full border text-xs font-medium capitalize", getStatusColor(document.status))}>
          {document.status}
        </span>
      </div>
      
      <div className="flex-1">
        <h3 className="text-base font-semibold tracking-tight text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
          {document.name}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <FileCode className="h-3.5 w-3.5" />
          <span className="capitalize">{document.category}</span>
          <span>&bull;</span>
          <span className="uppercase">{document.type}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Box className="h-3.5 w-3.5 text-primary" />
          <span className="font-medium text-foreground">{document.assetName}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            {document.uploadedBy ? (
              <>
                <User className="h-3.5 w-3.5" />
                <span className="truncate">{document.uploadedBy}</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-3.5 w-3.5" />
                <span>System Verified</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(document.uploadDate).toLocaleDateString()}
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <Button variant="ghost" size="sm" className="h-8 group-hover:bg-primary/10 group-hover:text-primary">
            Preview <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </div>
    </AnimatedSlideUp>
  )
}

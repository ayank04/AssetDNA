"use client"

import * as React from "react"
import { Fingerprint, ArrowRight, Box, Calendar, Link as LinkIcon, Camera, FileCode, Wrench, Search } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { cn } from "@/lib/utils"

export interface EvidenceRecordScaffold {
  id: string
  assetId: string
  assetName: string
  title: string
  type: "photo" | "log" | "document" | "sensor_data"
  referenceType: "investigation" | "maintenance" | "inspection" | "timeline"
  referenceId: string
  createdDate: string
}

interface EvidenceCardProps {
  evidence: EvidenceRecordScaffold
  index?: number
  onClick?: (id: string) => void
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'photo': return <Camera className="h-4 w-4" />
    case 'log': return <FileCode className="h-4 w-4" />
    case 'document': return <FileCode className="h-4 w-4" />
    case 'sensor_data': return <Box className="h-4 w-4" />
    default: return <Fingerprint className="h-4 w-4" />
  }
}

const getReferenceBadge = (refType: string) => {
  switch (refType) {
    case 'investigation': return { icon: <Search className="h-3 w-3 mr-1" />, color: 'bg-info/10 text-info border-info/20' }
    case 'maintenance': return { icon: <Wrench className="h-3 w-3 mr-1" />, color: 'bg-warning/10 text-warning border-warning/20' }
    case 'inspection': return { icon: <Search className="h-3 w-3 mr-1" />, color: 'bg-primary/10 text-primary border-primary/20' }
    case 'timeline': return { icon: <Calendar className="h-3 w-3 mr-1" />, color: 'bg-secondary/10 text-secondary border-secondary/20' }
    default: return { icon: <LinkIcon className="h-3 w-3 mr-1" />, color: 'bg-muted text-muted-foreground border-border' }
  }
}

export function EvidenceCard({ evidence, index = 0, onClick }: EvidenceCardProps) {
  const refBadge = getReferenceBadge(evidence.referenceType)

  return (
    <AnimatedSlideUp 
      delay={Math.min(index * 0.05, 0.3)}
      className="glass card-hover p-5 rounded-2xl border group flex flex-col h-full bg-background/50 backdrop-blur-xl relative overflow-hidden cursor-pointer"
      onClick={() => onClick?.(evidence.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0 border border-secondary/20">
            {getTypeIcon(evidence.type)}
          </div>
          <span className="text-xs font-mono bg-muted/50 px-1.5 py-0.5 rounded border border-border/50 uppercase">
            {evidence.type.replace('_', ' ')}
          </span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{evidence.id.slice(0, 8)}</span>
      </div>
      
      <div className="flex-1">
        <h3 className="text-base font-semibold tracking-tight text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
          {evidence.title}
        </h3>
        <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-medium capitalize", refBadge.color)}>
          {refBadge.icon}
          {evidence.referenceType}
        </span>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Box className="h-3.5 w-3.5 text-primary" />
          <span className="font-medium text-foreground">{evidence.assetName}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(evidence.createdDate).toLocaleDateString()}
          </div>
          <Button variant="ghost" size="sm" className="h-8 group-hover:bg-primary/10 group-hover:text-primary">
            Examine <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </div>
    </AnimatedSlideUp>
  )
}

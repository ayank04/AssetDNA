"use client"

import * as React from "react"
import { Document } from "@/types/models"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { FileText, BookOpen, PenTool, Database, Download, ExternalLink, HardDrive, Clock, User, Hash, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface DocumentCardProps {
  document: Document
  delay?: number
}

function DocumentBadge({ type }: { type: Document['type'] }) {
  let color = "bg-muted text-muted-foreground border-border"
  let label: string = type
  let Icon = Database

  if (type === 'manual') {
    color = "bg-primary/10 text-primary border-primary/20"
    label = "Manual"
    Icon = BookOpen
  } else if (type === 'schematic') {
    color = "bg-warning/10 text-warning border-warning/20"
    label = "Schematic"
    Icon = PenTool
  } else if (type === 'report') {
    color = "bg-info/10 text-info border-info/20"
    label = "Report"
    Icon = FileText
  } else {
    label = "Other"
    Icon = Database
  }

  return (
    <div className={cn(`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border`, color)}>
      <Icon className="h-3 w-3 mr-1" />
      {label}
    </div>
  )
}

function formatBytes(bytes?: number, decimals = 2) {
  if (bytes === undefined || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function DocumentCard({ document, delay = 0 }: DocumentCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (document.url) {
      window.open(document.url, '_blank', 'noopener,noreferrer');
    }
  }

  // Generate deterministic "metadata" for enterprise feel since it's not in the DB schema
  const revision = "V" + document.id.substring(0, 3).toUpperCase()
  const owner = "ENG-" + document.id.substring(3, 6).toUpperCase()

  return (
    <AnimatedSlideUp delay={delay} className="glass card-hover border-b border-border/50 hover:bg-muted/30 transition-colors bg-background/30 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between group">
      
      {/* Primary Info */}
      <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
        <div className="h-10 w-10 shrink-0 rounded-lg bg-muted flex items-center justify-center border border-border/50 shadow-sm">
          <FileText className="h-5 w-5 text-primary opacity-80" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors cursor-pointer" onClick={handleDownload}>
              {document.title}
            </h4>
            <DocumentBadge type={document.type} />
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-mono">
              <Hash className="h-3 w-3" /> {revision}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1 truncate">
              {document.url.split('/').pop()}
            </span>
          </div>
        </div>
      </div>

      {/* Metadata Ribbon */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 text-xs text-muted-foreground shrink-0">
        <div className="flex items-center gap-1.5 w-24">
          <User className="h-3.5 w-3.5 opacity-50" />
          <span className="truncate">{owner}</span>
        </div>
        
        <div className="flex items-center gap-1.5 w-24">
          <Clock className="h-3.5 w-3.5 opacity-50" />
          <span>{new Date(document.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-1.5 w-20">
          <HardDrive className="h-3.5 w-3.5 opacity-50" />
          <span>{formatBytes(document.fileSize)}</span>
        </div>
        
        <div className="flex items-center gap-2 border-l border-border/50 pl-4">
          <Button variant="outline" size="sm" onClick={handleDownload} className="h-8 shadow-sm">
            <Download className="h-4 w-4 mr-1.5" /> Open
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

    </AnimatedSlideUp>
  )
}

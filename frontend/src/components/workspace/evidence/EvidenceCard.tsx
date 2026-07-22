"use client"

import * as React from "react"
import { Evidence } from "@/types/models"
import { AnimatedSlideUp } from "@/components/animations/Motion"
import { ChevronDown, ChevronUp, Calendar, User, Search, Link as LinkIcon, ExternalLink, Activity, Image as ImageIcon, Video, FileText, Database } from "lucide-react"

interface EvidenceCardProps {
  evidence: Evidence
  delay?: number
}

function EvidenceBadge({ type, sourceType }: { type?: string, sourceType: string }) {
  let color = "bg-muted text-muted-foreground border-border"
  let label = type || sourceType || "unknown"
  let Icon = Database

  if (label.toLowerCase() === 'photo' || label.toLowerCase() === 'image') {
    color = "bg-info/10 text-info border-info/20"
    Icon = ImageIcon
  } else if (label.toLowerCase() === 'video') {
    color = "bg-primary/10 text-primary border-primary/20"
    Icon = Video
  } else if (label.toLowerCase() === 'document') {
    color = "bg-success/10 text-success border-success/20"
    Icon = FileText
  } else if (label.toLowerCase() === 'measurement' || label.toLowerCase() === 'observation') {
    color = "bg-warning/10 text-warning border-warning/20"
    Icon = Activity
  }

  return (
    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${color}`}>
      <Icon className="h-3 w-3 mr-1" />
      {label}
    </div>
  )
}

function ReferenceBadge({ referenceType }: { referenceType?: string }) {
  if (!referenceType) return null;
  return (
    <div className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-muted/50 text-muted-foreground border-border/50">
      <LinkIcon className="h-3 w-3 mr-1" />
      {referenceType}
    </div>
  )
}

export function EvidenceCard({ evidence, delay = 0 }: EvidenceCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (evidence.url) {
      window.open(evidence.url, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <AnimatedSlideUp delay={delay} className="glass card-hover rounded-xl border group bg-background/50 backdrop-blur-xl overflow-hidden">
      {/* Header / Collapsed View */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
            <EvidenceBadge type={evidence.type} sourceType={evidence.sourceType} />
            <ReferenceBadge referenceType={evidence.referenceType} />
            {evidence.id && (
              <span className="text-xs text-muted-foreground font-mono">ID: {evidence.id.slice(0, 8)}</span>
            )}
          </div>
          <h4 className="text-base font-semibold text-foreground truncate mb-1">{evidence.title || "Evidence Record"}</h4>
          {!isExpanded && (
            <p className="text-sm text-muted-foreground truncate">{evidence.content}</p>
          )}
        </div>
        
        <div className="shrink-0 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="hidden md:flex flex-col items-end gap-1">
            {evidence.createdAt && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(evidence.createdAt).toLocaleDateString()}</span>
              </div>
            )}
            {evidence.createdBy && (
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>{evidence.createdBy}</span>
              </div>
            )}
          </div>
          
          {evidence.url && (
            <button 
              onClick={handleOpen}
              className="hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors z-10"
              title="Open Evidence"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          )}
          
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted/50 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </div>
      </button>

      {/* Expanded View */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Evidence Content / Description
                </h5>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap bg-muted/20 p-3 rounded-lg border border-border/50">
                  {evidence.content}
                </p>
              </div>
              
              {evidence.url && (
                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Media Link
                  </h5>
                  <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap bg-muted/20 p-3 rounded-lg border border-border/50 font-mono flex items-center justify-between">
                    <span className="truncate mr-4">{evidence.url}</span>
                    <button 
                      onClick={handleOpen}
                      className="shrink-0 text-xs text-primary font-medium hover:underline flex items-center"
                    >
                      View <ExternalLink className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4 bg-muted/20 p-4 rounded-xl border border-border/50 h-fit">
              <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/50 pb-2 mb-3">
                Traceability
              </h5>
              
              {evidence.referenceType && (
                <div>
                  <span className="text-xs text-muted-foreground block mb-0.5">Linked Module</span>
                  <span className="text-sm font-medium capitalize flex items-center">
                    <LinkIcon className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    {evidence.referenceType}
                  </span>
                </div>
              )}
              
              {evidence.referenceId && (
                <div>
                  <span className="text-xs text-muted-foreground block mb-0.5">Reference ID</span>
                  <span className="text-sm font-medium font-mono">{evidence.referenceId}</span>
                </div>
              )}
              
              {evidence.confidence !== undefined && (
                <div>
                  <span className="text-xs text-muted-foreground block mb-0.5">Confidence Score</span>
                  <span className="text-sm font-medium">
                    {(evidence.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              )}
              
              {evidence.createdBy && (
                <div>
                  <span className="text-xs text-muted-foreground block mb-0.5">Captured By</span>
                  <span className="text-sm font-medium">{evidence.createdBy}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AnimatedSlideUp>
  )
}

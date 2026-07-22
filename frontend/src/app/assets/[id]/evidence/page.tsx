"use client"

import * as React from "react"
import { useWorkspace } from "@/components/workspace/WorkspaceProvider"
import { ModuleContainer } from "@/components/workspace/ModuleContainer"
import { ModuleSummaryStats, StatItem } from "@/components/workspace/shared/ModuleSummaryStats"
import { EvidenceCard } from "@/components/workspace/evidence/EvidenceCard"
import { useApi } from "@/hooks/core-hooks"
import { EvidenceService } from "@/services"
import { Database, Image as ImageIcon, Video, FileText, Activity, Link as LinkIcon, Wrench, Search, PenTool, Clock } from "lucide-react"

export default function EvidencePage() {
  const { asset, isLoading: assetLoading } = useWorkspace()
  const { data: evidenceData, isLoading: evidenceLoading, execute: fetchEvidence } = useApi(EvidenceService.getAll)

  React.useEffect(() => {
    if (asset?.id) {
      fetchEvidence(
        { limit: 100, offset: 0 },
        { sortBy: 'createdAt', sortOrder: 'desc' },
        { assetId: asset.id }
      )
    }
  }, [asset?.id, fetchEvidence])

  if (assetLoading || !asset) {
    return (
      <ModuleContainer title="Investigation Workspace">
        <div className="h-full w-full flex flex-col items-center justify-center mt-20">
          <div className="h-8 w-8 rounded-full bg-muted/50 mb-4 animate-pulse" />
        </div>
      </ModuleContainer>
    )
  }

  const records = evidenceData?.data || []
  
  // Group records by referenceType
  const groupedEvidence = {
    maintenance: records.filter(r => r.referenceType === 'maintenance'),
    inspection: records.filter(r => r.referenceType === 'inspection'),
    engineering: records.filter(r => r.referenceType === 'engineering'),
    timeline: records.filter(r => r.referenceType === 'timeline'),
    document: records.filter(r => r.referenceType === 'document'),
    ungrouped: records.filter(r => !r.referenceType)
  }

  const stats: StatItem[] = [
    { label: "Total Evidence", value: records.length, icon: Database, colorClass: "text-foreground" },
    { label: "Photos & Images", value: records.filter(r => r.type?.toLowerCase() === 'photo' || r.type?.toLowerCase() === 'image').length, icon: ImageIcon, colorClass: "text-info" },
    { label: "Observations", value: records.filter(r => r.type?.toLowerCase() === 'observation' || r.sourceType?.toLowerCase() === 'observation').length, icon: Activity, colorClass: "text-warning" },
    { label: "Documents", value: records.filter(r => r.type?.toLowerCase() === 'document' || r.sourceType?.toLowerCase() === 'document').length, icon: FileText, colorClass: "text-success" },
  ]

  const renderGroup = (title: string, icon: React.ReactNode, items: typeof records, colorClass: string) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-8">
        <h3 className={`text-sm font-semibold mb-4 flex items-center ${colorClass}`}>
          {icon} <span className="ml-2">{title}</span>
          <span className="ml-3 text-xs bg-muted/50 text-muted-foreground px-2 py-0.5 rounded-full">{items.length}</span>
        </h3>
        <div className="space-y-4">
          {items.map((record, index) => (
            <EvidenceCard key={record.id} evidence={record} delay={index * 0.05} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <ModuleContainer 
      title="Investigation Workspace" 
      description="Traceability matrix of all supporting evidence grouped by operational source."
    >
      <ModuleSummaryStats stats={stats} isLoading={evidenceLoading && records.length === 0} />
      
      {evidenceLoading && records.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground text-sm">Loading investigation data...</div>
      ) : records.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground text-sm glass rounded-xl border border-dashed">No supporting artifacts found for this asset.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 bg-muted/5 p-6 rounded-xl border border-border/50 shadow-inner">
          {renderGroup("Maintenance & Repairs", <Wrench className="h-4 w-4" />, groupedEvidence.maintenance, "text-primary")}
          {renderGroup("Inspections & Diagnostics", <Search className="h-4 w-4" />, groupedEvidence.inspection, "text-warning")}
          {renderGroup("Engineering Changes", <PenTool className="h-4 w-4" />, groupedEvidence.engineering, "text-info")}
          {renderGroup("Timeline Events", <Clock className="h-4 w-4" />, groupedEvidence.timeline, "text-foreground")}
          {renderGroup("Document References", <FileText className="h-4 w-4" />, groupedEvidence.document, "text-success")}
          {renderGroup("Uncategorized Artifacts", <LinkIcon className="h-4 w-4" />, groupedEvidence.ungrouped, "text-muted-foreground")}
        </div>
      )}
    </ModuleContainer>
  )
}

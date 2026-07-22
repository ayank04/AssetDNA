import * as React from "react"
import { ExternalLink, Database, Wrench, Search, PenTool, FileText, Image as ImageIcon } from "lucide-react"
import { Evidence } from "@/types/models"

interface RichCitationCardProps {
  evidence: Evidence;
}

export const RichCitationCard = React.memo(function RichCitationCard({ evidence }: RichCitationCardProps) {
  const getIconAndColor = () => {
    switch (evidence.referenceType) {
      case 'maintenance': return { Icon: Wrench, color: 'text-warning', url: `/assets/${evidence.assetId}/maintenance` }
      case 'inspection': return { Icon: Search, color: 'text-info', url: `/assets/${evidence.assetId}/inspections` }
      case 'engineering': return { Icon: PenTool, color: 'text-primary', url: `/assets/${evidence.assetId}/engineering-changes` }
      case 'document': return { Icon: FileText, color: 'text-success', url: `/assets/${evidence.assetId}/documents` }
      case 'timeline': return { Icon: Database, color: 'text-muted-foreground', url: `/assets/${evidence.assetId}/timeline` }
      default: return { Icon: Database, color: 'text-muted-foreground', url: '#' }
    }
  }

  const { Icon, color, url } = getIconAndColor()

  return (
    <div className="bg-background border border-border/50 rounded-xl p-4 flex flex-col gap-3 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className={`mt-0.5 ${color}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <a href={evidence.url || url} target={evidence.url ? "_blank" : "_self"} rel="noopener noreferrer" className="hover:underline">
              <h4 className="text-sm font-semibold leading-none mb-1 text-foreground flex items-center gap-1.5">
                {evidence.title || evidence.referenceId || "Untitled Record"}
                <ExternalLink className="h-3 w-3 text-muted-foreground opacity-50" />
              </h4>
            </a>
            <p className="text-xs text-muted-foreground capitalize flex items-center gap-2">
              {evidence.referenceType || 'Evidence Record'}
              
              {evidence.confidence !== undefined && (
                <span className={`inline-flex items-center px-1.5 rounded-sm text-[9px] font-bold tracking-widest uppercase ${
                  evidence.confidence >= 0.9 ? 'bg-success/10 text-success' :
                  evidence.confidence >= 0.7 ? 'bg-warning/10 text-warning' :
                  'bg-destructive/10 text-destructive'
                }`}>
                  {(evidence.confidence * 100).toFixed(0)}% Match
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-3 border border-border/30">
        <p className="text-xs text-foreground/80 line-clamp-4 leading-relaxed">
          {evidence.content}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1">
        {evidence.createdAt && (
          <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
            <span className="opacity-70 mr-1">Date:</span>
            {new Date(evidence.createdAt).toLocaleDateString()}
          </div>
        )}
        {evidence.createdBy && (
          <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
            <span className="opacity-70 mr-1">By:</span>
            {evidence.createdBy}
          </div>
        )}
      </div>
    </div>
  )
})

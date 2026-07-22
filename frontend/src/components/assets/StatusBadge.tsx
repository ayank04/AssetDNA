import * as React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (s: string) => {
    switch (s.toLowerCase()) {
      case 'active':
        return { label: 'Active', color: 'bg-success/10 text-success border-success/20' }
      case 'maintenance':
        return { label: 'Maintenance', color: 'bg-warning/10 text-warning border-warning/20' }
      case 'inactive':
        return { label: 'Inactive', color: 'bg-muted text-muted-foreground border-border' }
      case 'decommissioned':
        return { label: 'Decommissioned', color: 'bg-destructive/10 text-destructive border-destructive/20' }
      default:
        return { label: s, color: 'bg-muted text-muted-foreground border-border' }
    }
  }

  const config = getStatusConfig(status)

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", config.color, className)}>
      {config.label}
    </span>
  )
}

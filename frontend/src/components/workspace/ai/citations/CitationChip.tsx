import * as React from "react"
import { Link2 } from "lucide-react"

interface CitationChipProps {
  id: string;
  label: string;
  onClick: (id: string) => void;
  isActive?: boolean;
}

export function CitationChip({ id, label, onClick, isActive }: CitationChipProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border transition-colors ${
        isActive 
          ? 'bg-primary/20 text-primary border-primary/30' 
          : 'bg-muted/50 text-muted-foreground border-border/50 hover:bg-muted hover:text-foreground'
      }`}
    >
      <Link2 className="h-3 w-3 shrink-0" />
      <span className="truncate max-w-[200px]">{label}</span>
    </button>
  )
}

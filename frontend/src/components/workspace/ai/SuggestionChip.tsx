import * as React from "react"
import { Sparkles } from "lucide-react"

interface SuggestionChipProps {
  title: string;
  onClick: (text: string) => void;
}

export function SuggestionChip({ title, onClick }: SuggestionChipProps) {
  return (
    <button
      onClick={() => onClick(title)}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-border/50 bg-muted/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
    >
      <Sparkles className="h-3 w-3 opacity-70" />
      {title}
    </button>
  )
}

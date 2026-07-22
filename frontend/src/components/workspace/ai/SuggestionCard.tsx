import * as React from "react"
import { ArrowRight } from "lucide-react"

interface SuggestionCardProps {
  title: string;
  onClick: (text: string) => void;
}

export function SuggestionCard({ title, onClick }: SuggestionCardProps) {
  return (
    <button
      onClick={() => onClick(title)}
      className="text-left group glass bg-background/50 backdrop-blur border border-border/50 rounded-xl p-4 hover:border-primary/50 transition-all hover:-translate-y-0.5 hover:shadow-elevation-1"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm text-foreground/80 font-medium group-hover:text-foreground transition-colors">
          {title}
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
      </div>
    </button>
  )
}

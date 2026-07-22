import * as React from "react"
import { Sparkles, Loader2, Database, Link2, FileText, CheckCircle2 } from "lucide-react"

export function ConversationSkeleton() {
  const [phase, setPhase] = React.useState(0);
  
  const phases = [
    { text: "Preparing investigation...", icon: Loader2 },
    { text: "Retrieving asset context...", icon: Database },
    { text: "Correlating operational evidence...", icon: Link2 },
    { text: "Analyzing documents...", icon: FileText },
    { text: "Generating response...", icon: CheckCircle2 }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p < phases.length - 1 ? p + 1 : p));
    }, 1200);
    return () => clearInterval(interval);
  }, [phases.length]);

  const CurrentIcon = phases[phase].icon;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="flex gap-4">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 p-4 rounded-2xl bg-muted/20 border border-border/50 text-sm w-full md:max-w-[85%]">
          <div className="flex items-center gap-3 text-primary mb-4 bg-primary/5 px-3 py-2 rounded-lg w-fit border border-primary/10">
            <CurrentIcon className="h-4 w-4 animate-pulse" />
            <span className="font-medium text-xs tracking-wider uppercase">{phases[phase].text}</span>
          </div>
          <div className="space-y-3">
            <div className="h-3 w-3/4 bg-muted/30 rounded animate-pulse" />
            <div className="h-3 w-full bg-muted/30 rounded animate-pulse" />
            <div className="h-3 w-5/6 bg-muted/30 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

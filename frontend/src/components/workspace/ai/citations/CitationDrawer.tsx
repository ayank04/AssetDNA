import * as React from "react"
import { X, Pin } from "lucide-react"
import { Evidence } from "@/types/models"
import { RichCitationCard } from "./RichCitationCard"

interface CitationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeCitationId: string | null;
  citations: Evidence[];
}

export function CitationDrawer({ isOpen, onClose, activeCitationId, citations }: CitationDrawerProps) {
  const [isPinned, setIsPinned] = React.useState(false)

  // Group or filter based on activeCitationId
  const activeCitations = activeCitationId 
    ? citations.filter(c => c.id === activeCitationId || c.referenceId === activeCitationId) 
    : citations;

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isPinned) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, isPinned, onClose]);

  if (!isOpen && !isPinned) return null;

  return (
    <div className={`
      fixed inset-x-0 bottom-0 top-auto md:top-0 md:bottom-0 md:right-0 md:left-auto 
      w-full md:w-[400px] lg:w-[450px] bg-background/95 backdrop-blur-xl border-t md:border-t-0 md:border-l border-border/50
      shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out
      h-[60vh] md:h-full
      ${isOpen || isPinned ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-full'}
      ${isPinned ? 'md:relative md:z-0 md:shadow-none' : ''}
    `}>
      <div className="flex items-center justify-between p-4 border-b border-border/50 shrink-0 bg-muted/20">
        <h3 className="font-semibold text-sm">Evidence Context</h3>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsPinned(!isPinned)}
            className={`p-1.5 rounded-md transition-colors ${isPinned ? 'bg-primary/20 text-primary' : 'hover:bg-muted text-muted-foreground'}`}
            title="Pin Drawer"
          >
            <Pin className="h-4 w-4" />
          </button>
          {!isPinned && (
            <button 
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors"
              title="Close Drawer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeCitations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-4">
            <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
              <Pin className="h-5 w-5 opacity-50" />
            </div>
            <p className="text-sm">Click any inline citation chip to view its supporting evidence here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeCitations.map(citation => (
              <RichCitationCard key={citation.id || citation.referenceId || Math.random()} evidence={citation} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

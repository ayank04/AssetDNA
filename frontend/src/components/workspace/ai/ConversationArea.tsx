import * as React from "react"
import { MessageType, ConversationMessage } from "./ConversationMessage"
import { ConversationSkeleton } from "./skeletons/ConversationSkeleton"
import { Sparkles } from "lucide-react"

interface ConversationAreaProps {
  messages: MessageType[];
  isLoading?: boolean;
  onCitationClick: (id: string) => void;
  activeCitationId: string | null;
  emptyStateContent?: React.ReactNode;
  completedStateContent?: React.ReactNode;
}

export function ConversationArea({ messages, isLoading, onCitationClick, activeCitationId, emptyStateContent, completedStateContent }: ConversationAreaProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Auto-scroll to bottom when new messages appear
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="max-w-2xl w-full flex flex-col items-center text-center space-y-6">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">AI Investigation Workspace</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              I can help you analyze the history of this asset, troubleshoot recurring failures, verify engineering changes, and summarize technical documents.
            </p>
          </div>
          
          {emptyStateContent && (
            <div className="w-full mt-8">
              <h3 className="text-sm font-semibold text-muted-foreground text-left mb-4 uppercase tracking-wider">Suggested Investigations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {emptyStateContent}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full overflow-y-auto px-4 py-6 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8 pb-4">
        {messages.map((msg) => (
          <ConversationMessage 
            key={msg.id} 
            message={msg} 
            onCitationClick={onCitationClick}
            activeCitationId={activeCitationId}
          />
        ))}
        
        {isLoading && (
          <div className="mt-6">
            <ConversationSkeleton />
          </div>
        )}

        {!isLoading && completedStateContent && messages.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border/50 animate-in fade-in duration-500">
            <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Suggested Follow-ups</h3>
            <div className="flex flex-wrap gap-2">
              {completedStateContent}
            </div>
          </div>
        )}
        
        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  )
}

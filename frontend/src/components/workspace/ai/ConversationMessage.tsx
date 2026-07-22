import * as React from "react"
import { Sparkles, User, AlertCircle, Copy, Check } from "lucide-react"
import { Evidence } from "@/types/models"
import { CitationChip } from "./citations/CitationChip"
import { MarkdownRenderer } from "./MarkdownRenderer"
import { InvestigationSummaryCard } from "./InvestigationSummaryCard"

export interface MessageType {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: Evidence[];
  timestamp?: string;
  isError?: boolean;
  metadata?: Record<string, any>;
}

interface ConversationMessageProps {
  message: MessageType;
  onCitationClick?: (citationId: string) => void;
  activeCitationId?: string | null;
}

export const ConversationMessage = React.memo(function ConversationMessage({ message, onCitationClick, activeCitationId }: ConversationMessageProps) {
  const isAssistant = message.role === 'assistant';
  const isSystem = message.role === 'system';
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isSystem) {
    return (
      <div className="flex justify-center my-6">
        <div className="bg-muted/50 text-muted-foreground px-4 py-2 rounded-full text-xs flex items-center gap-2">
          {message.isError && <AlertCircle className="h-3.5 w-3.5 text-destructive" />}
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex gap-4 ${isAssistant ? '' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
        isAssistant ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
      }`}>
        {isAssistant ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      
      <div className={`flex flex-col gap-2 max-w-[85%] ${isAssistant ? 'items-start' : 'items-end'}`}>
        <div className={`
          p-4 rounded-2xl text-sm leading-relaxed
          ${isAssistant 
            ? 'bg-muted/20 border border-border/50 text-foreground rounded-tl-sm w-full' 
            : 'bg-primary text-primary-foreground rounded-tr-sm whitespace-pre-wrap'
          }
        `}>
          {isAssistant ? (
            <div className="w-full">
              <MarkdownRenderer content={message.content} />
            </div>
          ) : (
            message.content
          )}
        </div>
        
        {message.metadata && isAssistant && (
          <InvestigationSummaryCard metadata={message.metadata} />
        )}

        {message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.citations.map((citation, index) => (
              <CitationChip
                key={citation.id || citation.referenceId || index.toString()}
                id={citation.id || citation.referenceId || index.toString()}
                label={citation.referenceType ? `[${citation.referenceType}] ${citation.referenceId || citation.title || ''}` : `[Citation ${index + 1}]`}
                onClick={() => onCitationClick && onCitationClick(citation.id || citation.referenceId || index.toString())}
                isActive={activeCitationId === (citation.id || citation.referenceId || index.toString())}
              />
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-3 mt-1 px-1">
          {message.timestamp && (
            <span className="text-[10px] font-mono text-muted-foreground">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          {isAssistant && (
            <button
              onClick={handleCopy}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-[10px] font-medium"
              title="Copy to clipboard"
            >
              {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
})

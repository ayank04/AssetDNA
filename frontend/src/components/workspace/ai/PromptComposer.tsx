import * as React from "react"
import { Send, CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface PromptComposerProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  value?: string;
  onChange?: (val: string) => void;
}

export function PromptComposer({ onSend, disabled, value = "", onChange }: PromptComposerProps) {
  const [internalValue, setInternalValue] = React.useState(value);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const currentValue = onChange ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (onChange) onChange(val);
    else setInternalValue(val);
    
    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (currentValue.trim() && !disabled) {
      onSend(currentValue.trim());
      if (onChange) onChange("");
      else setInternalValue("");
      
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  React.useEffect(() => {
    if (value !== undefined && value !== internalValue) {
      setInternalValue(value);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
      }
    }
  }, [value, internalValue]);

  return (
    <div className="relative glass bg-background/80 backdrop-blur-xl border-t border-border/50 p-4 sm:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] shrink-0 z-10">
      <div className="max-w-4xl mx-auto relative group">
        <textarea
          ref={textareaRef}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about this asset's history, failures, or engineering changes..."
          className="w-full bg-background border border-border/50 rounded-2xl py-4 pl-5 pr-14 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all min-h-[56px] max-h-[200px] overflow-y-auto"
          rows={1}
          disabled={disabled}
        />
        
        <div className="absolute right-2 bottom-2">
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!currentValue.trim() || disabled}
            className={`h-10 w-10 rounded-xl transition-all ${
              currentValue.trim() && !disabled
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute right-14 bottom-4 hidden sm:flex items-center text-[10px] text-muted-foreground font-medium uppercase tracking-widest gap-1">
          <CornerDownLeft className="h-3 w-3" /> 
          Enter
        </div>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { useWorkspace } from "@/components/workspace/WorkspaceProvider"
import { ModuleContainer } from "@/components/workspace/ModuleContainer"
import { Sparkles, Send, FileText, Clock, ShieldAlert, User, Bot, AlertTriangle, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { getDemoAiResponse } from "@/lib/demo-ai"
import ReactMarkdown from 'react-markdown'

export default function InvestigatePage() {
  const { asset } = useWorkspace()
  const [query, setQuery] = React.useState("")
  const [isSearching, setIsSearching] = React.useState(false)
  const [messages, setMessages] = React.useState([
    { role: "system", content: "AI Intelligence initialized. I have complete access to this asset's historical timeline, sensor telemetry, maintenance logs, and attached documentation. How can I assist your investigation today?" }
  ])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    
    setMessages(prev => [...prev, { role: "user", content: query }])
    const currentQuery = query
    setQuery("")
    setIsSearching(true)
    
    // Simulate a network request for the demo, then inject real parsed response
    setTimeout(() => {
      const response = getDemoAiResponse(currentQuery)
      setMessages(prev => [...prev, { 
        role: "system", 
        content: response.answer
      }])
      setIsSearching(false)
    }, 1500)
  }

  return (
    <ModuleContainer 
      title="Asset Intelligence" 
      description="Deep contextual analysis using maintenance logs, telemetry, and documents."
    >
      <div className="flex flex-col h-[calc(100vh-14rem)] lg:flex-row gap-6 mt-4">
        
        {/* Main Chat Interface */}
        <div className="flex-1 glass rounded-2xl border border-border/50 shadow-inner flex flex-col overflow-hidden bg-background/20 relative">
          
          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'system' && (
                  <div className="h-10 w-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                )}
                
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none shadow-md' 
                    : 'bg-muted/50 border border-border/50 rounded-tl-none shadow-sm'
                }`}>
                  {msg.role === 'system' ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="h-10 w-10 shrink-0 rounded-full bg-muted flex items-center justify-center border border-border/50">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isSearching && (
              <div className="flex gap-4 justify-start">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-muted/50 border border-border/50 rounded-2xl rounded-tl-none p-4 py-5 flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-xl">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Sparkles className="h-5 w-5 text-primary opacity-70" />
              </div>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about this asset's history, anomalies, or documentation..." 
                className="w-full bg-muted/30 border border-border/50 rounded-full py-4 pl-12 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
              />
              <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button 
                  type="submit"
                  disabled={isSearching || !query.trim()}
                  className="h-9 w-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Rail: AI Context Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
          
          <div className="glass p-5 rounded-2xl border border-border/50">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" /> Suggested Queries
            </h3>
            <div className="space-y-2">
              <button onClick={() => setQuery("Why did this asset fail?")} className="w-full text-left p-3 rounded-lg bg-muted/20 hover:bg-muted/50 border border-transparent hover:border-border/50 text-xs transition-colors">
                Why did this asset fail?
              </button>
              <button onClick={() => setQuery("What changed recently?")} className="w-full text-left p-3 rounded-lg bg-muted/20 hover:bg-muted/50 border border-transparent hover:border-border/50 text-xs transition-colors">
                What changed recently?
              </button>
              <button onClick={() => setQuery("Summarize maintenance history.")} className="w-full text-left p-3 rounded-lg bg-muted/20 hover:bg-muted/50 border border-transparent hover:border-border/50 text-xs transition-colors">
                Summarize maintenance history.
              </button>
              <button onClick={() => setQuery("Which document supports this conclusion?")} className="w-full text-left p-3 rounded-lg bg-muted/20 hover:bg-muted/50 border border-transparent hover:border-border/50 text-xs transition-colors">
                Which document supports this conclusion?
              </button>
            </div>
          </div>

          <div className="glass p-5 rounded-2xl border border-border/50 flex-1">
            <h3 className="text-sm font-semibold mb-4 text-foreground">Current Context</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Timeline Synced</p>
                  <p className="text-xs text-muted-foreground">Up to date</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-md bg-info/10 flex items-center justify-center border border-info/20 shrink-0">
                  <FileText className="h-4 w-4 text-info" />
                </div>
                <div>
                  <p className="font-medium">Documents Indexed</p>
                  <p className="text-xs text-muted-foreground">Vector search active</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-md bg-warning/10 flex items-center justify-center border border-warning/20 shrink-0">
                  <ShieldAlert className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="font-medium">Evidence Linked</p>
                  <p className="text-xs text-muted-foreground">Ready for retrieval</p>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </ModuleContainer>
  )
}

"use client"

import * as React from "react"
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute"
import { AnimatedFade } from "@/components/animations/Motion"
import { Search, Sparkles, Send, Box, FileText, Wrench, User, Bot, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { getDemoAiResponse } from "@/lib/demo-ai"
import ReactMarkdown from 'react-markdown'

export default function AssistantPage() {
  const [query, setQuery] = React.useState("")
  const [isSearching, setIsSearching] = React.useState(false)
  const [messages, setMessages] = React.useState([
    { role: "system", content: "Industrial Knowledge Assistant initialized. I can synthesize maintenance records, telemetry, and documents across your entire fleet. How can I help you today?" }
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

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    // We don't auto-submit to let them see the typing, but we could.
  }

  return (
    <ProtectedRoute>
      <AnimatedFade className="p-4 sm:p-6 md:p-8 max-w-[1200px] mx-auto w-full flex flex-col h-[calc(100vh-4rem)]">
        
        {/* Global AI Header */}
        <div className="mb-6 text-center mt-4">
          <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-primary/20">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
            Industrial Knowledge Assistant
          </h1>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 glass rounded-2xl border border-border/50 shadow-inner flex flex-col overflow-hidden bg-background/20 relative mb-6">
          
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
            <form onSubmit={handleSearch} className="relative max-w-4xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Sparkles className="h-5 w-5 text-primary opacity-70" />
              </div>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question about the fleet..." 
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

        {/* Suggested Queries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto w-full pb-4">
          <div className="glass p-4 rounded-xl border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => handleSuggestionClick("Show highest-risk assets.")}>
            <Box className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-semibold text-sm text-foreground mb-1">Risk Analysis</h3>
            <p className="text-xs text-muted-foreground">Show highest-risk assets.</p>
          </div>
          <div className="glass p-4 rounded-xl border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => handleSuggestionClick("Which assets require maintenance?")}>
            <Wrench className="h-5 w-5 text-warning mb-3" />
            <h3 className="font-semibold text-sm text-foreground mb-1">Maintenance</h3>
            <p className="text-xs text-muted-foreground">Which assets require maintenance?</p>
          </div>
          <div className="glass p-4 rounded-xl border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => handleSuggestionClick("Compare Pump PX-100 and PX-101.")}>
            <Search className="h-5 w-5 text-info mb-3" />
            <h3 className="font-semibold text-sm text-foreground mb-1">Comparison</h3>
            <p className="text-xs text-muted-foreground">Compare Pump PX-100 and PX-101.</p>
          </div>
          <div className="glass p-4 rounded-xl border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => handleSuggestionClick("What documents mention vibration?")}>
            <FileText className="h-5 w-5 text-success mb-3" />
            <h3 className="font-semibold text-sm text-foreground mb-1">Documentation</h3>
            <p className="text-xs text-muted-foreground">What documents mention vibration?</p>
          </div>
        </div>
        
      </AnimatedFade>
    </ProtectedRoute>
  )
}

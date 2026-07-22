"use client"

import * as React from "react"
import { useWorkspace } from "@/components/workspace/WorkspaceProvider"
import { ModuleContainer } from "@/components/workspace/ModuleContainer"
import { InvestigationHeader } from "@/components/workspace/ai/InvestigationHeader"
import { ConversationArea } from "@/components/workspace/ai/ConversationArea"
import { PromptComposer } from "@/components/workspace/ai/PromptComposer"
import { SuggestionCard } from "@/components/workspace/ai/SuggestionCard"
import { SuggestionChip } from "@/components/workspace/ai/SuggestionChip"
import { CitationDrawer } from "@/components/workspace/ai/citations/CitationDrawer"
import { MessageType } from "@/components/workspace/ai/ConversationMessage"
import { Evidence } from "@/types/models"
import { AIService } from "@/services/ai.service"
import { AIStatus } from "@/components/workspace/ai/InvestigationStatus"

export default function AIInvestigationPage() {
  const { asset, isLoading: assetLoading } = useWorkspace()
  
  const [messages, setMessages] = React.useState<MessageType[]>([])
  const [status, setStatus] = React.useState<AIStatus>('ready')
  const [activeCitationId, setActiveCitationId] = React.useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  // This is a placeholder for the actual evidence that would be returned by the AI
  const currentCitations: Evidence[] = messages.flatMap(m => m.citations || [])

  const handleSuggestionClick = (text: string) => {
    handleSend(text)
  }

  const handleSend = async (text: string) => {
    if (!asset?.id) return;

    const newUserMsg: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, newUserMsg])
    setStatus('thinking')
    setIsDrawerOpen(false) // Optionally close drawer on new message
    
    try {
      const response = await AIService.investigate(asset.id, text);
      const data = response.data;
      
      const newAssistantMsg: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data?.answer || "I received an empty response from the server.",
        citations: data?.sources || [],
        timestamp: new Date().toISOString(),
        metadata: data?.metadata
      }
      
      setMessages(prev => [...prev, newAssistantMsg])
      setStatus('completed')
    } catch (error: any) {
      console.error("AI Investigation Error:", error)
      const errorMsg: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: error?.response?.data?.message || error.message || "An error occurred while communicating with the AI service.",
        timestamp: new Date().toISOString(),
        isError: true
      }
      setMessages(prev => [...prev, errorMsg])
      setStatus('error')
    }
  }

  const handleCitationClick = (id: string) => {
    setActiveCitationId(id)
    setIsDrawerOpen(true)
  }

  const handleClear = () => {
    setMessages([])
    setActiveCitationId(null)
    setIsDrawerOpen(false)
    setStatus('ready')
  }

  if (assetLoading || !asset) {
    return (
      <ModuleContainer title="AI Investigation">
        <div className="h-full w-full flex flex-col items-center justify-center mt-20">
          <div className="h-8 w-8 rounded-full bg-muted/50 mb-4 animate-pulse" />
          <div className="h-4 w-32 bg-muted/50 rounded animate-pulse" />
        </div>
      </ModuleContainer>
    )
  }

  return (
    <ModuleContainer title="AI Investigation" className="p-0 overflow-hidden h-full flex flex-col">
      <div className="flex-1 flex overflow-hidden relative">
        {/* Main Conversation Column */}
        <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0 transition-all duration-300">
          <InvestigationHeader 
            assetName={asset.name}
            status={status}
            onClear={handleClear}
            onNew={handleClear}
          />
          
          <div className="flex-1 overflow-hidden relative flex flex-col">
            <ConversationArea 
              messages={messages}
              isLoading={status === 'thinking' || status === 'generating'}
              onCitationClick={handleCitationClick}
              activeCitationId={activeCitationId}
              emptyStateContent={
                <>
                  <SuggestionCard title="Summarize the history of this asset" onClick={handleSuggestionClick} />
                  <SuggestionCard title="What are the most recurring maintenance issues?" onClick={handleSuggestionClick} />
                  <SuggestionCard title="Identify root causes from recent inspections" onClick={handleSuggestionClick} />
                  <SuggestionCard title="Explain the last engineering modification" onClick={handleSuggestionClick} />
                </>
              }
              completedStateContent={
                <>
                  <SuggestionChip title="Explain recurring failures" onClick={handleSuggestionClick} />
                  <SuggestionChip title="Identify root causes" onClick={handleSuggestionClick} />
                  <SuggestionChip title="Summarize engineering changes" onClick={handleSuggestionClick} />
                </>
              }
            />
            
            <PromptComposer 
              onSend={handleSend}
              disabled={status === 'thinking' || status === 'generating'}
            />
          </div>
        </div>
        
        {/* Citation Drawer */}
        <CitationDrawer 
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          activeCitationId={activeCitationId}
          citations={currentCitations}
        />
      </div>
    </ModuleContainer>
  )
}

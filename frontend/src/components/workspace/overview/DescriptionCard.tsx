"use client"

import * as React from "react"
import { AnimatedFade } from "@/components/animations/Motion"
import { Button } from "@/components/ui/Button"
import { ChevronDown, ChevronUp, AlignLeft } from "lucide-react"

interface DescriptionCardProps {
  description?: string
}

export function DescriptionCard({ description }: DescriptionCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  
  if (!description) {
    return (
      <div className="glass p-6 rounded-xl border border-dashed text-center flex flex-col items-center justify-center mb-8">
        <AlignLeft className="h-8 w-8 text-muted-foreground opacity-50 mb-3" />
        <p className="text-sm text-muted-foreground">No description available for this asset.</p>
      </div>
    )
  }

  const isLong = description.length > 250

  return (
    <AnimatedFade className="glass rounded-xl border overflow-hidden relative mb-8">
      <div className="p-4 border-b border-border/50 bg-muted/20">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <AlignLeft className="h-4 w-4 text-primary" /> Asset Description
        </h3>
      </div>
      
      <div className="p-6 relative">
        <p className={`text-sm leading-relaxed text-muted-foreground ${!isExpanded && isLong ? 'line-clamp-3' : ''}`}>
          {description}
        </p>
        
        {!isExpanded && isLong && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        )}
      </div>

      {isLong && (
        <div className="px-6 pb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-xs h-8"
          >
            {isExpanded ? (
              <><ChevronUp className="h-3 w-3 mr-2" /> Show Less</>
            ) : (
              <><ChevronDown className="h-3 w-3 mr-2" /> Read Full Description</>
            )}
          </Button>
        </div>
      )}
    </AnimatedFade>
  )
}

import * as React from "react"
import Link from "next/link"
import { LucideIcon, ArrowRight } from "lucide-react"
import { AnimatedSlideUp } from "@/components/animations/Motion"

interface RelatedPreviewCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  count?: number
  delay?: number
}

export function RelatedPreviewCard({ title, description, icon: Icon, href, count, delay = 0 }: RelatedPreviewCardProps) {
  return (
    <AnimatedSlideUp delay={delay} className="glass p-5 rounded-xl border hover:border-primary/30 transition-all hover:shadow-elevation-1 group flex flex-col h-full bg-background/50 backdrop-blur-xl">
      <div className="flex items-start justify-between mb-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 ring-1 ring-primary/20">
          <Icon className="h-5 w-5" />
        </div>
        {count !== undefined && (
          <span className="text-xs font-bold bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
            {count}
          </span>
        )}
      </div>
      
      <div className="flex-1 mb-4">
        <h4 className="text-sm font-semibold tracking-tight text-foreground mb-1">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px]">
          {description}
        </p>
      </div>
      
      <div className="mt-auto pt-4 border-t border-border/50">
        <Link href={href} tabIndex={-1} className="flex items-center text-xs font-medium text-primary group-hover:text-primary/80 transition-colors">
          View Module
          <ArrowRight className="h-3 w-3 ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </AnimatedSlideUp>
  )
}

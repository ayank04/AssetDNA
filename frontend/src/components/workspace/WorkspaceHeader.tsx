"use client"

import * as React from "react"
import Link from "next/link"
import { useWorkspace } from "./WorkspaceProvider"
import { StatusBadge } from "@/components/assets/StatusBadge"
import { Button } from "@/components/ui/Button"
import { ChevronRight, ArrowLeft, Star, RefreshCw, LayoutDashboard, Clock, Wrench, Search, FileText, Files, Database, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function WorkspaceHeader() {
  const { asset, isLoading } = useWorkspace()
  const pathname = usePathname()

  if (isLoading || !asset) {
    return (
      <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-xl flex items-center px-4 md:px-6 shrink-0 justify-between">
        <div className="flex items-center gap-4 w-full">
          <div className="h-8 w-8 rounded bg-muted/50 animate-pulse shrink-0" />
          <div className="h-6 w-48 rounded bg-muted/50 animate-pulse" />
        </div>
      </header>
    )
  }

  const basePath = `/assets/${asset.id}`
  
  const navItems = [
    { name: "AI Summary", href: basePath, icon: LayoutDashboard },
    { name: "AI Investigation", href: `${basePath}/investigate`, icon: Sparkles, highlight: true },
    { name: "Evidence", href: `${basePath}/evidence`, icon: Database },
    { name: "Timeline", href: `${basePath}/timeline`, icon: Clock },
    { name: "Maintenance", href: `${basePath}/maintenance`, icon: Wrench },
    { name: "Inspections", href: `${basePath}/inspections`, icon: Search },
    { name: "Engineering", href: `${basePath}/engineering-changes`, icon: FileText },
    { name: "Documents", href: `${basePath}/documents`, icon: Files },
  ]

  return (
    <div className="flex flex-col bg-background/50 backdrop-blur-xl border-b border-border/50 z-30 relative shrink-0">
      <header className="h-16 flex items-center px-4 md:px-6 justify-between border-b border-border/10">
        <div className="flex items-center gap-2 min-w-0">
          <Link href="/assets" className="mr-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground mr-4">
            <Link href="/assets" className="hover:text-foreground transition-colors">Assets</Link>
            <ChevronRight className="h-4 w-4 opacity-50" />
          </div>
          
          <div className="flex items-center gap-3 truncate">
            <h1 className="text-lg font-semibold tracking-tight text-foreground truncate">
              {asset.name}
            </h1>
            <span className="text-xs font-mono text-muted-foreground hidden md:inline-block bg-muted/50 px-1.5 py-0.5 rounded">
              {asset.id}
            </span>
            <StatusBadge status={asset.status} className="hidden sm:inline-flex" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="px-4 md:px-6 flex items-center gap-1 overflow-x-auto scrollbar-none h-12 pt-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 h-full border-b-2 transition-all text-sm font-medium whitespace-nowrap",
                isActive 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border/50",
                item.highlight && !isActive && "text-primary/70 hover:text-primary"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "opacity-80")} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

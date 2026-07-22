"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useWorkspace } from "./WorkspaceProvider"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Clock, 
  Wrench, 
  Search, 
  FileText, 
  Files, 
  Database, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

export function WorkspaceSidebar() {
  const { asset, isSidebarCollapsed, setSidebarCollapsed } = useWorkspace()
  const pathname = usePathname()
  
  if (!asset) return null

  const basePath = `/assets/${asset.id}`
  
  const navItems = [
    { name: "Overview", href: basePath, icon: LayoutDashboard },
    { name: "Timeline", href: `${basePath}/timeline`, icon: Clock },
    { name: "Maintenance", href: `${basePath}/maintenance`, icon: Wrench },
    { name: "Inspections", href: `${basePath}/inspections`, icon: Search },
    { name: "Engineering", href: `${basePath}/engineering-changes`, icon: FileText },
    { name: "Documents", href: `${basePath}/documents`, icon: Files },
    { name: "Evidence", href: `${basePath}/evidence`, icon: Database },
    { name: "AI Investigation", href: `${basePath}/investigate`, icon: Sparkles, highlight: true },
  ]

  return (
    <aside className={cn(
      "h-full border-r border-border/50 bg-background/50 backdrop-blur-xl transition-all duration-300 flex flex-col relative z-20 shrink-0",
      isSidebarCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 flex items-center justify-between border-b border-border/50 h-16 shrink-0">
        {!isSidebarCollapsed && (
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Modules</span>
        )}
        <button 
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          className={cn("h-8 w-8 rounded-md flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors", 
            isSidebarCollapsed ? "mx-auto" : "ml-auto"
          )}
        >
          {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                item.highlight && !isActive && "text-primary/70 hover:text-primary hover:bg-primary/5",
                isSidebarCollapsed && "justify-center px-0"
              )}
              title={isSidebarCollapsed ? item.name : undefined}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "opacity-80")} />
              {!isSidebarCollapsed && (
                <span className="truncate">{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

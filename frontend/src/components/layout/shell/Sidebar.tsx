"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, 
  Box, 
  Search, 
  FileText, 
  MessageSquare, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Clock,
  Wrench,
  CheckCircle,
  FileEdit,
  ShieldAlert,
  Sparkles,
  CalendarDays
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useShell } from "@/components/providers/ShellProvider"
import { ANIMATION_SPEEDS, EASINGS } from "@/constants/design"
import { Button } from "@/components/ui/Button"

import { usePathname } from "next/navigation"
import Link from "next/link"

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Box, label: "Assets", href: "/assets" },
  { icon: Sparkles, label: "AI Insights", href: "/insights" },
  { icon: CalendarDays, label: "Maintenance Planner", href: "/planner" },
  { icon: MessageSquare, label: "Knowledge Assistant", href: "/assistant" },
]

export function Sidebar() {
  const { isSidebarExpanded, toggleSidebar } = useShell()
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isSidebarExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        />
      )}

      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarExpanded ? 260 : 72 
        }}
        transition={{ 
          duration: ANIMATION_SPEEDS.NORMAL, 
          ease: EASINGS.EMPHASIZED_EASE 
        }}
        className={cn(
          "flex flex-col h-full z-[var(--NAVBAR,40)] glass rounded-2xl border shadow-elevation-1 flex-shrink-0 overflow-hidden",
          "max-md:fixed max-md:inset-y-2 max-md:left-2 max-md:z-50 max-md:w-[260px] max-md:transition-transform",
          !isSidebarExpanded && "max-md:-translate-x-[150%]",
          "md:sticky md:top-0 md:left-0"
        )}
      >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-border/50 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
          A
        </div>
        <motion.span 
          initial={false}
          animate={{ opacity: isSidebarExpanded ? 1 : 0, width: isSidebarExpanded ? 'auto' : 0 }}
          className="ml-3 font-brand font-bold text-xl tracking-tight overflow-hidden whitespace-nowrap"
        >
          AssetDNA
        </motion.span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map((item, idx) => {
          const isActive = pathname.startsWith(item.href) && item.href !== '/' || pathname === item.href
          return (
            <Link
              key={idx}
              href={item.href}
              onClick={() => {
                if (window.innerWidth < 768 && isSidebarExpanded) {
                  toggleSidebar()
                }
              }}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors group relative overflow-hidden",
                isActive ? "text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute inset-0 bg-primary rounded-md z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className="h-5 w-5 flex-shrink-0 z-10" />
              <motion.span
                initial={false}
                animate={{ opacity: isSidebarExpanded ? 1 : 0, width: isSidebarExpanded ? 'auto' : 0 }}
                className="text-sm whitespace-nowrap z-10"
              >
                {item.label}
              </motion.span>
            </Link>
          )
        })}
      </nav>

      {/* Footer / Settings */}
      <div className="p-3 border-t border-border/50 shrink-0">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors relative overflow-hidden",
            pathname.startsWith('/settings') ? "text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
          )}
        >
          {pathname.startsWith('/settings') && (
            <motion.div
              layoutId="sidebar-active-indicator"
              className="absolute inset-0 bg-primary rounded-md z-0"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <Settings className="h-5 w-5 flex-shrink-0 z-10" />
          <motion.span
            initial={false}
            animate={{ opacity: isSidebarExpanded ? 1 : 0, width: isSidebarExpanded ? 'auto' : 0 }}
            className="text-sm whitespace-nowrap z-10"
          >
            Settings
          </motion.span>
        </Link>
        <div className="mt-2 flex justify-end px-2">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8 text-muted-foreground hover:bg-muted">
            <motion.div animate={{ rotate: isSidebarExpanded ? 0 : 180 }} transition={{ duration: ANIMATION_SPEEDS.FAST }}>
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>
      </div>
    </motion.aside>
    </>
  )
}

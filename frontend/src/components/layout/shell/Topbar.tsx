"use client"

import * as React from "react"
import { Search, Bell, PanelRight, Moon, Sun, LogOut, User as UserIcon, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/Button"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { useShell } from "@/components/providers/ShellProvider"
import { useAuth } from "@/features/auth/providers/AuthProvider"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

export function Topbar() {
  const { toggleUtilityRail, setCommandPaletteOpen, isUtilityRailOpen, toggleSidebar } = useShell()
  const { setTheme, theme } = useTheme()
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const breadcrumbs = React.useMemo(() => {
    const parts = pathname.split('/').filter(Boolean)
    if (parts.length === 0) return ['Dashboard']
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' '))
  }, [pathname])

  return (
    <header className="sticky top-0 z-[var(--NAVBAR,40)] w-full h-16 glass border-b border-border/50 flex items-center justify-between px-4 sm:px-6">
      
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
          <Menu className="h-5 w-5 text-muted-foreground" />
        </Button>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span className={idx === breadcrumbs.length - 1 ? "text-foreground font-semibold" : "hover:text-foreground cursor-pointer transition-colors"}>
                {crumb}
              </span>
              {idx < breadcrumbs.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Center/Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        {/* Search Trigger */}
        <Button 
          variant="outline" 
          className="hidden sm:flex items-center gap-2 w-64 justify-start text-muted-foreground bg-background/50 hover:bg-background/80"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span className="font-normal text-xs">Search anything...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        {/* Mobile Search Icon */}
        <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setCommandPaletteOpen(true)}>
          <Search className="h-5 w-5" />
        </Button>

        <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

        {/* Theme Toggle Placeholder (Cycle) */}
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-destructive border-2 border-background" />
        </Button>

        {/* Utility Rail Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleUtilityRail}
          className={cn("hidden lg:inline-flex", isUtilityRailOpen && "bg-accent text-accent-foreground")}
        >
          <PanelRight className="h-5 w-5" />
        </Button>

        <div className="h-6 w-px bg-border mx-1" />

        {/* User Avatar & Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar size="sm" status={user ? "online" : "offline"} className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all outline-none">
              <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Account</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || "Not signed in"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-muted-foreground cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => logout()} 
              className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  )
}

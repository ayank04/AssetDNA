"use client"

import * as React from "react"
import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"
import { UtilityRail } from "./UtilityRail"
import { CommandPalette } from "./CommandPalette"
import { AppContainer } from "@/components/layout/LayoutPrimitives"
import { usePathname } from "next/navigation"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/login' || pathname === '/') {
    return <>{children}</>
  }

  return (
    <AppContainer className="flex-row bg-muted/20 p-2 sm:p-4 gap-2 sm:gap-4 h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-background rounded-2xl border shadow-sm overflow-hidden relative">
        <Topbar />
        <main className="flex-1 relative overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>
      <UtilityRail />
      <CommandPalette />
    </AppContainer>
  )
}

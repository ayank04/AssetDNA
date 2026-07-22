"use client"

import * as React from "react"

interface ShellContextType {
  isSidebarExpanded: boolean
  toggleSidebar: () => void
  isUtilityRailOpen: boolean
  toggleUtilityRail: () => void
  isCommandPaletteOpen: boolean
  setCommandPaletteOpen: (open: boolean) => void
}

const ShellContext = React.createContext<ShellContextType | undefined>(undefined)

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true)
  const [isUtilityRailOpen, setIsUtilityRailOpen] = React.useState(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false)

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarExpanded((prev) => {
      const next = !prev
      if (typeof window !== 'undefined') localStorage.setItem('sidebar-expanded', String(next))
      return next
    })
  }, [])
  const toggleUtilityRail = React.useCallback(() => setIsUtilityRailOpen((prev) => !prev), [])

  // Handle Ctrl+K globally
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsCommandPaletteOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Hydrate sidebar state from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('sidebar-expanded')
    if (saved !== null) {
      setIsSidebarExpanded(saved === 'true')
    }
  }, [])

  return (
    <ShellContext.Provider
      value={{
        isSidebarExpanded,
        toggleSidebar,
        isUtilityRailOpen,
        toggleUtilityRail,
        isCommandPaletteOpen,
        setCommandPaletteOpen: setIsCommandPaletteOpen,
      }}
    >
      {children}
    </ShellContext.Provider>
  )
}

export function useShell() {
  const context = React.useContext(ShellContext)
  if (!context) {
    throw new Error("useShell must be used within a ShellProvider")
  }
  return context
}

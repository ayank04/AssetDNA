"use client"

import * as React from "react"
import { Asset } from "@/types/models"
import { useApi } from "@/hooks/core-hooks"
import { AssetService } from "@/services"
import { useParams } from "next/navigation"

interface WorkspaceContextType {
  asset: Asset | null
  isLoading: boolean
  error: any
  isSidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void
  isContextPanelCollapsed: boolean
  setContextPanelCollapsed: (v: boolean) => void
}

const WorkspaceContext = React.createContext<WorkspaceContextType | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const assetId = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : null
  
  const { data, isLoading, error, execute } = useApi(AssetService.getById)

  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)
  const [isContextPanelCollapsed, setIsContextPanelCollapsed] = React.useState(false)

  React.useEffect(() => {
    if (assetId) {
      execute(assetId)
    }
  }, [assetId, execute])

  React.useEffect(() => {
    const savedSidebar = localStorage.getItem('assetdna_sidebar_collapsed')
    const savedContext = localStorage.getItem('assetdna_context_collapsed')
    if (savedSidebar) setIsSidebarCollapsed(savedSidebar === 'true')
    if (savedContext) setIsContextPanelCollapsed(savedContext === 'true')
  }, [])

  const handleSetSidebar = (val: boolean) => {
    setIsSidebarCollapsed(val)
    localStorage.setItem('assetdna_sidebar_collapsed', String(val))
  }

  const handleSetContextPanel = (val: boolean) => {
    setIsContextPanelCollapsed(val)
    localStorage.setItem('assetdna_context_collapsed', String(val))
  }

  const value = React.useMemo(() => ({
    asset: data?.data || null,
    isLoading,
    error,
    isSidebarCollapsed,
    setSidebarCollapsed: handleSetSidebar,
    isContextPanelCollapsed,
    setContextPanelCollapsed: handleSetContextPanel
  }), [data, isLoading, error, isSidebarCollapsed, isContextPanelCollapsed])

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const context = React.useContext(WorkspaceContext)
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider")
  }
  return context
}
